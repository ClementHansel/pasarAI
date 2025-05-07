"use client";
import React, { useEffect, useState } from "react";
import { FormContainer } from "./forms/FormContainer";
import { PasswordField } from "./fields/PasswordField";
import { RoleSelector } from "./fields/RoleSelector";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { User, Mail, Phone, Home, MapPin, ImageIcon } from "lucide-react";
import { InputField } from "./fields/InputFields";
import { RegisterFormValues } from "@/lib/validation/registerSchema";
import { UserAvatar } from "@/components/common/UserAvatar";

interface Country {
  geonameId: number;
  countryCode: string;
  countryName: string;
}

interface Province {
  geonameId: string;
  name: string;
}

interface City {
  name: string;
}

interface RegisterFormProps {
  isLoading: boolean;
  onSubmit: (values: RegisterFormValues) => void;
  hidePasswordField?: boolean;
  initialValues?: Partial<RegisterFormValues>;
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

  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetch(
      "http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=greedybugz"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.geonames ?? []);
      })
      .catch(() => {
        setCountries([]);
      });
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 1) push the ISO code into formData.country
    handleChange(e);

    // 2) find the geonameId for the fetch
    const countryCode = e.target.value;
    const countryObj = countries.find((c) => c.countryCode === countryCode);
    if (!countryObj) {
      return;
    }

    // 3) set the currency in formData
    const newCurrency = countryCode === "ID" ? "IDR" : "USD";
    handleChange({
      target: { name: "currency", value: newCurrency },
    } as React.ChangeEvent<HTMLSelectElement>);

    // 4) fetch provinces by that numeric geonameId
    fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${countryObj.geonameId}&username=greedybugz`
    )
      .then((r) => r.json())
      .then((data) => setProvinces(data.geonames ?? []))
      .catch(() => setProvinces([]));

    // 5) clear city list
    setCities([]);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvGeoId = e.target.value;

    // 1) find the province by its geonameId
    const provObj = provinces.find((p) => p.geonameId === selectedProvGeoId);
    if (provObj) {
      // 2) push the province *name* into formData.province
      handleChange({
        target: { name: "province", value: provObj.name },
      } as React.ChangeEvent<HTMLSelectElement>);
    } else {
      // fallback if no match (e.g. cleared out)
      handleChange(e);
    }

    // Fetch cities by numeric geonameId
    fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${selectedProvGeoId}&username=greedybugz`
    )
      .then((res) => res.json())
      .then((data) => {
        const children: Province[] = data.geonames ?? [];
        setCities(children.map((child) => ({ name: child.name })));
      })
      .catch(() => {
        setCities([]);
      });
  };

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
          disabled
        >
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
        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
            <select
              id="country"
              name="country"
              value={formData.country || ""}
              onChange={handleCountryChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.geonameId} value={c.countryCode}>
                  {c.countryName}
                </option>
              ))}
            </select>
          </div>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.country}
            </p>
          )}
        </div>

        {/* Province */}
        <div className="mb-4">
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700"
          >
            Province <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
            <select
              id="province"
              name="province"
              value={formData.province || ""}
              onChange={handleProvinceChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select province</option>
              {provinces.map((p) => (
                <option key={p.geonameId} value={p.geonameId}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          {errors.province && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.province}
            </p>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
            <select
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.city}
            </p>
          )}
        </div>
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
