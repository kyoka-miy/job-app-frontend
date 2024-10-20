import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/sign-up";
import { GlobalStyle } from "./common/styles/globalStyle";
import { Login } from "./pages/login";
import { CONSTANTS } from "./constants";
import { Boards } from "./pages/boards";
import { Home } from "./pages/home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path={CONSTANTS.LINK.SIGN_UP} element={<SignUp />} />
        <Route path={CONSTANTS.LINK.LOGIN} element={<Login />} />
        <Route path={CONSTANTS.LINK.BOARD_SELECT} element={<Boards />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// 401 unauthorized > redirect to login page
// board is null in storage > redirect to boards page
