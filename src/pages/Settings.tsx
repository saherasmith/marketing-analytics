import { useEffect, useState } from "react";
import {
  User,
  Bell,
  Palette,
  Shield,
  Globe,
  Eye,
  EyeOff,
  Check,
  X,
  Save,
} from "lucide-react";

type MessageType = "success" | "error";

export default function Settings() {
  const [activeSetting, setActiveSetting] = useState("Security");

  // -----------------------------
  // Profile
  // -----------------------------
  const [firstName, setFirstName] = useState("Sahera");
  const [lastName, setLastName] = useState("Admin");
  const [email, setEmail] = useState("admin@marketingos.com");
  const [workspaceName, setWorkspaceName] =
    useState("Marketing Workspace");

  // -----------------------------
  // Notifications
  // -----------------------------
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [campaignAlerts, setCampaignAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  // -----------------------------
  // Appearance
  // -----------------------------
  const [darkMode, setDarkMode] = useState(true);

  // -----------------------------
  // Security
  // -----------------------------
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // -----------------------------
  // Forgot password
  // -----------------------------
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // -----------------------------
  // Message
  // -----------------------------
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<MessageType>("success");

  // -----------------------------
  // Theme persistence
  // -----------------------------
  useEffect(() => {
    const savedTheme = localStorage.getItem("marketingos-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // -----------------------------
  // Show message
  // -----------------------------
  const showMessage = (
    text: string,
    type: MessageType = "success"
  ) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // -----------------------------
  // Save profile
  // -----------------------------
  const handleSaveProfile = () => {
    showMessage("Profile settings saved successfully.");
  };

  // -----------------------------
  // Save notifications
  // -----------------------------
  const handleSaveNotifications = () => {
    showMessage("Notification settings saved successfully.");
  };

  // -----------------------------
  // Toggle dark mode
  // -----------------------------
  const handleDarkMode = () => {
    const newValue = !darkMode;

    setDarkMode(newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("marketingos-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("marketingos-theme", "light");
    }
  };

  // -----------------------------
  // Password validation
  // -----------------------------
  const passwordRules = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const passwordIsValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special;

  const passwordsMatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  // -----------------------------
  // Update password
  // -----------------------------
  const handleUpdatePassword = () => {
    if (!currentPassword.trim()) {
      showMessage(
        "Please enter your current password.",
        "error"
      );
      return;
    }

    if (!passwordIsValid) {
      showMessage(
        "Please meet all password requirements.",
        "error"
      );
      return;
    }

    if (!passwordsMatch) {
      showMessage(
        "New password and confirmation password do not match.",
        "error"
      );
      return;
    }

    showMessage("Password updated successfully.");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // -----------------------------
  // Forgot password
  // -----------------------------
  const handleForgotPassword = () => {
    if (!resetEmail.trim()) {
      showMessage(
        "Please enter your email address.",
        "error"
      );
      return;
    }

    if (!resetEmail.includes("@")) {
      showMessage(
        "Please enter a valid email address.",
        "error"
      );
      return;
    }

    showMessage(
      `Password reset instructions sent to ${resetEmail}.`
    );

    setResetEmail("");
    setShowForgotPassword(false);
  };

  const settings = [
    {
      title: "Profile",
      description: "Manage your personal information.",
      icon: User,
    },
    {
      title: "Notifications",
      description: "Control notification preferences.",
      icon: Bell,
    },
    {
      title: "Appearance",
      description: "Customize the look and feel.",
      icon: Palette,
    },
    {
      title: "Security",
      description: "Manage security preferences.",
      icon: Shield,
    },
    {
      title: "Workspace",
      description: "Manage workspace settings.",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage your account and workspace settings.
        </p>
      </div>

      {/* -------------------------------- */}
      {/* Message */}
      {/* -------------------------------- */}

      {message && (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            messageType === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[335px_1fr]">
        {/* -------------------------------- */}
        {/* LEFT SETTINGS MENU */}
        {/* -------------------------------- */}

        <div className="space-y-3">
          {settings.map((setting) => {
            const Icon = setting.icon;
            const isActive =
              activeSetting === setting.title;

            return (
              <button
                key={setting.title}
                onClick={() =>
                  setActiveSetting(setting.title)
                }
                className={`w-full rounded-xl border p-4 text-left transition ${
                  isActive
                    ? "border-blue-300 bg-blue-950/80"
                    : "border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-blue-950 text-blue-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {setting.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {setting.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* -------------------------------- */}
        {/* RIGHT CONTENT */}
        {/* -------------------------------- */}

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
          {/* ================================= */}
          {/* PROFILE */}
          {/* ================================= */}

          {activeSetting === "Profile" && (
            <div>
              <SectionHeader
                title="Profile"
                description="Manage your personal information."
              />

              <div className="p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <FormField
                    label="First Name"
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="Enter first name"
                  />

                  <FormField
                    label="Last Name"
                    value={lastName}
                    onChange={setLastName}
                    placeholder="Enter last name"
                  />

                  <FormField
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    placeholder="Enter email"
                  />

                  <FormField
                    label="Workspace Name"
                    value={workspaceName}
                    onChange={setWorkspaceName}
                    placeholder="Enter workspace name"
                  />
                </div>

                <div className="mt-6">
                  <PrimaryButton
                    onClick={handleSaveProfile}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* NOTIFICATIONS */}
          {/* ================================= */}

          {activeSetting === "Notifications" && (
            <div>
              <SectionHeader
                title="Notifications"
                description="Control notification preferences."
              />

              <div className="p-6 space-y-4">
                <ToggleCard
                  title="Email Notifications"
                  description="Receive important updates through email."
                  enabled={emailNotifications}
                  onChange={() =>
                    setEmailNotifications(
                      !emailNotifications
                    )
                  }
                />

                <ToggleCard
                  title="Campaign Alerts"
                  description="Get notified about campaign activity."
                  enabled={campaignAlerts}
                  onChange={() =>
                    setCampaignAlerts(!campaignAlerts)
                  }
                />

                <ToggleCard
                  title="Weekly Reports"
                  description="Receive weekly campaign performance reports."
                  enabled={weeklyReports}
                  onChange={() =>
                    setWeeklyReports(!weeklyReports)
                  }
                />

                <div className="pt-3">
                  <PrimaryButton
                    onClick={handleSaveNotifications}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* APPEARANCE */}
          {/* ================================= */}

          {activeSetting === "Appearance" && (
            <div>
              <SectionHeader
                title="Appearance"
                description="Customize the look and feel."
              />

              <div className="p-6">
                <ToggleCard
                  title="Dark Mode"
                  description="Use the dark theme across MarketingOS."
                  enabled={darkMode}
                  onChange={handleDarkMode}
                />
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* SECURITY */}
          {/* ================================= */}

          {activeSetting === "Security" && (
            <div>
              <SectionHeader
                title="Password"
                description="Update or reset your account password."
              />

              {!showForgotPassword ? (
                <div className="border-t border-slate-700 bg-blue-950/70 p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-white">
                        Change Password
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Enter your current password and choose a new password.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPassword("")
                      }
                      className="text-slate-400 transition hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* CURRENT PASSWORD */}

                  <PasswordField
                    label="Current Password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    placeholder="Enter current password"
                    visible={showCurrentPassword}
                    onToggle={() =>
                      setShowCurrentPassword(
                        !showCurrentPassword
                      )
                    }
                  />

                  {/* NEW PASSWORD */}

                  <div className="mt-5">
                    <PasswordField
                      label="New Password"
                      value={newPassword}
                      onChange={setNewPassword}
                      placeholder="Enter new password"
                      visible={showNewPassword}
                      onToggle={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                    />
                  </div>

                  {/* PASSWORD FORMAT */}

                  {newPassword.length > 0 && (
                    <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/70 p-4">
                      <p className="mb-3 text-sm font-semibold text-white">
                        Password requirements
                      </p>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <PasswordRule
                          valid={passwordRules.length}
                          text="At least 8 characters"
                        />

                        <PasswordRule
                          valid={passwordRules.uppercase}
                          text="One uppercase letter"
                        />

                        <PasswordRule
                          valid={passwordRules.lowercase}
                          text="One lowercase letter"
                        />

                        <PasswordRule
                          valid={passwordRules.number}
                          text="One number"
                        />

                        <PasswordRule
                          valid={passwordRules.special}
                          text="One special character"
                        />
                      </div>
                    </div>
                  )}

                  {/* CONFIRM PASSWORD */}

                  <div className="mt-5">
                    <PasswordField
                      label="Confirm New Password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Confirm new password"
                      visible={showConfirmPassword}
                      onToggle={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    />
                  </div>

                  {/* MATCH STATUS */}

                  {confirmPassword.length > 0 && (
                    <div className="mt-3">
                      <PasswordRule
                        valid={passwordsMatch}
                        text={
                          passwordsMatch
                            ? "Passwords match"
                            : "Passwords do not match"
                        }
                      />
                    </div>
                  )}

                  <p className="mt-4 text-xs text-slate-400">
                    Password must contain at least 8 characters,
                    including uppercase, lowercase, number and special character.
                  </p>

                  {/* BUTTONS */}

                  <div className="mt-5 flex flex-wrap justify-end gap-3">
                    <SecondaryButton
                      onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Cancel
                    </SecondaryButton>

                    <PrimaryButton
                      onClick={handleUpdatePassword}
                      disabled={
                        !currentPassword ||
                        !passwordIsValid ||
                        !passwordsMatch
                      }
                    >
                      <Save className="h-4 w-4" />
                      Update Password
                    </PrimaryButton>
                  </div>

                  {/* FORGOT PASSWORD */}

                  <div className="mt-6 border-t border-slate-700 pt-5">
                    <button
                      onClick={() =>
                        setShowForgotPassword(true)
                      }
                      className="text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
              ) : (
                /* FORGOT PASSWORD PANEL */

                <div className="border-t border-slate-700 p-6">
                  <div className="mb-6">
                    <h2 className="text-base font-semibold text-white">
                      Reset Password
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Enter your email address and we'll send
                      password reset instructions.
                    </p>
                  </div>

                  <FormField
                    label="Email Address"
                    value={resetEmail}
                    onChange={setResetEmail}
                    type="email"
                    placeholder="Enter your email address"
                  />

                  <div className="mt-5 flex justify-end gap-3">
                    <SecondaryButton
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetEmail("");
                      }}
                    >
                      Cancel
                    </SecondaryButton>

                    <PrimaryButton
                      onClick={handleForgotPassword}
                    >
                      Send Reset Instructions
                    </PrimaryButton>
                  </div>
                </div>
              )}

              {/* TWO FACTOR */}

              <div className="border-t border-slate-700 p-6">
                <h2 className="text-base font-semibold text-white">
                  Two-Factor Authentication
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Add an extra layer of security to your account.
                </p>

                <div className="mt-4">
                  <ToggleCard
                    title="Enable Two-Factor Authentication"
                    description="Require an additional verification code when signing in."
                    enabled={twoFactorEnabled}
                    onChange={() =>
                      setTwoFactorEnabled(
                        !twoFactorEnabled
                      )
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* WORKSPACE */}
          {/* ================================= */}

          {activeSetting === "Workspace" && (
            <div>
              <SectionHeader
                title="Workspace"
                description="Manage workspace settings."
              />

              <div className="p-6">
                <FormField
                  label="Workspace Name"
                  value={workspaceName}
                  onChange={setWorkspaceName}
                  placeholder="Enter workspace name"
                />

                <div className="mt-6">
                  <PrimaryButton
                    onClick={() =>
                      showMessage(
                        "Workspace settings saved successfully."
                      )
                    }
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SECTION HEADER */
/* ================================================= */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* ================================================= */
/* FORM FIELD */
/* ================================================= */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}

/* ================================================= */
/* PASSWORD FIELD */
/* ================================================= */

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  visible,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ================================================= */
/* PASSWORD RULE */
/* ================================================= */

function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        valid ? "text-green-400" : "text-slate-400"
      }`}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          valid
            ? "bg-green-500/15"
            : "bg-slate-800"
        }`}
      >
        {valid ? (
          <Check className="h-3 w-3" />
        ) : (
          <X className="h-3 w-3" />
        )}
      </div>

      <span>{text}</span>
    </div>
  );
}

/* ================================================= */
/* TOGGLE CARD */
/* ================================================= */

function ToggleCard({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950 p-4">
      <div className="pr-4">
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ================================================= */
/* PRIMARY BUTTON */
/* ================================================= */

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${
        disabled
          ? "cursor-not-allowed bg-blue-900/50 text-slate-500"
          : "bg-blue-600 hover:bg-blue-500"
      }`}
    >
      {children}
    </button>
  );
}

/* ================================================= */
/* SECONDARY BUTTON */
/* ================================================= */

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
    >
      {children}
    </button>
  );
}