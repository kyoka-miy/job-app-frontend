import styled from "styled-components";
import { colors } from "../common/styles";
import { HoverMenu, HStack, SmallText } from "../common";
import { MoreVertIcon, SettingIcon } from "../common/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { usePost } from "../common/hooks";
import { BoardDto } from "../api-interface/board";
import { CONSTANTS, HeaderMenu, settings } from "../constants";
import { useBoardContext } from "../contexts/board";

export const Header = () => {
  const { board, setBoard, setBoardStore, boards } = useBoardContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [showBoardMenu, setShowBoardMenu] = useState<boolean>(false);
  const [showSettingMenu, setShowSettingMenu] = useState<boolean>(false);

  const { doPost } = usePost({
    url: CONSTANTS.ENDPOINT.LOGOUT,
    onSuccess: () => {
      localStorage.removeItem("board");
      sessionStorage.removeItem("token");
      navigate("/login");
    },
  });
  const onSelectBoard = useCallback(
    (board: BoardDto) => {
      setBoardStore(board);
      setBoard(board);
      window.location.reload();
    },
    [setBoardStore, setBoard]
  );

  const onSelectSetting = useCallback(
    (key: string) => {
      if (key === "Profile") navigate(CONSTANTS.LINK.PROFILE);
      else if (key === "Boards") navigate(CONSTANTS.LINK.BOARDS);
      else doPost();
    },
    [navigate, doPost]
  );
  const boardOptions = useMemo(
    () =>
      boards?.map((board) => ({
        key: board,
        value: board.name,
      })) || [],
    [boards]
  );
  return (
    <HeaderWrapper>
      <HStack justify="space-between" align="center" width="100%">
        <StyledIconTextWrapper
          align="center"
          gap={5}
          selected={showBoardMenu}
          onClick={() => setShowBoardMenu(true)}
        >
          <MoreVertIcon color={colors.grayText} />
          <SmallText color={colors.grayText}>{board?.name}</SmallText>
          {showBoardMenu && boards && (
            <HoverMenu
              options={boardOptions}
              onClick={onSelectBoard}
              onClose={() => setShowBoardMenu(false)}
            />
          )}
        </StyledIconTextWrapper>
        <HStack gap={20}>
          {HeaderMenu.map((v) => (
            <StyledIconTextWrapper
              align="center"
              key={v.text}
              gap={8}
              selected={location.pathname.includes(v.path)}
              onClick={() => navigate(v.path)}
            >
              {v.icon({ color: colors.grayText })}
              <SmallText color={colors.grayText}>{v.text}</SmallText>
            </StyledIconTextWrapper>
          ))}
        </HStack>
        <StyledIconTextWrapper
          align="center"
          gap={5}
          selected={showSettingMenu}
          onClick={() => setShowSettingMenu(true)}
        >
          <SettingIcon color={colors.grayText} />
          <SmallText color={colors.grayText}>Setting</SmallText>
          {showSettingMenu && (
            <HoverMenu
              options={settings}
              onClick={onSelectSetting}
              onClose={() => setShowSettingMenu(false)}
              position="right"
            />
          )}
        </StyledIconTextWrapper>
      </HStack>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  padding: 10px 16px;
  background-color: ${colors.white};
  box-shadow: 1px 3px 4px rgba(50, 50, 50, 0.3);
`;

export const StyledIconTextWrapper = styled(HStack)<{ selected: boolean }>`
  position: relative;
  padding: 6px 8px;
  border-radius: 8px;
  ${(p) => p.selected && `background-color: ${colors.purple1}40`};

  &:hover {
    cursor: pointer;
    background-color: ${colors.purple1}40;
  }
`;
