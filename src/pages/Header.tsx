import styled from "styled-components";
import { colors } from "../common/styles";
import { HStack, SmallText, VStack } from "../common";
import {
  CalendarIcon,
  JobIcon,
  MapIcon,
  MetricsIcon,
  MoreVertIcon,
  SettingIcon,
} from "../common/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../common/hooks";
import { BoardDto } from "../api-interface/board";
import { CONSTANTS } from "../constants";

const menu = [
  { text: "Job", icon: JobIcon, path: "/" },
  { text: "Calendar", icon: CalendarIcon, path: "/calender" },
  { text: "Map", icon: MapIcon, path: "/map" },
  { text: "Metrics", icon: MetricsIcon, path: "/metrics" },
];
export const Header = () => {
  // TODO: Move to Board context
  const [boards, setBoards] = useState<BoardDto[] | null>();
  useFetch<BoardDto[]>({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: (data) => {
      setBoards(data);
    },
    shouldFetch: true,
  });

  const location = useLocation();
  const [showBoardMenu, setShowBoardMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowBoardMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
          <SmallText color={colors.grayText}>Board</SmallText>
          {showBoardMenu && boards && (
            <StyledHoverMenuWrapper ref={menuRef}>
              <VStack align="left">
                {boards.map((v) => (
                  <StyledMenuTextWrapper>
                    <SmallText color={colors.grayText}>{v.name}</SmallText>
                  </StyledMenuTextWrapper>
                ))}
              </VStack>
            </StyledHoverMenuWrapper>
          )}
        </StyledIconTextWrapper>

        <HStack gap={20}>
          {menu.map((v) => (
            <StyledIconTextWrapper
              align="center"
              key={v.text}
              gap={8}
              selected={location.pathname.includes(v.path)}
            >
              {v.icon({ color: colors.grayText })}
              <SmallText color={colors.grayText}>{v.text}</SmallText>
            </StyledIconTextWrapper>
          ))}
        </HStack>
        <StyledIconTextWrapper align="center" gap={5} selected={false}>
          <SettingIcon color={colors.grayText} />
          <SmallText color={colors.grayText}>Setting</SmallText>
        </StyledIconTextWrapper>
      </HStack>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  padding: 10px 16px;
  background-color: ${colors.neutralGray1};
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
