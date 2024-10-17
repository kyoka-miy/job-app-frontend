import React, { createContext, useContext, useState } from "react";
import { BoardDto } from "../api-interface/board";
import { useFetch } from "../common/hooks/useFetch";
import { CONSTANTS } from "../constants";
import { useNavigate } from "react-router-dom";

interface BoardContextType {
  board: BoardDto | null;
  setBoard: (v: any) => void;
}

type Props = {
  children: React.ReactNode;
};

export const BoardContext = createContext<BoardContextType>({
  board: null,
  setBoard: () => {},
});

export const BoardContextProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDto | null>(() => {
    const storedBoard = sessionStorage.getItem("board");
    return storedBoard ? JSON.parse(storedBoard) : null;
  });

  if (sessionStorage.getItem("token") !== null)
    navigate(CONSTANTS.LINK.BOARD_SELECT);

  useFetch({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: (data) => {
      if (data.length === 1) {
        const selectedBoard = data[0];
        setBoard(selectedBoard);
        sessionStorage.setItem("board", JSON.stringify(selectedBoard));
        navigate("/");
      } else navigate(CONSTANTS.LINK.BOARD_SELECT);
    },
    onError: () => {
      navigate(CONSTANTS.LINK.SIGN_UP);
    },
  });

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  return useContext(BoardContext);
};
