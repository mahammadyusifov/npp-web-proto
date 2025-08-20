// --- /utils-bayesian/validate.ts ---

import { validationSchema } from './tabs';

// Define a type for the function's return value for clarity
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// The formData is expected to be a flat JSON object with string keys and any value type from the form.
export function validateFormData(formData: Record<string, any>): ValidationResult {
  console.log("Received request for validation.");
  const errors: string[] = [];

  // Define the settings fields that should be allowed but not validated against the schema.
  const settingsFields = new Set<string>([
      "nChains", 
      "nIter", 
      "nBurnin", 
      "nThin",
      "autoCloseWinBugs",
      "computeDIC", 
      "workingDir"
  ]);

  if (typeof formData !== 'object' || formData === null) {
    return { isValid: false, errors: ["Request body must be a valid JSON object."] };
  }

  for (const fieldLabel in formData) {
    const submittedValue = formData[fieldLabel];

    // If the current field is a known setting, skip the rest of the validation.
    if (settingsFields.has(fieldLabel)) {
      continue;
    }

    // 1. Check if the submitted field is a known, valid field from the TABS schema.
    if (!validationSchema.has(fieldLabel)) {
      errors.push(`Field '${fieldLabel}' is not a valid field.`);
      continue;
    }

    const allowedValues = validationSchema.get(fieldLabel);

    // 2. Handle the special case for "FP Input".
    if (fieldLabel === "FP Input") {
      if (typeof submittedValue !== 'string' || submittedValue.trim() === '') {
        errors.push("Field 'FP Input' must be a non-empty string.");
      }
      continue;
    }

    // 3. For all other fields, check if the submitted value is in the allowed list.
    // The '!' tells TypeScript that we are sure 'allowedValues' is not undefined here
    // because we already checked with validationSchema.has().
    if (!allowedValues!.includes(submittedValue)) {
      errors.push(`Invalid value for '${fieldLabel}'. Received '${submittedValue}', but expected one of: ${allowedValues!.join(', ')}.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}
