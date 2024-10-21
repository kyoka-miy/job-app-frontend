import styled from "styled-components";
import { MediumText } from "./Text";
import { colors } from "../styles";

type Props = {
  children: React.ReactNode;
  onClick?: (v: any) => void;
  selected?: boolean;
  width?: number | string;
};

export const Tab = ({ children, selected = false, width, onClick }: Props) => {
  return (
    <StyledTabWrapper width={width} selected={selected} onClick={onClick}>
      <StyledMediumText bold selected={selected}>
        {children}
      </StyledMediumText>
    </StyledTabWrapper>
  );
};

const StyledTabWrapper = styled.div<{
  selected: boolean;
  width?: number | string;
}>`
  padding: 8px 16px;
  border-radius: 8px;
  width: ${({ width = "fit-content" }) =>
    typeof width === "number" ? `${width}px` : width};
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${colors.purple1}40;
  }

  ${(p) =>
    p.selected &&
    `&:after {
        position: absolute;
        display: block;
        content: '';
        width: calc(100% - 20px - 20px);
        height: 2px;
        background-color: ${colors.purple2};
        bottom: -2px;
        left: 0;
        right: 0;
        margin: auto;
    }`}
`;

const StyledMediumText = styled(MediumText)<{ selected: boolean }>`
  ${StyledTabWrapper}:hover & {
    color: ${colors.purple2};
  }
  ${(p) => p.selected && `color: ${colors.purple2};`}
`;
