"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
//import Stack from "@mui/material/Stack";
//import Box from "@mui/material/Box";
//import FormData, { FormConfig } from "./FormFieldData";

interface FieldOption {
  label: string;
  value: string;
}

interface Field {
  fieldLabel: string;
  fieldName: string;
  fieldType: string;
  fieldPlaceholder?: string;
  fieldRequired?: boolean;
  fieldOptions?: FieldOption[];
}

interface FieldGroup {
  groupTitle: string;
  groupDescription?: string;
  fields: Field[];
}

interface FormConfig {
  formTitle: string;
  formDescription?: string;
  fieldGroups: FieldGroup[];
  submitButtonText?: string;
}

interface DynamicFormProps {
  formConfig: FormConfig;
  onSubmit: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formConfig, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<any>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {formConfig.formTitle}
      </Typography>
      <Typography variant="subtitle1" paragraph>
        {formConfig.formDescription}
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {formConfig.fieldGroups.map((group, groupIndex) => (
            <Grid size={12} key={groupIndex}>
              <Typography variant="h6" gutterBottom>
                {group.groupTitle}
              </Typography>
              <Typography variant="body2" paragraph>
                {group.groupDescription}
              </Typography>
              <Grid container spacing={2}>
                {group.fields.map((field, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    {field.fieldType === "text" ||
                    field.fieldType === "email" ||
                    field.fieldType === "number" ? (
                      <TextField
                        fullWidth
                        label={field.fieldLabel}
                        name={field.fieldName}
                        type={field.fieldType}
                        placeholder={field.fieldPlaceholder}
                        required={field.fieldRequired}
                        onChange={handleChange}
                      />
                    ) : field.fieldType === "select" ? (
                      <FormControl fullWidth>
                        <InputLabel>{field.fieldLabel}</InputLabel>
                        <Select
                          name={field.fieldName}
                          value={formData[field.fieldName] || ""}
                          onChange={handleChange}
                          required={field.fieldRequired}
                        >
                          {field.fieldOptions?.map((option, optIndex) => (
                            <MenuItem key={optIndex} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : field.fieldType === "checkbox" ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={field.fieldName}
                            onChange={handleChange}
                          />
                        }
                        label={field.fieldLabel}
                      />
                    ) : null}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {formConfig.submitButtonText || "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default DynamicForm;
