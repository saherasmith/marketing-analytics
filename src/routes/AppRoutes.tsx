import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Campaigns from "../pages/Campaigns";
import CampaignCreate from "../pages/CampaignCreate";
import CampaignDetails from "../pages/CampaignDetails";
import Analytics from "../pages/Analytics";
import Audience from "../pages/Audience";
import Leads from "../pages/Leads";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calendar";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Team from "../pages/Team";
import Settings from "../pages/Settings";
import Budget from "../pages/Budget";

import Layout from "../components/Layout";
import { useUserStore } from "../store";

function RoleRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const role = useUserStore((state) => state.role);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
                "Analyst",
                "Viewer",
              ]}
            >
              <Dashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/campaigns"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
              ]}
            >
              <Campaigns />
            </RoleRoute>
          }
        />

        <Route
          path="/campaigns/new"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
              ]}
            >
              <CampaignCreate />
            </RoleRoute>
          }
        />

        <Route
          path="/campaigns/:id"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
              ]}
            >
              <CampaignDetails />
            </RoleRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Analyst",
                "Viewer",
              ]}
            >
              <Analytics />
            </RoleRoute>
          }
        />

        <Route
          path="/audience"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
              ]}
            >
              <Audience />
            </RoleRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
              ]}
            >
              <Leads />
            </RoleRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
              ]}
            >
              <Tasks />
            </RoleRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Marketing Executive",
              ]}
            >
              <Calendar />
            </RoleRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <RoleRoute
              allowedRoles={[
                "Administrator",
                "Campaign Manager",
                "Analyst",
              ]}
            >
              <Reports />
            </RoleRoute>
          }
        />
        <Route
  path="/notifications"
  element={
    <RoleRoute
      allowedRoles={[
        "Administrator",
        "Campaign Manager",
        "Marketing Executive",
        "Analyst",
        "Viewer",
      ]}
    >
      <Notifications />
    </RoleRoute>
  }
/>
        <Route
  path="/budget"
  element={
    <RoleRoute
      allowedRoles={[
        "Administrator",
        "Campaign Manager",
        "Analyst",
      ]}
    >
      <Budget />
    </RoleRoute>
  }
/>

        <Route
          path="/team"
          element={
            <RoleRoute allowedRoles={["Administrator"]}>
              <Team />
            </RoleRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <RoleRoute allowedRoles={["Administrator"]}>
              <Settings />
            </RoleRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
}