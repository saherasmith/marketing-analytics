import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore, type UserRole } from "../store";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Viewer");
  const setUserName = useUserStore((state) => state.setUserName);

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  useUserStore.getState().setRole(role);

  const name = email.split("@")[0];
  setUserName(name);

  navigate("/");
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            MarketingOS
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to your marketing analytics workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="Administrator">
                Administrator
              </option>

              <option value="Campaign Manager">
                Campaign Manager
              </option>

              <option value="Marketing Executive">
                Marketing Executive
              </option>

              <option value="Analyst">
                Analyst
              </option>

              <option value="Viewer">
                Viewer
              </option>
            </select>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Demo frontend — no real authentication is connected.
        </p>
      </div>
    </div>
  );
}