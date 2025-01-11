import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VStack } from "./Stack";
import { SmallText } from "./Text";
import { colors } from "../styles";

type Props = {
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (v: any) => void;
  disabled?: boolean;
  width?: number | string;
  height?: number;
  type?: string;
  validate?: (v: any) => boolean;
  title?: string;
  required?: boolean;
  className?: string;
};

export const TextInput: React.FC<Props> = ({
  placeholder = "",
  disabled = false,
  type = "text",
  onChange,
  validate = () => true,
  value = "",
  errorMessage = "",
  title,
  required = false,
  width = "100%",
  className,
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
          <SmallText>
            {title}
            {required && <StyledSpan>*</StyledSpan>}
          </SmallText>
        </StyledTextWrapper>
      )}
      {type === "textarea" ? (
        <StyledTextArea
          placeholder={placeholder}
          hasError={!!errorMessage}
          disabled={disabled}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
          value={value}
          isValid={isValid}
          width={width}
          {...props}
        />
      ) : (
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
          width={width}
          className={className}
          {...props}
        />
      )}
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
  width: number | string;
  height?: number;
  isValid: boolean;
}>`
  width: ${(p) => (typeof p.width === "number" ? `${p.width}px` : p.width)};
  height: ${(p) => (p.height ? `${p.height}px` : "fit-content")};
  padding: 12px;
  border: 1px solid
    ${(props) =>
      props.hasError || !props.isValid ? colors.purple3 : colors.foggyGray};
  background-color: ${(props) =>
    props.disabled ? colors.softSilver : "transparent"};
  outline: none;
  color: ${(props) => (props.hasError ? colors.purple3 : colors.deepSlate)};
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
  padding: 0 0 0 4px;
`;

const StyledSpan = styled.span`
  font-size: 20px;
  color: ${colors.purple3};
`;

const StyledTextArea = styled.textarea<{
  hasError: boolean;
  width: number | string;
  height?: number;
  isValid: boolean;
}>`
  width: ${(p) =>
    typeof p.width === "number" ? `${p.width}px` : p.width} !important;
  height: ${(p) => (p.height ? `${p.height}px` : "fit-content")} !important;
  outline: none;
  padding: 12px;
  border: 1px solid
    ${(props) =>
      props.hasError || !props.isValid ? colors.purple3 : colors.foggyGray};
  border-radius: 8px;
  line-height: 1.5;
  background-color: ${(props) =>
    props.disabled ? colors.softSilver : "transparent"};
  resize: none;

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
