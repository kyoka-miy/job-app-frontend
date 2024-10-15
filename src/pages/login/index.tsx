import React, { useEffect, useState } from "react";
import { Button, VStack, LargeText, TextInput, SmallText } from "../../common";
import styled from "styled-components";
import { ValidationUtil } from "../../common/utils/validation";
import { CONSTANTS } from "../../constants";
import { colors } from "../../common/styles";
import { useFetch } from "../../common/hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAllValid, setIsAllValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (password.length > 0) setIsTouched(true);
    const isValid =
      ValidationUtil.require(email) &&
      ValidationUtil.require(password) &&
      ValidationUtil.max(password, 20) &&
      ValidationUtil.min(password, 6);

    setIsAllValid(isValid);
  }, [email, password]);

  const { doFetch, isLoading } = useFetch({
    url: CONSTANTS.ENDPOINT.AUTH_LOGIN,
    params: {
      email: email,
      password: password,
    },
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      setErrorMessage("");
      navigate(CONSTANTS.LINK.BOARDS);
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  return (
    <SignUpWrapper>
      <VStack gap={80} align="left">
        <LargeText bold>Log In</LargeText>
        <FormWrapper>
          <VStack gap={60} align="center">
            <VStack gap={24}>
              <VStack gap={40}>
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
              onClick={() => doFetch()}
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

const StyledSmallText = styled(SmallText)<{ errorMessage: string }>`
  visibility: ${(p) => (p.errorMessage.length > 0 ? "visible" : "hidden")};
  display: inline-block;
`;
