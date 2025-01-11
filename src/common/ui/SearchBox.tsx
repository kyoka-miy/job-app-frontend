import styled from "styled-components";
import { SearchIcon } from "../icons";
import { TextInput } from "./TextInput";
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
};
export const SearchBox = ({ width, value, placeholder }: Props) => {
  return (
    <StyledWrapper>
      <StyledTextInput width={width} placeholder={placeholder} value={value} />
      <StyledSearchIcon color={colors.foggyGray} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
`;
const StyledTextInput = styled(TextInput)`
  padding-left: 30px !important;
  display: block;
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 7px;
  top: 50%;
  transform: translateY(-50%);
`;
