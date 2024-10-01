import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/sign-up";
import { GlobalStyle } from "./common/styles/globalStyle";
import { Login } from "./pages/login";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
