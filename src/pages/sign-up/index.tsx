import React from "react";
import {
  Button,
  VStack,
  LargeText,
  TextInput,
  SmallText,
  MediumText,
} from "../../common";
import styled from "styled-components";

export const SignUp: React.FC = () => {
  return (
    <SignUpWrapper>
      <VStack gap={24} align="center">
        <VStack gap={80} align="left">
          <LargeText bold>Create Your Account</LargeText>
          <FormWrapper>
            <VStack gap={60} align="center">
              <VStack gap={40}>
                <TextInput placeholder="Name" />
                <TextInput placeholder="Email" />
                <TextInput placeholder="Password" type="password" />
              </VStack>
              <Button width={220}>Sign Up</Button>
            </VStack>
          </FormWrapper>
        </VStack>
        <SmallText>
          Already have an account? <a href="/login">Please login from here</a>
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
