import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VStack } from "./Stack";
import { SmallText } from "./Text";
import { colors } from "../styles";

type Props = {
  placeholder?: string;
  errorMessage?: string;
  value: string;
  onChange?: (v: any) => void;
  disabled?: boolean;
  width?: number;
  type?: string;
  validate?: (v: any) => boolean;
  title?: string;
};

export const TextInput: React.FC<Props> = ({
  placeholder = "",
  disabled = false,
  type = "text",
  onChange,
  validate = () => true,
  value,
  errorMessage = "",
  title,
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    if (value.length !== 0) {
      setIsTouched(true);
    }
    if (isTouched) {
      setIsValid(validate(value));
    }
  }, [value, isTouched, validate]);

  return (
    <VStack gap={8}>
      {title && (
        <StyledTextWrapper>
          <SmallText>{title}</SmallText>
        </StyledTextWrapper>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        hasError={!!errorMessage}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        value={value}
        isValid={isValid}
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

const StyledInput = styled.input<{
  hasError: boolean;
  width?: number;
  isValid: boolean;
}>`
  width: ${(p) => (p.width ? `${p.width}px` : "100%")};
  padding: 12px 12px;
  border: none;
  border: 1px solid
    ${(props) =>
      props.hasError || !props.isValid ? colors.purple3 : colors.foggyGray};
  background-color: ${(props) =>
    props.disabled ? colors.softSilver : "transparent"};
  outline: none;
  font-size: 16px;
  color: ${(props) => (props.hasError ? colors.purple3 : colors.deepSlate)};
  transition: 0.2s ease;
  border-radius: 8px;

  &:focus {
    border-color: ${(props) =>
      props.hasError || !props.isValid ? colors.purple3 : colors.purple2};
  }

  &:hover {
    border-color: ${(props) =>
      props.hasError || !props.isValid ? colors.purple3 : colors.purple2};
  }

  ${(props) =>
    props.disabled &&
    `
    pointer-events: none;
    opacity: 0.6;
  `}
`;

export const StyledErrorWrapper = styled.div`
  padding: 0 0 0 8px;
  text-align: left;
`;

export const StyledTextWrapper = styled.div`
  text-align: left;
  padding: 0 0 4px 4px;
`;
