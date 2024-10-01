import React from "react";
import styled from "styled-components";
import { colors } from "../styles";

type Props = {
  children: React.ReactNode;
  bold?: boolean;
  color?: string;
  className?: string;
};

type BaseProps = Props & {
  size: number;
};

export const LargeText: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledText size={34} {...props}>
      {children}
    </StyledText>
  );
};

export const MediumText: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledText size={20} {...props}>
      {children}
    </StyledText>
  );
};

export const SmallText: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledText size={16} {...props}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.span<BaseProps>`
  font-weight: ${(p) => p.bold && "bold"};
  color: ${(p) => (p.color ? p.color : colors.deepSlate)};
  font-size: ${(p) => p.size}px;
`;
