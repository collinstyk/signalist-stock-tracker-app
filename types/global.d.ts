import { Control, FieldError, UseFormRegister } from "react-hook-form";

export declare global {
  interface SignInFormData {
    email: string;
    password: string;
  }

  interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  }

  type FormInputProps = {
    name: string;
    label: string;
    disabled?: boolean;
    placeholder: string;
    type?: string;
    register: UseFormRegister<Record<string, unknown>>;
    error: FieldError | undefined;
    validation: {
      [key: string]: unknown;
    };
  };

  type Option = {
    value: string;
    label: string;
  };

  type SelectFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    options: readonly Option[];
    control: Control<Record<string, unknown>>;
    error?: FieldError;
    required?: boolean;
  };

  type CountrySelectFieldProps = {
    name: string;
    label: string;
    control: Control<Record<string, unknown>>;
    placeholder: string;
    error: FieldError | undefined;
    required?: boolean;
  };

  type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
  };
}
