import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/sign-up";
import { GlobalStyle } from "./common/styles/globalStyle";
import { Login } from "./pages/login";
import { CONSTANTS } from "./constants";
import { BoardContextProvider } from "./contexts/board";
import { Boards } from "./pages/boards";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <BoardContextProvider>
        <Routes>
          <Route path={CONSTANTS.LINK.SIGN_UP} element={<SignUp />} />
          <Route path={CONSTANTS.LINK.LOGIN} element={<Login />} />
          <Route path={CONSTANTS.LINK.BOARDS} element={<Boards />} />
        </Routes>
      </BoardContextProvider>
    </BrowserRouter>
  );
};

export default App;
