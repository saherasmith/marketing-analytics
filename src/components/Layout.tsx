import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";


const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Campaigns",
    path: "/campaigns",
    icon: BriefcaseBusiness,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Audience",
    path: "/audience",
    icon: Users,
  },
  
    {
  name: "Leads",
  path: "/leads",
  icon: Users,
},
{
  name: "Tasks",
  path: "/tasks",
  icon: Users,
},
{
  name: "Calendar",
  path: "/calendar",
  icon: Users,
},
{
  name: "Reports",
  path: "/reports",
  icon: FileText,
},
{
  name: "Team",
  path: "/team",
  icon: Users,
},
  
];


export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              MarketingOS
            </h1>
            <p className="text-xs text-slate-500">
              Campaign Analytics
            </p>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur">
          <div>
            <p className="text-sm text-slate-500">
              Marketing workspace
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              SA
            </div>

            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              Admin
            </span>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}