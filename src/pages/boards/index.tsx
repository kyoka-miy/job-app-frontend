import { useState } from "react";
import { useFetch } from "../../common/hooks/useFetch";
import { CONSTANTS } from "../../constants";
import { BoardDto } from "../../api-interface/board";
import { useNavigate } from "react-router-dom";
import { Button, LargeText, SmallText, VStack } from "../../common";
import React from "react";
import styled from "styled-components";
import { colors } from "../../common/styles";

export const Boards: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isLoading } = useFetch<BoardDto[]>({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: (data) => {
      setErrorMessage("");
      if (data.length === 1) {
        sessionStorage.setItem("board", JSON.stringify(data[0]));
        navigate("/");
      }
    },
    onError: (err) => {
      setErrorMessage(err);
    },
    // fetch data only when the user is on this page
    shouldFetch: true,
  });

  return (
    <>
      {isLoading ? (
        <SmallText>loading...</SmallText>
      ) : (
        <>
          <LoginWrapper>
            <VStack gap={80} align="left">
              <LargeText bold>Select Your Board</LargeText>
              <FormWrapper>
                <VStack gap={60} align="center">
                  <VStack gap={24}>
                    <VStack gap={40}>
                      {data?.map((v, index) => (
                        <SmallText key={index}>{v.name}</SmallText>
                      ))}
                    </VStack>
                    <StyledSmallText
                      color={colors.purple3}
                      errorMessage={errorMessage}
                    >
                      {errorMessage}
                    </StyledSmallText>
                  </VStack>
                  <Button width={220}>+ Add a new board</Button>
                </VStack>
              </FormWrapper>
            </VStack>
          </LoginWrapper>
        </>
      )}
    </>
  );
};

const LoginWrapper = styled.div`
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
