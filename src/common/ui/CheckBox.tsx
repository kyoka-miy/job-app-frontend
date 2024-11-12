import styled from "styled-components";
import { SmallText } from "./Text";
import { colors } from "../styles";
import { CheckIcon } from "../icons";
import { HStack } from "./Stack";

type Props = {
  value: string;
  checked: boolean;
  onChange: (v: any) => void;
};

export const CheckBox: React.FC<Props> = ({
  value,
  checked = false,
  onChange,
}) => {
  return (
    <StyledLabel>
      <StyledInput
        type="checkbox"
        checked={checked}
        onChange={() => onChange(value)}
      />
      <HStack gap={8}>
        <StyledCheckBox checked={checked}>
          <StyledCheckIcon checked={checked} />
        </StyledCheckBox>
        <SmallText>{value}</SmallText>
      </HStack>
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  cursor: pointer;
  align-items: center;
  width: fit-content;
`;
const StyledInput = styled.input`
  display: none;
`;

const StyledCheckBox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? colors.purple1 : "transparent")};
  border: 1px solid ${colors.foggyGray};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${StyledLabel}:hover & {
    border-color: ${colors.purple2};
  }
`;

const StyledCheckIcon = styled(CheckIcon)<{ checked: boolean }>`
  color: ${(props) => (props.checked ? colors.white : "transparent")};
`;
