// src/components/dashboard/AlertsNotifications/NotificationSettings.tsx
import React, { useState } from "react";

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  const handleToggleEmail = () => setEmailNotifications(!emailNotifications);
  const handleToggleSms = () => setSmsNotifications(!smsNotifications);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Notification Settings</h3>
      <div className="mt-4">
        <label className="block text-sm">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleToggleEmail}
            className="mr-2"
          />
          Email Notifications
        </label>
        <label className="block text-sm mt-2">
          <input
            type="checkbox"
            checked={smsNotifications}
            onChange={handleToggleSms}
            className="mr-2"
          />
          SMS Notifications
        </label>
      </div>
    </div>
  );
};

export default NotificationSettings;
