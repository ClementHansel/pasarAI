import { useState } from "react";
import { registerSchema } from "@/lib/validation/registerSchema";
import { z } from "zod";

// Use the inferred type from the Zod schema
type RegisterFormValues = z.infer<typeof registerSchema> & {
  currency?: string;
};

interface UseRegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
}

export const useRegisterForm = ({ onSubmit }: UseRegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER",
    phone: "",
    address: "",
    city: "",
    province: "",
    country: "",
    profileImage: "",
    referralCode: "",
    currency: "", // Add currency to form state
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormValues, string>>
  >({});

  const validateField = async (
    name: keyof RegisterFormValues,
    value: string
  ) => {
    try {
      // Extract the underlying ZodObject from the ZodEffects
      const fieldSchema = (
        registerSchema._def.schema as z.ZodObject<z.ZodRawShape>
      ).shape[name];
      await fieldSchema.parseAsync(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));

      // Additional validation for confirmPassword
      if (name === "confirmPassword") {
        if (value !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }
      }

      // Revalidate confirmPassword when password changes
      if (name === "password" && formData.confirmPassword) {
        if (formData.confirmPassword !== value) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof RegisterFormValues, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use the Zod schema to validate the entire form
      const validatedData = await registerSchema.parseAsync(formData);

      // Only call onSubmit with validated data, no API call here
      onSubmit(validatedData);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0] as keyof RegisterFormValues] = curr.message;
          return acc;
        }, {} as Partial<Record<keyof RegisterFormValues, string>>);
        setErrors(newErrors);
      }
    }
  };

  return {
    formData,
    setFormData, // Add setFormData to return value
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword: () => setShowPassword((prev) => !prev),
    setRole: (role: "BUYER" | "SELLER") =>
      setFormData((prev) => ({ ...prev, role })),
  };
};
