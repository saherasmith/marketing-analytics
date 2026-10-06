import { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

type EventItem = {
  title: string;
  date: string;
  time: string;
  type: string;
  status: string;
};

const initialEvents: EventItem[] = [
  {
    title: "Google Ads Campaign Review",
    date: "Sep 30, 2026",
    time: "10:00 AM",
    type: "Campaign",
    status: "Scheduled",
  },
  {
    title: "Weekly Marketing Meeting",
    date: "Oct 1, 2026",
    time: "11:30 AM",
    type: "Meeting",
    status: "Scheduled",
  },
  {
    title: "Meta Ads Creative Deadline",
    date: "Oct 2, 2026",
    time: "3:00 PM",
    type: "Deadline",
    status: "Upcoming",
  },
  {
    title: "Monthly Performance Report",
    date: "Oct 5, 2026",
    time: "9:30 AM",
    type: "Report",
    status: "Upcoming",
  },
];

export default function Calendar() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Campaign");

  const addEvent = () => {
    if (!title.trim() || !date || !time) {
      return;
    }

    const formattedDate = new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const formattedTime = new Date(
      `2000-01-01T${time}`
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const newEvent: EventItem = {
      title: title.trim(),
      date: formattedDate,
      time: formattedTime,
      type,
      status: "Upcoming",
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);

    setTitle("");
    setDate("");
    setTime("");
    setType("Campaign");
    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Calendar
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage campaign events, meetings and marketing deadlines.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          title="Total Events"
          value={String(24 + events.length - initialEvents.length)}
          icon={<CalendarDays className="h-5 w-5" />}
        />

        <SummaryCard
          title="Today's Events"
          value="3"
          icon={<Clock className="h-5 w-5" />}
        />

        <SummaryCard
          title="Completed"
          value="18"
          icon={<CheckCircle2 className="h-5 w-5" />}
        />

        <SummaryCard
          title="Upcoming"
          value={String(6 + events.length - initialEvents.length)}
          icon={<AlertCircle className="h-5 w-5" />}
        />

      </div>

      {/* Calendar View */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h2 className="font-semibold text-slate-900">
              September 2026
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Marketing activities and scheduled events
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Add Event
          </button>

        </div>

        {/* Simple Calendar Grid */}
        <div className="mt-6 grid grid-cols-7 overflow-hidden rounded-lg border border-slate-200">

          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              key={day}
              className="border-b border-slate-200 bg-slate-50 p-3 text-center text-xs font-semibold text-slate-600"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: 30 }, (_, index) => (
            <div
              key={index}
              className="min-h-[90px] border-b border-r border-slate-100 p-2 text-sm"
            >
              <span className="font-medium text-slate-700">
                {index + 1}
              </span>

              {index === 1 && (
                <div className="mt-2 rounded bg-blue-50 px-2 py-1 text-xs text-blue-700">
                  Campaign Review
                </div>
              )}

              {index === 4 && (
                <div className="mt-2 rounded bg-green-50 px-2 py-1 text-xs text-green-700">
                  Marketing Meeting
                </div>
              )}

              {index === 7 && (
                <div className="mt-2 rounded bg-amber-50 px-2 py-1 text-xs text-amber-700">
                  Creative Deadline
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Upcoming Events */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <h2 className="font-semibold text-slate-900">
            Upcoming Events
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your next marketing activities.
          </p>

        </div>

        <div>
          {events.map((event, index) => (
            <div
              key={`${event.title}-${index}`}
              className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >

              <div>
                <p className="font-semibold text-slate-900">
                  {event.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {event.date} • {event.time}
                </p>
              </div>

              <div className="flex items-center gap-3">

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {event.type}
                </span>

                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {event.status}
                </span>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add Event
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new marketing event.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="space-y-5 p-6">

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Event Name
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event name"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Time
                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Event Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option>Campaign</option>
                  <option>Meeting</option>
                  <option>Deadline</option>
                  <option>Report</option>
                </select>
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
                onClick={addEvent}
                disabled={!title.trim() || !date || !time}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Event
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function SummaryCard({
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