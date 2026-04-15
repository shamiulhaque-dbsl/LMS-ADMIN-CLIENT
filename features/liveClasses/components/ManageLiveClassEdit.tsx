"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Course } from '@/features/course/types';
import { useLiveClassActions } from '../hooks/useLiveClassActions';
import { LiveClassFormData, Batch, LiveSession } from '../types';
import { getBatchesByCourse } from '@/api/live-session';
import { toast } from 'sonner';

interface ManageLiveClassEditProps {
    courses: Course[];
    liveClass: LiveSession; // existing live class data to prefill the form
}

// Helper: strips the trailing ":00Z" from a stored ISO-like string so it
// matches the datetime-local input format "YYYY-MM-DDTHH:mm"
const toDatetimeLocal = (value?: string | null): string => {
    if (!value) return '';
    // Remove trailing :00Z if present, then trim any extra seconds
    return value.replace(/:00Z$/, '').slice(0, 16);
};

const ManageLiveClassEdit = ({ courses, liveClass }: ManageLiveClassEditProps) => {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loadingBatches, setLoadingBatches] = useState(false);
    console.log("Live class data received in form:", liveClass);
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<LiveClassFormData>({
        mode: 'onBlur',
        defaultValues: {
            courseId: liveClass.courseId,
            batchId: liveClass.batchId ?? undefined,
            sessionType: liveClass.sessionType ?? 'demo',
            title: liveClass.title ?? '',
            description: liveClass.description ?? '',
            startTime: toDatetimeLocal(liveClass.startTime),
            endTime: toDatetimeLocal(liveClass.endTime),
            status: liveClass.status ?? 'scheduled',
            platform: (liveClass?.platform === 'google_meet' ? 'google-meet' : (liveClass?.platform === 'internal' ? 'other' : liveClass?.platform)) ?? 'zoom',
            sessionUrl: liveClass.sessionUrl ?? '',
            meetingId: liveClass.meetingId ?? '',
            meetingPassword: liveClass.meetingPassword ?? '',
            externalMetadata: liveClass.externalMetadata ?? '',
        },
    });
    const sessionType = watch('sessionType');
    const courseId = watch('courseId');
    const { update } = useLiveClassActions();

    // Fetch batches when courseId or sessionType changes
    useEffect(() => {
        if (sessionType === 'batch' && courseId) {
            const fetchBatches = async () => {
                setLoadingBatches(true);
                try {
                    const response = await getBatchesByCourse(Number(courseId));
                    if (response?.data) {
                        setBatches(response.data);

                    }
                } catch (error) {
                    console.error('Failed to fetch batches:', error);
                    toast.error('Failed to fetch batches');
                    setBatches([]);
                } finally {
                    setLoadingBatches(false);
                }
            };
            fetchBatches();
        } else {
            setBatches([]);
        }
    }, [sessionType, courseId]);

    const onSubmit = async (data: LiveClassFormData) => {
        const payload = {
            ...data,
            courseId: Number(data.courseId),
            batchId: data.batchId ? Number(data.batchId) : null,
            startTime: data.startTime ? `${data.startTime}:00Z` : '',
            endTime: data.endTime ? `${data.endTime}:00Z` : '',
        };
        await update(String(liveClass.id), payload);
    };

    useEffect(() => {
        if (batches.length > 0 && liveClass.batchId) {
            setValue('batchId', (liveClass.batchId), { shouldValidate: false });
        }
    }, [batches, liveClass.batchId, setValue]);

    const inputClasses =
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-orange-500 focus:border-orange-500 sm:text-sm';
    const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';
    const errorClasses = 'text-red-500 text-xs mt-1';

    return (
        <div className="lg:px-44 py-12 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Session</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Section 1: Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Course */}
                    <div>
                        <label htmlFor="courseId" className={labelClasses}>Course *</label>
                        <select
                            id="courseId"
                            {...register('courseId', { required: 'Please select a course', valueAsNumber: true })}
                            className={inputClasses}
                        >
                            <option value="">Select a course...</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                        {errors.courseId && <p className={errorClasses}>{errors.courseId.message}</p>}
                    </div>

                    {/* Session Type */}
                    <div>
                        <label htmlFor="sessionType" className={labelClasses}>Session Type *</label>
                        <select id="sessionType" {...register('sessionType')} className={inputClasses}>
                            <option value="demo">Demo</option>
                            <option value="batch">Batch</option>
                        </select>
                    </div>
                </div>

                {/* Batch Dropdown */}
                {sessionType === 'batch' && (
                    <div>
                        <label htmlFor="batchId" className={labelClasses}>Batch *</label>
                        <select
                            id="batchId"
                            {...register('batchId', {
                                required: sessionType === 'batch' ? 'Please select a batch' : false,
                            })}
                            disabled={loadingBatches || batches.length === 0}
                            className={`${inputClasses} ${loadingBatches ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <option value="">
                                {loadingBatches ? 'Loading batches...' : 'Select a batch...'}
                            </option>
                            {batches.map((batch) => (
                                <option key={batch.id} value={batch.id}>
                                    {batch.name} {batch.status && `(${batch.status})`}
                                </option>
                            ))}
                        </select>
                        {errors.batchId && <p className={errorClasses}>{errors.batchId.message}</p>}
                        {!loadingBatches && batches.length === 0 && sessionType === 'batch' && (
                            <p className="text-yellow-600 text-xs mt-1">No batches available for this course</p>
                        )}
                    </div>
                )}

                {/* Title */}
                <div>
                    <label htmlFor="title" className={labelClasses}>Title *</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="e.g., Insert Live Session/Class Title here"
                        {...register('title', { required: 'Title is required' })}
                        className={inputClasses}
                    />
                    {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className={labelClasses}>Description</label>
                    <textarea
                        id="description"
                        rows={3}
                        placeholder="Enter session/class description..."
                        {...register('description')}
                        className={inputClasses}
                    />
                </div>

                {/* Section 2: Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="startTime" className={labelClasses}>Start Time</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            {...register('startTime', {
                                validate: (value) => {
                                    const endTime = getValues('endTime');
                                    if (endTime && !value) {
                                        return 'Start time is required when end time is provided.';
                                    }
                                    return true;
                                },
                            })}
                            className={inputClasses}
                        />
                        {errors.startTime && <p className={errorClasses}>{errors.startTime.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="endTime" className={labelClasses}>End Time</label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            {...register('endTime', {
                                validate: (value) => {
                                    const startTime = getValues('startTime');
                                    if (startTime && !value) {
                                        return 'End time is required when start time is provided.';
                                    }
                                    if (startTime && value && new Date(value) <= new Date(startTime)) {
                                        return 'End time must be after start time.';
                                    }
                                    return true;
                                },
                            })}
                            className={inputClasses}
                        />
                        {errors.endTime && <p className={errorClasses}>{errors.endTime.message}</p>}
                    </div>
                </div>

                {/* Section 3: Platform & Meeting Details */}
                <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Meeting Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="platform" className={labelClasses}>Platform</label>
                            <select id="platform" {...register('platform')} className={inputClasses}>
                                <option value="zoom">Zoom</option>
                                <option value="google-meet">Google Meet</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className={labelClasses}>Status</label>
                            <select id="status" {...register('status')} className={inputClasses}>
                                <option value="scheduled">Scheduled</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sessionUrl" className={labelClasses}>Session URL</label>
                            <input
                                type="url"
                                id="sessionUrl"
                                placeholder="https://zoom.us/j/..."
                                {...register('sessionUrl', {
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: 'Please enter a valid URL',
                                    },
                                })}
                                className={inputClasses}
                            />
                            {errors.sessionUrl && <p className={errorClasses}>{errors.sessionUrl.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="meetingId" className={labelClasses}>Meeting ID</label>
                            <input
                                type="text"
                                id="meetingId"
                                placeholder="123-456-7890"
                                {...register('meetingId')}
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label htmlFor="meetingPassword" className={labelClasses}>Meeting Password</label>
                            <input
                                type="text"
                                id="meetingPassword"
                                placeholder="React123"
                                {...register('meetingPassword')}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                {/* Section 4: Metadata */}
                <div>
                    <label htmlFor="externalMetadata" className={labelClasses}>External Metadata</label>
                    <textarea
                        id="externalMetadata"
                        rows={2}
                        placeholder="Any additional raw JSON or metadata..."
                        {...register('externalMetadata')}
                        className={inputClasses}
                    />
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-200 flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-black text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-white text-gray-700 font-medium rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ManageLiveClassEdit;