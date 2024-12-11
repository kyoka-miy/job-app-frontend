import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../styles";
import { PlusIcon } from "../icons";
import { SmallText } from "./Text";
import { HStack } from "..";

type ButtonType = "primary" | "secondary" | "third";

type Props = {
  width?: number | string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  type?: ButtonType;
  bold?: boolean;
  plusIcon?: boolean;
};

export const Button = ({
  width = "auto",
  disabled = false,
  onClick,
  children,
  loading = false,
  type = "primary",
  bold = false,
  plusIcon = false,
}: Props) => {
  return (
    <StyledButton
      buttonType={type}
      width={width}
      disabled={disabled}
      onClick={onClick}
      bold={bold}
    >
      <HStack gap={4} align="center">
        {plusIcon && <StyledPlusIcon disabled={disabled} />}
        {loading ? <SmallText color={colors.white}>Loading...</SmallText> : children}
      </HStack>
    </StyledButton>
  );
};

const StyledPlusIcon = styled(PlusIcon)<{ disabled?: boolean }>`
  color: ${(p) => (p.disabled ? colors.mutedGraphite : colors.white)};
`;
const StyledButton = styled.button<{
  buttonType?: ButtonType;
  width?: number | string;
  disabled?: boolean;
  bold: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  width: ${(p) => (typeof p.width === "number" ? `${p.width}px` : p.width)};
  ${(p) =>
    p.bold &&
    `
    font-weight: 600;
  `}

  ${(props) =>
    props.buttonType === "primary" &&
    css`
      background-color: ${colors.purple1};
      color: ${colors.white};

      &:hover {
        background-color: ${!props.disabled && colors.purple7};
      }
      &:active {
        background-color: ${!props.disabled &&
        colors.purple2}; /* Change color on click */
      }
    `}

    ${(props) =>
    props.buttonType === "secondary" &&
    css`
      background-color: ${colors.white};
      color: ${colors.purple1};
      border: 1px solid ${colors.purple1};

      &:hover {
        background-color: ${!props.disabled && colors.purple6};
      }
      &:active {
        background-color: ${!props.disabled && colors.purple5};
      }
    `}

      ${(props) =>
    props.buttonType === "third" &&
    css`
      background-color: ${colors.neutralGray1};
      color: ${colors.grayText};
      border: 1px solid ${colors.grayText};

      &:hover {
        background-color: ${!props.disabled && colors.softSilver};
      }
      &:active {
        background-color: ${!props.disabled && colors.foggyGray};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colors.foggyGray};
      color: ${colors.mutedGraphite};
      cursor: not-allowed;
    `}
`;
