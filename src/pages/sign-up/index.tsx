import React, { useState } from "react";
import { Button, VStack, LargeText, TextInput, SmallText } from "../../common";
import styled from "styled-components";
import { usePost } from "../../hooks/usePost";
import { CONSTANTS } from "../../constants";

export const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doPost, isLoading } = usePost({
    url: CONSTANTS.ENDPOINT.AUTH_REGISTER,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      console.log(data);
    },
    onError: (err) => {
      alert(err);
    },
  });
  const onClick = () => {
    doPost({
      name: name,
      email: email,
      password: password,
    });
  };
  return (
    <SignUpWrapper>
      <VStack gap={24} align="center">
        <VStack gap={80} align="left">
          <LargeText bold>Create Your Account</LargeText>
          <FormWrapper>
            <VStack gap={60} align="center">
              <VStack gap={40}>
                <TextInput placeholder="Name" value={name} onChange={setName} />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                />
                <TextInput
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
              </VStack>
              <Button
                width={220}
                onClick={onClick}
                loading={isLoading}
                disabled
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
