import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";

type Task = {
  title: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: string;
};

const initialTasks: Task[] = [
  {
    title: "Review Google Ads performance",
    assignee: "Aarav",
    priority: "High",
    status: "In Progress",
    dueDate: "Sep 30, 2026",
  },
  {
    title: "Prepare weekly campaign report",
    assignee: "Priya",
    priority: "Medium",
    status: "To Do",
    dueDate: "Oct 1, 2026",
  },
  {
    title: "Update Meta Ads creatives",
    assignee: "Rahul",
    priority: "High",
    status: "In Progress",
    dueDate: "Oct 2, 2026",
  },
  {
    title: "Check lead conversion data",
    assignee: "Ananya",
    priority: "Low",
    status: "Completed",
    dueDate: "Sep 28, 2026",
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("Aarav");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (!title.trim() || !dueDate) {
      return;
    }

    const formattedDate = new Date(
      `${dueDate}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newTask: Task = {
      title: title.trim(),
      assignee,
      priority,
      status,
      dueDate: formattedDate,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    setTitle("");
    setAssignee("Aarav");
    setPriority("Medium");
    setStatus("To Do");
    setDueDate("");
    setShowModal(false);
  };

  const totalTasks = tasks.length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Organize and track your marketing team tasks.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <KpiCard
          title="Total Tasks"
          value={String(totalTasks)}
          icon={<ListTodo className="h-5 w-5" />}
        />

        <KpiCard
          title="In Progress"
          value={String(inProgress)}
          icon={<Clock className="h-5 w-5" />}
        />

        <KpiCard
          title="Completed"
          value={String(completed)}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />

        <KpiCard
          title="High Priority"
          value={String(highPriority)}
          icon={<AlertCircle className="h-5 w-5" />}
        />

      </div>

      {/* Task Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Task List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current marketing tasks and their progress.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px] text-left text-sm">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Task
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Assignee
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Priority
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Due Date
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={`${task.title}-${index}`}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {task.title}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {task.assignee}
                  </td>

                  <td className="px-5 py-4">
                    <PriorityBadge priority={task.priority} />
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={task.status} />
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {task.dueDate}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add Task
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new marketing task.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-6">

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Task Name
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task name"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Assignee
                </label>

                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option>Aarav</option>
                  <option>Priya</option>
                  <option>Rahul</option>
                  <option>Ananya</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={addTask}
                disabled={!title.trim() || !dueDate}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Task
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function KpiCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[priority]
      }`}
    >
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "To Do": "bg-slate-100 text-slate-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}