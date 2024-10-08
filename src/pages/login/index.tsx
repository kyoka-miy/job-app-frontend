import React, { useEffect, useState } from "react";
import { Button, VStack, LargeText, TextInput } from "../../common";
import styled from "styled-components";
import { ValidationUtil } from "../../common/utils/validation";
import { usePost } from "../../common/hooks/usePost";
import { CONSTANTS } from "../../constants";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);

  useEffect(() => {
    const isValid =
      ValidationUtil.require(email) &&
      ValidationUtil.require(password) &&
      ValidationUtil.max(password, 20) &&
      ValidationUtil.min(password, 6);

    setIsAllValid(isValid);
  }, [email, password]);
// TODO: GET
  const { doPost, isLoading } = usePost({
    url: CONSTANTS.ENDPOINT.AUTH_LOGIN,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      setError(false);
    },
    onError: (err) => {
      alert(err);
      setError(true);
    },
  });
  const onClick = () => {
    doPost({
      email: email,
      password: password,
    });
  };

  return (
    <SignUpWrapper>
      <VStack gap={80} align="left">
        <LargeText bold>Log In</LargeText>
        <FormWrapper>
          <VStack gap={60} align="center">
            <VStack gap={40}>
              <TextInput
                placeholder="Email"
                value={email}
                onChange={setEmail}
                validate={(v) => ValidationUtil.require(v) && !error}
              />
              <TextInput
                placeholder="Password"
                type="password"
                value={password}
                onChange={setPassword}
                validate={(v) =>
                  ValidationUtil.require(v) &&
                  ValidationUtil.max(v, 20) &&
                  ValidationUtil.min(v, 6) &&
                  !error
                }
              />
            </VStack>
            <Button
              width={220}
              onClick={onClick}
              loading={isLoading}
              disabled={!isAllValid}
            >
              Log In
            </Button>
          </VStack>
        </FormWrapper>
      </VStack>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
  width: 35%;
  margin: auto;
  margin-top: 130px;
`;

const FormWrapper = styled.div`
  padding: 0 8px;
`;
