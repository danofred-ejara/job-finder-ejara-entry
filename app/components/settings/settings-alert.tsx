import React from "react";
import { Alert } from "antd";

export type SettingsAlertProps = {
  type: "success" | "warning";
  message: string;
  description?: string;
  onClose?: () => void;
};

export function SettingsAlert({
  type,
  message,
  description,
  onClose,
}: SettingsAlertProps) {
  return (
    <div className="mb-4">
      <Alert
        type={type === "warning" ? "warning" : "success"}
        message={message}
        description={description}
        showIcon
        closable
        onClose={onClose}
      />
    </div>
  );
}

export default SettingsAlert;
