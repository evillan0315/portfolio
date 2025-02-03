import { DynamicFormResponse } from "@/types/form";

/**
 * Validates a dynamic form against a schema.  Checks if all required fields are present in the data.
 *
 * @param data The form data as a key-value object.
 * @param schema The dynamic form schema (from your types/form.ts).
 * @returns `true` if the form data is valid according to the schema, `false` otherwise.
 */
export function validateDynamicForm(
  data: Record<string, any>,
  schema: DynamicFormResponse
): boolean {
  return schema.sections.every((section) =>
    section.fields.every((field) => {
      if (field.required && !data[field.name]) {
        return false;
      }
      return true;
    })
  );
}

/**
 * Validates form data, specifically checking for required fields and email format.
 * Returns an object containing error messages for any invalid fields.
 *
 * @param formData The form data as a key-value object.
 * @returns An object where keys are field names and values are error messages.  An empty object indicates no errors.
 */
const validateForm = (
  formData: Record<string, any>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const key in formData) {
    // More idiomatic way to iterate through object keys
    if (!formData[key]) {
      errors[key] = `${key} is required`; // Use key for dynamic error message
    }
  }

  // Email validation is now independent and checked even if email is not required
  if (formData["email"]) {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData["email"])) {
      errors.email = "Invalid email format";
    }
  }

  return errors;
};

export default validateForm;
