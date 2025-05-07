// src/components/auth/forms/FormContainer.tsx
import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    {children}
  </form>
);
