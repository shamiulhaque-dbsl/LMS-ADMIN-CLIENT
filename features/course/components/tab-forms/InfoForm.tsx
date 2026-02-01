"use client";

import { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import Text from "@/components/ui/Text";

import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";

// ---------------------
// Formatter
// ---------------------
const formatcourseDetail = (courseDetail: any) => {
  if (!courseDetail) return null;

  return {
    id: Number(courseDetail.id),
    requirements: courseDetail.requirements ? JSON.parse(courseDetail.requirements) : [],
    learningOutcomes: courseDetail.what_you_learn ? JSON.parse(courseDetail.what_you_learn) : [],
    targetAudience: courseDetail.for_whom ? JSON.parse(courseDetail.for_whom) : [],
    faqs: courseDetail.faqs ? JSON.parse(courseDetail.faqs) : [],
    projects: courseDetail.projects ? JSON.parse(courseDetail.projects) : [],
  };
};

function SectionWrapper({ title, children }: any) {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 p-4 shadow-sm">
      <Text as="div" className="mb-2 text-sm font-semibold sm:text-lg">
        {title}
      </Text>
      {children}
    </div>
  );
}

// ---------------------
// Dynamic Input List
// ---------------------
function DynamicInputList({ label, name }: any) {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  useEffect(() => {
    if (fields.length === 0) append("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {fields.map((item, idx) => (
        <div key={item.id} className="mb-3 flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder={label}
            {...register(`${name}.${idx}`)}
            className="w-full"
          />
          {fields.length > 1 && (
            <Button
              type="button"
              size="sm"
              onClick={() => remove(idx)}
              className="text-red-500 hover:bg-red-100"
            >
              <Icons.x size={16} />
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append("")}
        className="p-0 text-sm text-blue-600 hover:text-blue-800"
      >
        <Icons.plus size={16} className="mr-1" /> Add {label}
      </Button>
    </>
  );
}

// ---------------------
// Dynamic FAQ List
// ---------------------
function DynamicFaqList() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "faqs" });

  useEffect(() => {
    if (fields.length === 0) append({ question: "", answer: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {fields.map((faq, idx) => (
        <div key={faq.id} className="relative mb-4 rounded-md border p-3 shadow-sm">
          <div className="mb-2 flex justify-end">
            {fields.length > 1 && (
              <Button
                type="button"
                size="sm"
                onClick={() => remove(idx)}
                className="text-red-500 hover:bg-red-100"
              >
                <Icons.x size={16} />
              </Button>
            )}
          </div>

          <Input
            placeholder="Question"
            {...register(`faqs.${idx}.question`)}
            className="mb-2"
          />
          <textarea
            placeholder="Answer"
            rows={3}
            {...register(`faqs.${idx}.answer`)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ question: "", answer: "" })}
        className="p-0 text-sm text-blue-600 hover:text-blue-800"
      >
        <Icons.plus size={16} className="mr-1" /> Add FAQ
      </Button>
    </>
  );
}

// ---------------------
// Dynamic Project List
// ---------------------
function DynamicProjectList() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  useEffect(() => {
    if (fields.length === 0) append({ title: "", image: "", description: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {fields.map((project, idx) => (
        <div
          key={project.id}
          className="relative mb-4 rounded-md border border-gray-200 p-3 shadow-sm"
        >
          <div className="mb-2 flex justify-end">
            {fields.length > 1 && (
              <Button
                type="button"
                size="sm"
                onClick={() => remove(idx)}
                className="text-red-500 hover:bg-red-100"
              >
                <Icons.x size={16} />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Project Title"
              {...register(`projects.${idx}.title`)}
            />
            {/* <Input
              type="file"
              accept="image/*"
              {...register(`projects.${idx}.image`)}
              className="input-base"
            /> */}
            <textarea
              placeholder="Project Description"
              rows={3}
              {...register(`projects.${idx}.description`)}
              className="input-base"
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ title: "", image: "", description: "" })}
        className="p-0 text-sm text-blue-600 hover:text-blue-800"
      >
        <Icons.plus size={16} className="mr-1" /> Add Project
      </Button>
    </>
  );
}

// ---------------------
// Main InfoForm
// ---------------------
export const InfoForm = () => {
  const courseDetail = useCourseFormStore((s) => s.courseDetail);
  const { reset, getValues } = useFormContext();

  useEffect(() => {
    if (courseDetail) {
      const formatted = formatcourseDetail(courseDetail);
      if (formatted) {
        reset({
          ...getValues(),
          requirements: formatted.requirements.length ? formatted.requirements : [""],
          learningOutcomes: formatted.learningOutcomes.length ? formatted.learningOutcomes : [""],
          targetAudience: formatted.targetAudience.length ? formatted.targetAudience : [""],
          faqs: formatted.faqs.length ? formatted.faqs : [{ question: "", answer: "" }],
          projects: formatted.projects.length
            ? formatted.projects
            : [{ title: "", image: "", description: "" }],
        });
      }
    }
  }, [courseDetail, reset, getValues]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Course Details & Content</h2>
        <p className="text-gray-600">
          Add requirements, learning outcomes, target audience, FAQs, and projects.
        </p>
      </div>

      <SectionWrapper title="Course Requirements">
        <DynamicInputList label="Requirement" name="requirements" />
      </SectionWrapper>

      <SectionWrapper title="What You'll Learn">
        <DynamicInputList label="Learning Outcome" name="learningOutcomes" />
      </SectionWrapper>

      <SectionWrapper title="Who This Course is For">
        <DynamicInputList label="Target Audience" name="targetAudience" />
      </SectionWrapper>

      <SectionWrapper title="FAQs">
        <DynamicFaqList />
      </SectionWrapper>

      <SectionWrapper title="Projects">
        <DynamicProjectList />
      </SectionWrapper>
    </div>
  );
};

InfoForm.displayName = "InfoForm";
