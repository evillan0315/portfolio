export interface Option {
  label: string;
  value: string;
}

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
}

export interface FieldOption {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "password"
    | "date"
    | "time"
    | "datetime"
    | "select"
    | "multiselect"
    | "checkbox"
    | "radio"
    | "file"
    | "toggle"
    | "url"
    | "group"
    | "array";
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  unique?: boolean;
  default?: string | boolean;
  options?: Option[];
  description?: string;
  fields?: FieldOption[];
  fieldValidation?: ValidationRules;
}

export interface FieldGroup {
  name: string;
  label: string;
  type: "array" | "group" | "textarea" | "text";
  required: boolean;
  fields: FieldOption[];
}

export type FormConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "password"
    | "date"
    | "time"
    | "datetime"
    | "select"
    | "multiselect"
    | "checkbox"
    | "radio"
    | "file"
    | "toggle"
    | "url"
    | "array"
    | "group";
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  default?: string | boolean;
  fieldGroup?: FieldGroup[];
};

const FormData: FormConfig[] = [
  {
    name: "formTitle",
    label: "Form Title",
    type: "text",
    required: true,
    placeholder: "Enter form title",
    maxLength: 100,
  },
  {
    name: "formDescription",
    label: "Form Description",
    type: "textarea",
    required: false,
    placeholder: "Enter form description",
    maxLength: 250,
  },
  {
    name: "fieldGroups",
    label: "Field Groups",
    type: "array",
    required: false,
    fieldGroup: [
      {
        name: "groupTitle",
        label: "Group Title",
        type: "text",
        required: true,
        fields: [
          {
            name: "fieldLabel",
            label: "Field Label",
            type: "text",
            required: true,
            placeholder: "Enter field label",
            maxLength: 100,
          },
          {
            name: "fieldName",
            label: "Field Name",
            type: "text",
            required: true,
            placeholder: "Enter field name (unique identifier)",
            maxLength: 50,
            unique: true,
          },
          {
            name: "fieldType",
            label: "Field Type",
            type: "select",
            required: true,
            options: [
              { label: "Text", value: "text" },
              { label: "Textarea", value: "textarea" },
              { label: "Number", value: "number" },
              { label: "Email", value: "email" },
              { label: "Password", value: "password" },
              { label: "Date", value: "date" },
              { label: "Time", value: "time" },
              { label: "Datetime", value: "datetime" },
              { label: "Select", value: "select" },
              { label: "Multi-Select", value: "multiselect" },
              { label: "Checkbox", value: "checkbox" },
              { label: "Radio", value: "radio" },
              { label: "Group", value: "group" },
              { label: "File Upload", value: "file" },
            ],
          },
          {
            name: "fieldPlaceholder",
            label: "Placeholder",
            type: "text",
            required: false,
            placeholder: "Enter field placeholder",
          },
          {
            name: "fieldRequired",
            label: "Required",
            type: "toggle",
            required: false,
            default: false,
          },
          {
            name: "fieldOptions",
            label: "Field Options",
            type: "array",
            required: false,
            description: "Applicable for select, multi-select, radio",
            fields: [
              {
                name: "optionLabel",
                label: "Option Label",
                type: "text",
                required: true,
              },
              {
                name: "optionValue",
                label: "Option Value",
                type: "text",
                required: true,
              },
            ],
          },
          {
            name: "fieldValidation",
            label: "Validation Rules",
            type: "group",
            required: false,
            fields: [
              {
                name: "minLength",
                label: "Minimum Length",
                type: "number",
                required: false,
              },
              {
                name: "maxLength",
                label: "Maximum Length",
                type: "number",
                required: false,
              },
              {
                name: "minValue",
                label: "Minimum Value",
                type: "number",
                required: false,
              },
              {
                name: "maxValue",
                label: "Maximum Value",
                type: "number",
                required: false,
              },
              {
                name: "pattern",
                label: "Validation Pattern (Regex)",
                type: "text",
                required: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default FormData;
