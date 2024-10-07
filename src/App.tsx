import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/sign-up";
import { GlobalStyle } from "./common/styles/globalStyle";
import { Login } from "./pages/login";
import { CONSTANTS } from "./constants";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={CONSTANTS.LINK.SIGN_UP} element={<SignUp />} />
          <Route path={CONSTANTS.LINK.LOGIN} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
