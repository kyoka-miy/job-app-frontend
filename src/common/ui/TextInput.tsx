import React from "react";
import styled from "styled-components";
import { VStack } from "./Stack";
import { SmallText } from "./Text";
import { colors } from "../styles";

type Props = {
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange?: () => void;
  disabled?: boolean;
  width?: number;
  type?: string;
};

export const TextInput: React.FC<Props> = ({
  placeholder = "",
  errorMessage,
  disabled = false,
  type = "text",
  ...props
}) => {
  return (
    <VStack gap={8}>
      <StyledInput
        type={type}
        placeholder={placeholder}
        hasError={!!errorMessage}
        disabled={disabled}
        {...props}
      />
      {errorMessage && (
        <StyledErrorWrapper>
          <SmallText color={colors.purple3}>{errorMessage}</SmallText>
        </StyledErrorWrapper>
      )}
    </VStack>
  );
};

const StyledInput = styled.input<{ hasError: boolean; width?: number }>`
  width: ${(p) => (p.width ? `${p.width}px` : "100%")};
  padding: 8px 8px;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.hasError ? colors.purple3 : colors.foggyGray)};
  background-color: ${(props) =>
    props.disabled ? colors.softSilver : "transparent"};
  outline: none;
  font-size: 16px;
  color: ${(props) => (props.hasError ? colors.purple3 : colors.deepSlate)};
  transition: 0.3s ease;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  &:focus {
    border-bottom-color: ${(props) =>
      props.hasError ? colors.purple3 : colors.purple2};
    background-color: ${colors.softSilver};
  }

  &:hover {
    border-bottom-color: ${(props) =>
      props.hasError ? colors.purple3 : colors.purple2};
    background-color: ${colors.softSilver};
  }

  ${(props) =>
    props.disabled &&
    `
    pointer-events: none;
    opacity: 0.6;
  `}
`;

const StyledErrorWrapper = styled.div`
  padding: 0 0 0 8px;
  text-align: left;
`;
