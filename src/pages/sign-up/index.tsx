import React, { useEffect, useState } from "react";
import { Button, VStack, LargeText, TextInput, SmallText } from "../../common";
import styled from "styled-components";
import { usePost } from "../../common/hooks/usePost";
import { CONSTANTS } from "../../constants";
import { ValidationUtil } from "../../common/utils/validation";

export const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);
  
  const { doPost, isLoading } = usePost({
    url: CONSTANTS.ENDPOINT.AUTH_REGISTER,
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
      name: name,
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    const isValid =
      ValidationUtil.require(name) &&
      ValidationUtil.require(email) &&
      ValidationUtil.require(password) &&
      ValidationUtil.max(password, 20) &&
      ValidationUtil.min(password, 6);
    
    setIsAllValid(isValid);
  }, [name, email, password]); 

  return (
    <SignUpWrapper>
      <VStack gap={24} align="center">
        <VStack gap={80} align="left">
          <LargeText bold>Create Your Account</LargeText>
          <FormWrapper>
            <VStack gap={60} align="center">
              <VStack gap={40}>
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChange={setName}
                  validate={(v) => ValidationUtil.require(v) && !error}
                />
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
                  errorMessage={
                    !(
                      ValidationUtil.max(password, 20) &&
                      ValidationUtil.min(password, 6)
                    )
                      ? "Password length must be between 6 and 20 characters"
                      : error
                      ? "There is a mistake in the form"
                      : ""
                  }
                />
              </VStack>
              <Button
                width={220}
                onClick={onClick}
                loading={isLoading}
                disabled={!isAllValid}
              >
                Sign Up
              </Button>
            </VStack>
          </FormWrapper>
        </VStack>
        <SmallText>
          Already have an account?{" "}
          <a href={CONSTANTS.LINK.LOGIN}>Please login from here</a>
        </SmallText>
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
