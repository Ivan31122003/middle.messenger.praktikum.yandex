import type { Validator, ValidationResult } from './validator';

export type ValidationSchema = Record<string, Validator>;

export const validateForm = (formData: FormData, schema: ValidationSchema) => {
  const values: Record<string, string> = {};
  const errors: Record<string, ValidationResult> = {};

  for (const [name, validate] of Object.entries(schema)) {
    const value = String(formData.get(name) ?? '');

    values[name] = value;
    errors[name] = validate(value);
  }

  return {
    values,
    errors,
    isValid: !Object.values(errors).some(Boolean),
  };
};
