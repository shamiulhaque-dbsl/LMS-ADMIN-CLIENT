import { Course } from '../lib/api';
import { TableAction } from '@/types/table-actions';
import { Pencil, Eye, Trash2, Book, MoreHorizontal } from 'lucide-react';

export const courseActions: TableAction<Course>[] = [
  {
    id: 'edit',
    label: 'Edit',
    icon: <Pencil className="h-4 w-4" />,
    type: 'link',
    href: (course) => `/admin/courses/${course.id}/edit`,
    position: 'inline',
    variant: 'outline'
  },
  {
    id: 'view',
    label: 'View Details',
    icon: <Eye className="h-4 w-4" />,
    type: 'modal',
    modalTitle: 'Course Details',
    modalContent: (course) => (
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Title</h3>
          <p>{course.title}</p>
        </div>
        <div>
          <h3 className="font-medium">Category</h3>
          <p>{course.category}</p>
        </div>
        <div>
          <h3 className="font-medium">Price</h3>
          <p>{course.price}</p>
        </div>
        <div>
          <h3 className="font-medium">Status</h3>
          <p>{course.status}</p>
        </div>
      </div>
    )
  },
  {
    id: 'lessons',
    label: 'Manage Lessons',
    icon: <Book className="h-4 w-4" />,
    type: 'link',
    href: (course) => `/admin/courses/${course.id}/lessons`
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash2 className="h-4 w-4" />,
    type: 'modal',
    modalTitle: 'Delete Course',
    modalContent: (course) => (
      <p>Are you sure you want to delete {course.title}? This action cannot be undone.</p>
    ),
    onAction: async (course) => {
      // Add your delete API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Course deleted successfully');
    },
    variant: 'secondary'
  },
  {
    id: 'toggle-status',
    label: 'Toggle Status',
    type: 'toggle',
    isActive: (course) => course.status === 'active',
    onAction: async (course) => {
      // Add your status toggle API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
];