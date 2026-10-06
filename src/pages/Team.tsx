import { useState } from "react";

import {
  Users,
  UserPlus,
  Shield,
  Mail,
  X,
} from "lucide-react";

type TeamMember = {
  name: string;
  email: string;
  role: string;
  status: string;
};

const initialTeamMembers: TeamMember[] = [
  {
    name: "Aarav Sharma",
    email: "aarav@marketingos.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Priya Kumar",
    email: "priya@marketingos.com",
    role: "Marketing Manager",
    status: "Active",
  },
  {
    name: "Rahul Mehta",
    email: "rahul@marketingos.com",
    role: "Analyst",
    status: "Active",
  },
  {
    name: "Ananya Singh",
    email: "ananya@marketingos.com",
    role: "Content Manager",
    status: "Invited",
  },
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    initialTeamMembers
  );

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Marketing Manager");

  const inviteMember = () => {
    if (!name.trim() || !email.trim()) {
      return;
    }

    const newMember: TeamMember = {
      name: name.trim(),
      email: email.trim(),
      role,
      status: "Invited",
    };

    setTeamMembers((currentMembers) => [
      ...currentMembers,
      newMember,
    ]);

    setName("");
    setEmail("");
    setRole("Marketing Manager");
    setShowModal(false);
  };

  const pendingInvites = teamMembers.filter(
    (member) => member.status === "Invited"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Team
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your marketing workspace members and roles.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Team Members"
          value={String(teamMembers.length + 8)}
          icon={<Users className="h-5 w-5" />}
        />

        <KpiCard
          title="Active Members"
          value={String(
            teamMembers.filter(
              (member) => member.status === "Active"
            ).length + 7
          )}
          icon={<Shield className="h-5 w-5" />}
        />

        <KpiCard
          title="Pending Invites"
          value={String(pendingInvites)}
          icon={<Mail className="h-5 w-5" />}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Team Members
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            People who have access to this workspace.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-700">
                  Member
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Role
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {teamMembers.map((member) => (
                <tr
                  key={member.email}
                  className="border-t border-slate-100"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        {member.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {member.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {member.role}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        member.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Invite Member
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Invite a new member to your workspace.
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
                  Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter member name"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Role
                </label>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option>Marketing Manager</option>
                  <option>Analyst</option>
                  <option>Content Manager</option>
                  <option>Admin</option>
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
                onClick={inviteMember}
                disabled={!name.trim() || !email.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send Invitation
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
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <div className="text-blue-600">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}