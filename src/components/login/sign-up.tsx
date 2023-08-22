import React, { useState } from "react";
import { Stack, Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import { CONSTANTS } from "../../constants";
import { AnyCnameRecord, AnyRecord } from "dns";

interface FormData {
  firstName: string;
  lastName: string;
  mailAddress: string;
  password: string;
}

const SignUp = () => {
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {}
  );
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mailAddress: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState<any>("");
  const [successMessage, setSuccessMessage] = useState<any>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (formData.firstName.length === 0) {
      newErrors.firstName = "First Name is required";
    }
    if (formData.firstName.length > 30) {
      newErrors.firstName = "First Name should be within 30 characters";
    }
    if (formData.lastName.length === 0) {
      newErrors.lastName = "Last Name is required";
    }
    if (formData.lastName.length > 30) {
      newErrors.lastName = "Last Name should be within 30 characters";
    }
    if (
      !formData.mailAddress.match(
        /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      newErrors.mailAddress = "Invalid Email Address";
    }
    if (!formData.password.match(/^[a-z\d-_]{6,}$/i)) {
      newErrors.password = "Invalid Password";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      await axios.post(CONSTANTS.ENDPOINT.REGISTER, formData);
      setSuccessMessage(
        "We sent a confirmation link to your mail address. Please confirm by clicking the link."
      );
      setSubmitError("");
    } catch (error) {
      setSubmitError(error);
      setSuccessMessage("");
    }
  };

  return (
    <>
      {successMessage ? (
        <Box margin="auto" mt={15} textAlign="center">
          <Typography variant="h6" gutterBottom>
            {successMessage}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Box sx={{ width: 400 }} margin="auto" mt={15} textAlign="center">
            <Stack spacing={10}>
              <Typography variant="h5" gutterBottom>
                Please Sign Up
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  {submitError != null && (
                    <Typography variant="h6" color="red">
                      {submitError}
                    </Typography>
                  )}
                  <TextField
                    required
                    label="First Name"
                    placeholder="Charlie"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!validationErrors.firstName}
                    helperText={validationErrors.firstName}
                  />
                  <TextField
                    required
                    label="Last Name"
                    placeholder="Puth"
                    name="lastName"
                    onChange={handleChange}
                    error={!!validationErrors.lastName}
                    helperText={validationErrors.lastName}
                  />
                  <TextField
                    required
                    label="Mail Address"
                    placeholder="sample@mail.com"
                    name="mailAddress"
                    onChange={handleChange}
                    error={!!validationErrors.mailAddress}
                    helperText={validationErrors.mailAddress}
                  />
                  <TextField
                    required
                    label="Password"
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    error={!!validationErrors.password}
                    helperText={validationErrors.password}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      formData.firstName.length === 0 ||
                      formData.lastName.length === 0 ||
                      formData.mailAddress.length === 0 ||
                      formData.password.length === 0
                    }
                  >
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SignUp;
