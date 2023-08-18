import { Stack, Button, TextField, Box, Typography } from "@mui/material";

const SignUp = () => {
  return (
    <>
      <Box>
        <Box sx={{ width: 400 }} margin="auto" mt={15} textAlign="center">
          <Stack spacing={10}>
            <Typography variant="h5" gutterBottom>
              Please Sign Up
            </Typography>
            <Stack spacing={2}>
              <TextField label="First Name" placeholder="Charlie" />
              <TextField label="Last Name" placeholder="Puth" />
              <TextField label="Mail Address" placeholder="sample@mail.com" />
              <TextField label="Password" placeholder="password" />
              <Button variant="contained" disabled>
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
