import React from "react";
import styled, { CSSProperties } from "styled-components";

type Props = {
  children?: React.ReactNode;
  gap?: number;
  align?: CSSProperties["alignItems"]; // center, flex-start, flex-end
  justify?: CSSProperties["justifyContent"]; // center, space-between...
  className?: string;
};

type BaseProps = Props & {
  direction?: CSSProperties["flexDirection"];
};

export const VStack: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledStack direction="column" {...props}>
      {children}
    </StyledStack>
  );
};

export const HStack: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledStack direction="row" {...props}>
      {children}
    </StyledStack>
  );
};

const StyledStack = styled.div<BaseProps>`
  display: flex;
  flex-direction: ${(p) => p.direction};
  align-items: ${(p) => p.align};
  justify-content: ${(p) => p.justify};
  gap: ${(p) => p.gap}px;
  width: 100%;
`;