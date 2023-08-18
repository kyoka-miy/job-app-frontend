import { Stack, Link, Button, TextField, Box, Typography } from "@mui/material";

const Login = () => {
  return (
    <>
      <Box>
        <Box sx={{ width: 400 }} margin="auto" mt={15} textAlign="center">
          <Stack spacing={10}>
            <Typography variant="h5" gutterBottom>
              Manage your job applications
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Mail Address"
                placeholder="Enter your mail address"
              />
              <TextField label="Password" placeholder="Enter your password" />
              <Button variant="contained" disabled>Login</Button>
              <Link href="/sign-up">Don't have an account yet?</Link>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Login;
