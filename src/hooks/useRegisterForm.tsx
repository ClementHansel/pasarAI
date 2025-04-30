// src/hooks/useRegisterForm.ts
import {
  RegisterFormValues,
  registerSchema,
} from "@/lib/utils/validation/registerSchema";
import { useState } from "react";

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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({});

  const validateField = async (
    name: keyof RegisterFormValues,
    value: string
  ) => {
    try {
      await registerSchema.pick({ [name]: true }).parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
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
      const validatedData = await registerSchema.parseAsync(formData);
      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0] as keyof RegisterFormValues] = curr.message;
          return acc;
        }, {} as Partial<RegisterFormValues>);
        setErrors(newErrors);
      }
    }
  };

  return {
    formData,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword: () => setShowPassword((prev) => !prev),
    setRole: (role: "BUYER" | "SELLER") =>
      setFormData((prev) => ({ ...prev, role })),
  };
};
