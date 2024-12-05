import styled from "styled-components";
import { colors } from "../styles";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};
export const WhitePanel = ({ children, onClick, className }: Props) => {
  return (
    <PanelWrapper onClick={onClick} className={className}>
      {children}
    </PanelWrapper>
  );
};

const PanelWrapper = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0 0 8px rgba(50, 50, 50, 0.3);

  &:hover {
    cursor: pointer;
    border: 1px solid ${colors.purple1};
  }
`;
