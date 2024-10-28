import React from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { SignUp } from "./pages/sign-up";
import { GlobalStyle } from "./common/styles/globalStyle";
import { Login } from "./pages/login";
import { CONSTANTS } from "./constants";
import { Boards } from "./pages/boards";
import { Home } from "./pages/home";
import { BoardContextProvider } from "./contexts/board";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path={CONSTANTS.LINK.SIGN_UP} element={<SignUp />} />
        <Route path={CONSTANTS.LINK.LOGIN} element={<Login />} />
        <Route
          element={
            <BoardContextProvider>
              <Outlet />
            </BoardContextProvider>
          }
        >
          <Route path={CONSTANTS.LINK.BOARD_SELECT} element={<Boards />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
