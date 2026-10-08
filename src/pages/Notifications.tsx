import { useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Budget Alert",
    message: "Summer Performance Campaign has crossed 80% of its budget.",
    type: "warning",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Campaign Performance",
    message: "Google Ads campaign generated 124 new conversions.",
    type: "success",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "New Leads",
    message: "15 new leads were added to your workspace.",
    type: "info",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "Task Completed",
    message: "Monthly campaign report has been completed.",
    type: "success",
    time: "Yesterday",
    read: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Stay updated with your marketing workspace.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Mark all as read
        </button>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Unread notifications
            </p>

            <p className="text-2xl font-bold text-slate-900">
              {unreadCount}
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {notifications.map((notification) => {
          const Icon =
            notification.type === "warning"
              ? AlertTriangle
              : notification.type === "success"
                ? CheckCircle2
                : Info;

          return (
            <div
              key={notification.id}
              className={`flex gap-4 border-b border-slate-100 p-5 last:border-0 ${
                !notification.read ? "bg-blue-50/40" : "bg-white"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                <Icon className="h-5 w-5 text-slate-600" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {notification.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {notification.message}
                    </p>
                  </div>

                  {!notification.read && (
                    <span className="h-fit rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      New
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {notification.time}
                  </span>

                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}