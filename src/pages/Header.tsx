import styled from "styled-components";
import { colors } from "../common/styles";
import { HoverMenu, HStack, SmallText } from "../common";
import {
  CalendarIcon,
  JobIcon,
  MapIcon,
  MetricsIcon,
  MoreVertIcon,
  SettingIcon,
} from "../common/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { useFetch, usePost } from "../common/hooks";
import { BoardDto } from "../api-interface/board";
import { CONSTANTS } from "../constants";

const menu = [
  { text: "Job", icon: JobIcon, path: CONSTANTS.LINK.JOB },
  { text: "Calendar", icon: CalendarIcon, path: CONSTANTS.LINK.CALENDAR },
  { text: "Map", icon: MapIcon, path: CONSTANTS.LINK.MAP },
  { text: "Metrics", icon: MetricsIcon, path: CONSTANTS.LINK.METRICS },
];

export const Header = () => {
  // TODO: Move to Board context
  const board = localStorage.getItem("board")
    ? JSON.parse(localStorage.getItem("board") || "{}")
    : null;
  const [boards, setBoards] = useState<BoardDto[] | null>();
  useFetch<BoardDto[]>({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: (data) => {
      setBoards(data);
    },
    shouldFetch: true,
  });

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
      // TODO: Move to Board context
      localStorage.setItem("board", JSON.stringify(board));
      navigate("/job");
    },
    [navigate]
  );
  const settings = useMemo(
    () => [
      { name: "Profile", onClick: () => navigate(CONSTANTS.LINK.PROFILE) },
      { name: "Boards", onClick: () => navigate(CONSTANTS.LINK.BOARDS) },
      { name: "Log out", onClick: () => doPost() },
    ],
    [navigate, doPost]
  );
  const onSelectSetting = useCallback((setting: (typeof settings)[number]) => {
    setting.onClick();
  }, []);

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
          <SmallText color={colors.grayText}>{board.name}</SmallText>
          {showBoardMenu && boards && (
            <HoverMenu
              data={boards}
              onClick={onSelectBoard}
              onClose={() => setShowBoardMenu(false)}
            />
          )}
        </StyledIconTextWrapper>
        <HStack gap={20}>
          {menu.map((v) => (
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
              data={settings}
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

const StyledIconTextWrapper = styled(HStack)<{ selected: boolean }>`
  position: relative;
  padding: 6px 8px;
  border-radius: 8px;
  ${(p) => p.selected && `background-color: ${colors.purple1}40`};

  &:hover {
    cursor: pointer;
    background-color: ${colors.purple1}40;
  }
`;
