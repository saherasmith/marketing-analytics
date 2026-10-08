import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  BarChart3,
  Users,
  CheckSquare,
  FileText,
  DollarSign,
  Settings,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useUserStore } from "../store";

import {
  campaigns,
  leads,
  reports,
  tasks,
  budgets,
  analytics,
} from "../data";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "Administrator",
      "Campaign Manager",
      "Marketing Executive",
      "Analyst",
      "Viewer",
    ],
  },
  {
    name: "Campaigns",
    path: "/campaigns",
    icon: BriefcaseBusiness,
    roles: ["Administrator", "Campaign Manager", "Marketing Executive"],
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    roles: ["Administrator", "Campaign Manager", "Analyst", "Viewer"],
  },
  {
    name: "Audience",
    path: "/audience",
    icon: Users,
    roles: ["Administrator", "Campaign Manager", "Marketing Executive"],
  },
  {
    name: "Leads",
    path: "/leads",
    icon: Users,
    roles: ["Administrator", "Campaign Manager", "Marketing Executive"],
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
    roles: ["Administrator", "Campaign Manager", "Marketing Executive"],
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: Users,
    roles: ["Administrator", "Campaign Manager", "Marketing Executive"],
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
    roles: ["Administrator", "Campaign Manager", "Analyst"],
  },
  {
    name: "Budget",
    path: "/budget",
    icon: DollarSign,
    roles: ["Administrator", "Campaign Manager", "Analyst"],
  },
  {
    name: "Team",
    path: "/team",
    icon: Users,
    roles: ["Administrator"],
  },
];

export default function Layout() {
  const role = useUserStore((state) => state.role);
  const userName = useUserStore((state) => state.userName);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Search box reference
  const searchRef = useRef<HTMLDivElement>(null);

  const visibleNavigation = navigation.filter((item) =>
    item.roles.includes(role)
  );

  // =========================
  // SEARCH DATA
  // =========================

  const searchItems = [
    ...campaigns.map((item) => ({
      name: item.name,
      description: "Campaign",
      path: "/campaigns",
      icon: BriefcaseBusiness,
    })),

    ...leads.map((item) => ({
      name: item.name,
      description: "Lead",
      path: "/leads",
      icon: Users,
    })),

    ...reports.map((item) => ({
      name: item.name,
      description: "Report",
      path: "/reports",
      icon: FileText,
    })),

    ...tasks.map((item) => ({
      name: item.name,
      description: "Task",
      path: "/tasks",
      icon: CheckSquare,
    })),

    ...budgets.map((item) => ({
      name: item.name,
      description: "Budget",
      path: "/budget",
      icon: DollarSign,
    })),

    ...analytics.map((item) => ({
      name: item.name,
      description: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    })),
  ];

  // =========================
  // FILTER SEARCH RESULTS
  // =========================

  const filteredResults = searchItems.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return false;
    }

    const searchableText =
      `${item.name} ${item.description}`.toLowerCase();

    return searchableText.includes(query);
  });

  // Reset selected result when search text changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // =========================
  // CTRL + K + CLICK OUTSIDE
  // =========================

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    const handleGlobalShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        const input = searchRef.current?.querySelector(
          "input"
        ) as HTMLInputElement | null;

        input?.focus();
        setShowSearchResults(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleGlobalShortcut);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleGlobalShortcut);
    };
  }, []);

  // =========================
  // SEARCH RESULT SELECT
  // =========================

  const handleSearchSelect = (path: string) => {
    navigate(path);

    setSearchQuery("");
    setShowSearchResults(false);
    setSelectedIndex(0);
  };

  // =========================
  // KEYBOARD NAVIGATION
  // =========================

  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // ESCAPE
    if (e.key === "Escape") {
      setShowSearchResults(false);
      setSelectedIndex(0);
      return;
    }

    // If no results, stop here
    if (filteredResults.length === 0) {
      return;
    }

    // ARROW DOWN
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setShowSearchResults(true);

      setSelectedIndex((currentIndex) =>
        currentIndex < filteredResults.length - 1
          ? currentIndex + 1
          : 0
      );

      return;
    }

    // ARROW UP
    if (e.key === "ArrowUp") {
      e.preventDefault();

      setShowSearchResults(true);

      setSelectedIndex((currentIndex) =>
        currentIndex > 0
          ? currentIndex - 1
          : filteredResults.length - 1
      );

      return;
    }

    // ENTER
    if (e.key === "Enter") {
      e.preventDefault();

      const selectedResult =
        filteredResults[selectedIndex];

      if (selectedResult) {
        handleSearchSelect(selectedResult.path);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          SIDEBAR
      ========================= */}

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

          {visibleNavigation.map((item) => {
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

        {role === "Administrator" && (
          <div className="absolute bottom-4 left-4 right-4">

            <NavLink
              to="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <Settings className="h-5 w-5" />

              Settings
            </NavLink>

          </div>
        )}

      </aside>

      {/* =========================
          MAIN AREA
      ========================= */}

      <div className="lg:pl-64">

        {/* =========================
            HEADER
        ========================= */}

        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur">

          <div className="flex items-center gap-4">

            <p className="hidden text-sm text-slate-500 md:block">
              Marketing workspace
            </p>

            {/* =========================
                SEARCH
            ========================= */}

            <div
              ref={searchRef}
              className="relative"
            >

              <div className="flex w-64 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-blue-400 focus-within:bg-white md:w-80">

                <Search className="mr-2 h-4 w-4 text-slate-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim() !== "") {
                      setShowSearchResults(true);
                    }
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search campaigns, leads..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                {/* CLEAR BUTTON */}

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                      setSelectedIndex(0);
                    }}
                    className="ml-2 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}

                {/* CTRL + K HINT */}

                {!searchQuery && (
                  <span className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">
                    Ctrl K
                  </span>
                )}

              </div>

              {/* =========================
                  SEARCH RESULTS
              ========================= */}

              {showSearchResults &&
                searchQuery.trim() !== "" && (
                  <div className="absolute left-0 top-12 z-50 w-80 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">

                    {filteredResults.length > 0 ? (

                      <div className="py-2">

                        <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Search Results
                        </p>

                        {filteredResults.map((item, index) => {

                          const Icon = item.icon;

                          const isSelected =
                            index === selectedIndex;

                          return (
                            <button
                              key={`${item.path}-${item.name}-${index}`}
                              onClick={() =>
                                handleSearchSelect(item.path)
                              }
                              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                                isSelected
                                  ? "bg-blue-50"
                                  : "hover:bg-slate-50"
                              }`}
                            >

                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                  isSelected
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-slate-50 text-slate-500"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>

                              <div className="min-w-0 flex-1">

                                <p className="truncate text-sm font-medium text-slate-800">
                                  {item.name}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {item.description}
                                </p>

                              </div>

                              {isSelected && (
                                <span className="text-xs text-blue-500">
                                  Enter
                                </span>
                              )}

                            </button>
                          );
                        })}

                      </div>

                    ) : (

                      <div className="px-4 py-6 text-center">

                        <Search className="mx-auto mb-2 h-6 w-6 text-slate-300" />

                        <p className="text-sm font-medium text-slate-600">
                          No results found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try searching for campaigns, leads,
                          reports, tasks, budget or analytics.
                        </p>

                      </div>

                    )}

                  </div>
                )}

            </div>

            {/* =========================
                NOTIFICATIONS
            ========================= */}

            <NavLink
              to="/notifications"
              className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </NavLink>

          </div>

          {/* =========================
              USER PROFILE
          ========================= */}

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {userName.charAt(0).toUpperCase()}
            </div>

            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {userName}
            </span>

            <ChevronDown className="h-4 w-4 text-slate-400" />

          </button>

        </header>

        {/* =========================
            PAGE CONTENT
        ========================= */}

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}