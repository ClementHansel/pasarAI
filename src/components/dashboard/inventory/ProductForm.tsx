"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/CheckBox";
import MarketSelect from "./MarketSelect";
import SubmitButton from "./SubmitButton";
import {
  Tag,
  FileText,
  DollarSign,
  Package,
  TrendingUp,
  Box,
  Tags,
} from "lucide-react";
import InputField from "./InputField";
import { Product } from "@/types/inventory";
import { useSession } from "next-auth/react";

// Define types for ProductForm props
type ProductFormProps = {
  initialData?: Product | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

interface ProductFormData {
  name: string;
  description?: string;
  price: string;
  image: string;
  stock: string;
  soldCount: string;
  unit: string;
  tags: string;
  categoryId: string;
  ecoCertifications: string;
  origin: string;
  sku: string;
  isActive: boolean;
  accountId: string;
  marketId: string;
  label: string;
  discount: string;
  featured: boolean;
  createdAt: string;
  market: string;
}

const initialState: ProductFormData = {
  name: "",
  description: "",
  price: "",
  image: "",
  stock: "",
  soldCount: "",
  unit: "",
  tags: "",
  categoryId: "",
  ecoCertifications: "",
  origin: "",
  sku: "",
  isActive: true,
  accountId: "",
  marketId: "",
  label: "",
  createdAt: new Date().toISOString().slice(0, 16), // format for datetime-local
  discount: "",
  featured: false,
  market: "domestic", // Default value for market
};

const ProductForm = ({
  initialData = null,
  onSuccess,
  onCancel,
}: ProductFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState<ProductFormData>(
    initialData
      ? {
          ...initialData,
          description: initialData.description || "", // Default to empty string if description is missing
          createdAt:
            initialData.createdAt || new Date().toISOString().slice(0, 16),
          image: initialData.image || "",
          stock: initialData.stock || "0",
          soldCount: initialData.soldCount || "0",
          unit: initialData.unit || "",
          tags: initialData.tags || "",
          categoryId: initialData.categoryId || "",
          ecoCertifications: initialData.ecoCertifications || "",
          origin: initialData.origin || "",
          sku: initialData.sku || "",
          isActive:
            initialData.isActive !== undefined ? initialData.isActive : true,
          accountId: initialData.accountId || "",
          marketId: initialData.marketId || "",
          label: initialData.label || "",
          discount: initialData.discount || "",
          featured:
            initialData.featured !== undefined ? initialData.featured : false,
          market: initialData.market || "domestic", // Ensure market is set
        }
      : initialState
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    name: keyof ProductFormData,
    value: boolean
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    setError(""); // Clear any previous errors

    // Check if session exists and the user info is available
    if (!session || !session.user) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      // Send product data to API
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: session.user.id, // Add accountId to the request body
          role: session.user.role,
          ...formData, // Send the product data
        }),
      });

      const result = await response.json(); // Parse JSON response

      if (response.ok) {
        // If successful, call the onSuccess callback or redirect
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard/inventory");
        }
      } else {
        // Set error message if response is not ok
        setError(result.error || "Failed to create product");
      }
    } catch (error) {
      // Catch network errors or other issues
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const inputFields = [
    {
      label: "Product Name",
      name: "name",
      icon: <Tag />,
      required: true,
      placeholder: "Enter product name",
    },
    {
      label: "Product Description",
      name: "description",
      icon: <FileText />,
      placeholder: "Enter product description",
    },
    {
      label: "Price",
      name: "price",
      icon: <DollarSign />,
      type: "number",
      required: true,
      placeholder: "Enter price",
    },
    {
      label: "Discount",
      name: "discount",
      type: "number",
      placeholder: "Discount",
    },
    {
      label: "Image URL",
      name: "image",
      type: "text",
      placeholder: "Enter image URL",
    },
    {
      label: "Stock",
      name: "stock",
      icon: <Package />,
      type: "number",
      required: true,
      placeholder: "Enter stock quantity",
    },
    {
      label: "Sold Count",
      name: "soldCount",
      icon: <TrendingUp />,
      type: "number",
      placeholder: "Enter sold count",
    },
    {
      label: "Unit",
      name: "unit",
      icon: <Box />,
      type: "text",
      placeholder: "Enter unit (e.g., kg, pcs)",
    },
    {
      label: "Tags",
      name: "tags",
      icon: <Tags />,
      type: "text",
      placeholder: "Enter tags",
    },
    {
      label: "Category ID",
      name: "categoryId",
      type: "number",
      placeholder: "Enter category ID",
    },
    {
      label: "Eco Certifications",
      name: "ecoCertifications",
      type: "text",
      placeholder: "e.g. FSC, USDA Organic",
    },
    {
      label: "Origin",
      name: "origin",
      type: "text",
      placeholder: "Country of origin",
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      placeholder: "Stock Keeping Unit",
    },
    {
      label: "Created At",
      name: "createdAt",
      type: "datetime-local",
      placeholder: "Creation Date",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {error && <div className="text-red-500">{error}</div>}

        {/* Render input fields */}
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name as keyof ProductFormData] as string}
            onChange={handleChange}
            icon={field.icon}
            type={field.type || "text"}
            required={field.required}
            placeholder={field.placeholder}
          />
        ))}

        {/* Status Checkboxes */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                handleCheckboxChange("isActive", Boolean(checked))
              }
            />
            <span>Active</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formData.featured}
              onCheckedChange={(checked) =>
                handleCheckboxChange("featured", Boolean(checked))
              }
            />
            <span>Featured</span>
          </label>
        </div>

        {/* Market Select */}
        <MarketSelect market={formData.market} onChange={handleChange} />

        {/* Submit Button */}
        <SubmitButton loading={loading} />
      </form>

      {/* Cancel Button */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default ProductForm;
