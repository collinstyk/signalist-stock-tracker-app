import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError, UseFormRegister } from "react-hook-form";

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  validation,
  disabled,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        id={name}
        className={cn("form-input", {
          "cursor-not-allowed opacity-50": disabled,
        })}
        {...register(
          name as
            | "email"
            | "password"
            | "fullname"
            | "country"
            | "investmentGoals"
            | "riskTolerance"
            | "preferredIndustry",
          validation,
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
