import { useEffect, useState } from "react";
import { useFetch } from "../../common/hooks/useFetch";
import { CONSTANTS } from "../../constants";
import { BoardDto } from "../../api-interface/board";
import { useNavigate } from "react-router-dom";
import { Button, SmallText } from "../../common";
import React from "react";

export const Boards: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [boards, setBoards] = useState<BoardDto[] | null>();
  const { doFetch, isLoading } = useFetch({
    url: CONSTANTS.ENDPOINT.BOARDS,
    onSuccess: (data) => {
      setErrorMessage("");
      if (data.length === 1) {
        sessionStorage.setItem("board", JSON.stringify(data[0]));
        navigate("/");
      } else if (data.length > 1) {
        setBoards(data);
      }
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <SmallText>loading...</SmallText>
      ) : (
        <>
          {boards?.map((v, index) => (
            <SmallText key={index}>{v.name}</SmallText>
          ))}
          <Button>Add your board</Button>
        </>
      )}
    </>
  );
};
