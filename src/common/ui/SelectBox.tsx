import styled from "styled-components";
import { SmallText, StyledErrorWrapper, StyledTextWrapper } from "..";
import { VStack } from "./Stack";
import { colors } from "../styles";
import { ArrowIcon } from "../icons";
import { useEffect, useRef, useState } from "react";

type Props = {
  options: { name: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  errorMessage?: string;
  title?: string;
};
export const SelectBox: React.FC<Props> = ({
  options,
  value,
  onChange,
  errorMessage,
  title,
}) => {
  const [optionIsOpen, setOptionIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOptionIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <VStack gap={8}>
      {title && (
        <StyledTextWrapper>
          <SmallText>{title}</SmallText>
        </StyledTextWrapper>
      )}
      <SelectWrapper ref={wrapperRef}>
        <StyledSelect
          value={value}
          onClick={() => setOptionIsOpen((prev) => !prev)}
        />
        <StyledArrowIcon onClick={() => setOptionIsOpen((prev) => !prev)} />
        {optionIsOpen && (
          <OptionWrapper>
            {options.map((option) => (
              <OptionItem
                key={option.name}
                onClick={() => {
                  onChange(option.value);
                  setOptionIsOpen(false);
                }}
              >
                <StyledSmallText color={colors.white}>
                  {option.value}
                </StyledSmallText>
              </OptionItem>
            ))}
          </OptionWrapper>
        )}
      </SelectWrapper>
      {errorMessage && (
        <StyledErrorWrapper>
          <SmallText color={colors.purple3}>{errorMessage}</SmallText>
        </StyledErrorWrapper>
      )}
    </VStack>
  );
};

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.input<{ errorMessage?: string }>`
  width: 100%;
  padding: 12px 12px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.errorMessage ? colors.purple3 : colors.foggyGray)};
  background-color: transparent;
  appearance: none;

  &:focus {
    border-color: ${(props) =>
      props.errorMessage ? colors.purple3 : colors.purple2};
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledArrowIcon = styled(ArrowIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(90deg);
  &:hover {
    cursor: pointer;
  }
`;

const OptionWrapper = styled.div`
  overflow-y: auto;
  box-shadow: 1px 3px 4px rgba(50, 50, 50, 0.3);
  border-radius: 8px;
  position: absolute;
  width: 100%;
  max-height: 300px;
`;

const OptionItem = styled.div`
  padding: 8px 12px;
  background-color: #5a5a5a;
  &:hover {
    cursor: pointer;
  }
`;

const StyledSmallText = styled(SmallText)`
  ${OptionItem}:hover & {
    color: ${colors.purple1};
  }
`;
