import styled from "styled-components";
import { colors } from "../styles";
import { SmallText, VStack } from "..";
import { useEffect, useRef } from "react";

type Props = {
  data: any;
  onClick: (v: any) => void;
  onClose: () => void;
};

export const HoverMenu = ({ data, onClick, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledHoverMenuWrapper ref={ref}>
      <VStack align="left">
        {data.map((v: any, index: number) => (
          <StyledMenuTextWrapper onClick={() => onClick(v)} key={index}>
            <SmallText color={colors.grayText}>{v.name}</SmallText>
          </StyledMenuTextWrapper>
        ))}
      </VStack>
    </StyledHoverMenuWrapper>
  );
};

const StyledHoverMenuWrapper = styled.div`
  position: absolute;
  top: 33px;
  left: 0;
  border-radius: 8px;
  background-color: ${colors.neutralGray1};
  width: 200px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 1px 3px 4px rgba(50, 50, 50, 0.3);
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
