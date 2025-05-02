// src/components/auth/RegisterForm.tsx
import React from "react";
import { FormContainer } from "./forms/FormContainer";
import { PasswordField } from "./fields/PasswordField";
import { RoleSelector } from "./fields/RoleSelector"; // Added missing import
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { User, Mail, Phone, Home, MapPin, ImageIcon } from "lucide-react";
import { InputField } from "./fields/InputFields";
import { RegisterFormValues } from "@/lib/validation/registerSchema";
import { UserAvatar } from "@/components/common/UserAvatar";

interface RegisterFormProps {
  isLoading: boolean;
  onSubmit: (values: RegisterFormValues) => void;
  hidePasswordField?: boolean; // For social profile completion
  initialValues?: Partial<RegisterFormValues>; // For pre-filling
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  isLoading,
  onSubmit,
  hidePasswordField = false,
}) => {
  const {
    formData,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
    setRole,
  } = useRegisterForm({ onSubmit });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        name="name"
        icon={<User className="h-5 w-5 text-gray-400" aria-hidden="true" />}
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        required
        error={errors.name}
      />

      <InputField
        name="email"
        icon={<Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />}
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
      />

      {/* Currency select */}
      <div className="mb-4">
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-gray-700"
        >
          Currency <span className="text-red-500">*</span>
        </label>
        <select
          id="currency"
          name="currency"
          value={formData.currency || ""}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select currency</option>
          <option value="IDR">IDR - Indonesian Rupiah</option>
          <option value="USD">USD - US Dollar</option>
        </select>
        {errors.currency && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.currency}
          </p>
        )}
      </div>

      {!hidePasswordField && (
        <PasswordField
          name="password"
          value={formData.password || ""}
          onChange={handleChange}
          error={errors.password}
          showPassword={showPassword}
          togglePassword={setShowPassword}
        />
      )}

      {!hidePasswordField && (
        <PasswordField
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPassword={showPassword}
          togglePassword={setShowPassword}
          error={errors.confirmPassword}
        />
      )}

      <InputField
        name="phone"
        icon={<Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />}
        label="Phone"
        type="tel"
        placeholder="Enter your phone number"
        value={formData.phone || ""}
        onChange={handleChange}
      />

      <InputField
        name="address"
        icon={<Home className="h-5 w-5 text-gray-400" aria-hidden="true" />}
        label="Address"
        type="text"
        placeholder="Enter your street address"
        value={formData.address || ""}
        onChange={handleChange}
      />

      <div className="grid grid-cols-3 gap-4">
        <InputField
          name="city"
          icon={<MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          label="City"
          type="text"
          placeholder="Enter your city"
          value={formData.city || ""}
          onChange={handleChange}
        />
        <InputField
          name="province"
          icon={<MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          label="Province"
          type="text"
          placeholder="Enter your province"
          value={formData.province || ""}
          onChange={handleChange}
        />
        <InputField
          name="country"
          icon={<MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          label="Country"
          type="text"
          placeholder="Enter your country"
          value={formData.country || ""}
          onChange={handleChange}
        />
      </div>

      <InputField
        name="profileImage"
        icon={
          <ImageIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        }
        label="Profile Image URL (optional)"
        type="url"
        placeholder="Leave empty for default avatar with your initials"
        value={formData.profileImage || ""}
        onChange={handleChange}
        error={errors.profileImage}
      />
      {/* Avatar preview */}
      <div className="flex justify-center my-4">
        <UserAvatar
          name={formData.name || "?"}
          imageUrl={formData.profileImage}
          size={48}
        />
      </div>

      <RoleSelector role={formData.role} setRole={setRole} />

      <InputField
        name="referralCode"
        icon={<div className="h-5 w-5" aria-hidden="true" />}
        label="Referral Code"
        type="text"
        placeholder="Enter referral code if you have one"
        value={formData.referralCode || ""}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
    </FormContainer>
  );
};
