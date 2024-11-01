import styled from "styled-components";
import { colors } from "../styles";
import { SmallText, VStack } from "..";
import { useEffect, useRef } from "react";

type Props = {
  options: { key: any; value: string }[];
  onClick: (v: any) => void;
  onClose: () => void;
  position?: string;
  top?: number;
};
// Need to add 'position: relative' to the parent component
export const HoverMenu = ({
  options,
  onClick,
  onClose,
  top = 33,
  position = "left",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <StyledHoverMenuWrapper ref={ref} position={position} top={top}>
      <VStack align="left">
        {options.map((v: { key: any; value: string }, index: number) => (
          <StyledMenuTextWrapper onClick={() => onClick(v.key)} key={index}>
            <SmallText color={colors.grayText}>{v.value}</SmallText>
          </StyledMenuTextWrapper>
        ))}
      </VStack>
    </StyledHoverMenuWrapper>
  );
};

const StyledHoverMenuWrapper = styled.div<{ position: string; top: number }>`
  position: absolute;
  top: ${(p) => `${p.top}px`};
  ${(p) =>
    p.position === "left"
      ? "left: 0;"
      : p.position === "right"
      ? "right: 0;"
      : ""}
  border-radius: 8px;
  background-color: ${colors.neutralGray1};
  width: 195px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 1px 3px 4px rgba(50, 50, 50, 0.3);
  z-index: 100;
  opacity: 0.9;
`;

const StyledMenuTextWrapper = styled.div`
  padding: 8px 12px;
  width: 100%;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.purple1}40;
  }
`;
