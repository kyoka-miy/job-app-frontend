import React, { useEffect, useState } from "react";
import { Button, VStack, LargeText, TextInput, SmallText } from "../../common";
import styled from "styled-components";
import { usePost } from "../../common/hooks/usePost";
import { CONSTANTS } from "../../constants";
import { ValidationUtil } from "../../common/utils/validation";
import { colors } from "../../common/styles";

export const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAllValid, setIsAllValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const { doPost, isLoading } = usePost({
    url: CONSTANTS.ENDPOINT.AUTH_REGISTER,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      setErrorMessage("");
    },
    onError: (err) => {
      setErrorMessage(err);
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
    if (password.length > 0) setIsTouched(true);
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
            <VStack gap={38} align="center">
              <VStack gap={24}>
                <VStack gap={40}>
                  <TextInput
                    placeholder="Name"
                    value={name}
                    onChange={setName}
                    validate={(v) =>
                      ValidationUtil.require(v) && errorMessage.length === 0
                    }
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChange={setEmail}
                    validate={(v) =>
                      ValidationUtil.require(v) && errorMessage.length === 0
                    }
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
                      errorMessage.length === 0
                    }
                    errorMessage={
                      isTouched &&
                      !(
                        ValidationUtil.max(password, 20) &&
                        ValidationUtil.min(password, 6)
                      )
                        ? "Password length must be between 6 and 20 characters"
                        : ""
                    }
                  />
                </VStack>
                <StyledSmallText
                  color={colors.purple3}
                  errorMessage={errorMessage}
                >
                  {errorMessage}
                </StyledSmallText>
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

const StyledSmallText = styled(SmallText)<{ errorMessage: string }>`
  visibility: ${(p) => (p.errorMessage.length > 0 ? "visible" : "hidden")};
  display: inline-block;
`;
