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
import Team from "../pages/Team";
import Settings from "../pages/Settings";

import Layout from "../components/Layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/new" element={<CampaignCreate />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}