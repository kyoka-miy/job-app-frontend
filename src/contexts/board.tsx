import React, { createContext, useContext, useState } from "react";
import { BoardDto } from "../api-interface/board";
import { useFetch } from "../common/hooks/useFetch";
import { CONSTANTS } from "../constants";
import { useNavigate } from "react-router-dom";

interface BoardContextType {
  board: BoardDto | null;
  setBoard: (v: any) => void;
  setBoardStore: (v: any) => void;
  setBoards: (v: any[]) => void;
  boards: BoardDto[] | null;
}

type Props = {
  children: React.ReactNode;
};

export const BoardContext = createContext<BoardContextType>({
  board: null,
  setBoard: () => {},
  setBoardStore: () => {},
  setBoards: () => {},
  boards: null,
});

export const BoardContextProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDto | null>(() => {
    const storedBoard = localStorage.getItem("board");
    return storedBoard ? JSON.parse(storedBoard) : null;
  });
  const [boards, setBoards] = useState<BoardDto[] | null>(null);
  const setBoardStore = (board: BoardDto) => {
    localStorage.setItem("board", JSON.stringify(board));
  };

  useFetch<BoardDto>({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: (data) => {
      if (data.length === 1) {
        const selectedBoard = data[0];
        setBoard(selectedBoard);
        setBoardStore(selectedBoard);
        navigate(CONSTANTS.LINK.JOB);
      } else {
        setBoards(data);
      }
    },
    onError: (err) => {
      console.log(err);
      navigate(CONSTANTS.LINK.SIGN_UP);
    },
    shouldFetch: true
  });

  return (
    <BoardContext.Provider
      value={{ board, setBoard, setBoardStore, setBoards, boards }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  return useContext(BoardContext);
};
