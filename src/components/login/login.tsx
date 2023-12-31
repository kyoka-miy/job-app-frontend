import { Stack, Link, Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CONSTANTS } from "../../constants";
import { useNavigate } from "react-router-dom";

interface Props {
  setUserId: (userId: number) => void;
  userId: number | null;
}

interface FormData {
  mailAddress: string;
  password: string;
}

const Login: React.FC<Props> = ({ setUserId, userId }) => {
  const navigation = useNavigate();
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {}
  );
  const [mailAddress, setMailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitError, setSubmitError] = useState<any>("");

  const handleMailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMailAddress(value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (
      !mailAddress.match(
        /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      newErrors.mailAddress = "Invalid Email Address";
    }
    if (!password.match(/^[a-z\d-_]{6,}$/i)) {
      newErrors.password = "Invalid Password";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    try {
      const res = await axios.get(
        CONSTANTS.ENDPOINT.AUTHENTICATE(mailAddress, password)
      );
      setUserId(res.data);
      setSubmitError("");
      navigation(`/home/${userId}`);
    } catch (error) {
      console.error(error);
      setSubmitError("There is an incorrect input.");
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ width: 400 }} margin="auto" mt={15} textAlign="center">
          <Stack spacing={10}>
            <Typography variant="h5" gutterBottom>
              Manage your job applications
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
                  label="Mail Address"
                  placeholder="Enter your mail address"
                  value={mailAddress}
                  onChange={handleMailAddressChange}
                  error={!!validationErrors.mailAddress}
                  helperText={validationErrors.mailAddress}
                />
                <TextField
                  required
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={mailAddress.length === 0 || password.length === 0}
                >
                  Login
                </Button>
                <Link href="/sign-up">Don't have an account yet?</Link>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Login;
