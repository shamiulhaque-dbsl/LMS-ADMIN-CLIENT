import { useDropdown } from "@/hooks/useDropdown";
import { Dropdown } from "@/components/common/Dropdown";
import { Icons } from "@/components/Icons";
import Link from "next/link";

interface Notification {
  id: number;
  title: string;
  time: string;
  isUnread: boolean;
}

interface NotificationItemProps {
  title: string;
  time: string;
  isUnread: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, time, isUnread }) => (
  <a
    href="#"
    className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 
        ${isUnread ? "bg-gray-50 dark:bg-gray-700/50" : ""}`}
  >
    <div className="flex items-center">
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
      {isUnread && <span className="h-2 w-2 rounded-full bg-blue-600"></span>}
    </div>
  </a>
);

export const NotificationDropdown: React.FC = () => {
  const { isOpen, toggle, close } = useDropdown();

  const notifications: Notification[] = [
    {
      id: 1,
      title: "New message from John",
      time: "10 minutes ago",
      isUnread: true,
    },
    { id: 2, title: "Meeting reminder", time: "1 hour ago", isUnread: true },
    { id: 3, title: "Update completed", time: "2 hours ago", isUnread: false },
    { id: 4, title: "Update completed", time: "2 hours ago", isUnread: false },
    { id: 5, title: "Update completed", time: "2 hours ago", isUnread: false },
  ];

  const trigger = (
    <button
      type="button"
      onClick={toggle}
      className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
    >
      <Icons.bell className="w-6 h-6" />
      {notifications.some((n) => n.isUnread) && (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
      )}
    </button>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={close}
      trigger={trigger}
      className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </div>
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600">
        <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          View all notifications
        </Link>
      </div>
    </Dropdown>
  );
};
