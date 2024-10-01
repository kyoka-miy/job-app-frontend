import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../styles";

type ButtonType = "primary";

type Props = {
  width?: number;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  type?: ButtonType;
};

export const Button = ({
  width,
  disabled = false,
  onClick,
  children,
  loading = false,
  type = "primary",
}: Props) => {
  return (
    <StyledButton
      buttonType={type}
      width={width}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? "Loading..." : children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  buttonType?: ButtonType;
  width?: number;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  transition: 0.4s ease;

  ${(props) =>
    props.buttonType === "primary" &&
    css`
      background-color: ${colors.purple1};
      color: ${colors.purple6};
      &:hover {
        background-color: ${!props.disabled && colors.purple7};
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
