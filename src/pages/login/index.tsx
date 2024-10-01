import React from "react";
import {
  Button,
  VStack,
  LargeText,
  TextInput,
} from "../../common";
import styled from "styled-components";

export const Login: React.FC = () => {
  return (
    <SignUpWrapper>
      <VStack gap={80} align="left">
        <LargeText bold>Log In</LargeText>
        <FormWrapper>
          <VStack gap={60} align="center">
            <VStack gap={40}>
              <TextInput placeholder="Email" />
              <TextInput placeholder="Password" type="password" />
            </VStack>
            <Button width={220}>Log In</Button>
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
