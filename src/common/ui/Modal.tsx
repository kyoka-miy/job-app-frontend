import styled from "styled-components";
import { colors } from "../styles";

type ModalProps = {
  width?: number | string;
  innerWidth?: number | string;
  maxHeight?: number | string;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({
  width = "70%",
  innerWidth = 400,
  maxHeight = "80%",
  onClose = () => {},
  children,
  className,
}) => {
  return (
    <ModalWrap>
      <BackGroundVeil onClick={() => onClose()} />
      <ModalContents width={width} maxHeight={maxHeight} {...{ className }}>
        <MainWrap width={innerWidth}>{children}</MainWrap>
      </ModalContents>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: 0 !important;
  overflow: auto;
`;

const BackGroundVeil = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${colors.neutralBlack};
  opacity: 0.3;
`;

const ModalContents = styled.div<Pick<ModalProps, "width" | "maxHeight">>`
  position: relative;
  width: ${(p) => (typeof p.width === "number" ? `${p.width}px` : p.width)};
  max-height: ${(p) =>
    typeof p.maxHeight === "number" ? `${p.maxHeight}px` : p.maxHeight};
  padding: 80px 0;
  overflow: auto;
  background-color: ${colors.neutralGray1};
  border-radius: 8px;
`;

const MainWrap = styled.div<{
  width: number | string;
}>`
  width: ${(p) => (typeof p.width === "number" ? `${p.width}px` : p.width)};
  margin-right: auto !important;
  margin-left: auto !important;
`;
