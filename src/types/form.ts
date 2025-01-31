// Type for Form Model
export interface Form {
  id: string;
  name: string;
  typeId?: string | null;
  description?: string | null;
  status?: string | null;
  type?: Type | null;
  formSections: FormSection[];
  fields: Field[];
}

// Type for FormSection Model
export interface FormSection {
  id: string;
  name: string;
  fields: Field[];
  form?: Form | null;
  formId?: string | null;
}

// Type for Field Model
export interface Field {
  id: string;
  name: string;
  label: string;
  type: string;
  options?: string[];
  required?: boolean | null;
  form?: Form | null;
  value?: string | boolean; // Make value optional here
  formId?: string | null;
  formSection?: FormSection | null;
  formSectionId?: string | null;
}

// Type for Type Model (assuming the Type model exists in your schema)
export interface Type {
  id: string;
  name: string;
  description?: string | null;
}

export interface DynamicFormResponse {
  sections: {
    name: string;
    fields: Field[];
  }[];
}
