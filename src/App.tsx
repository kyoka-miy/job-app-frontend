import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/login/sign-up";
import Home from "./components/home";

function App() {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setUserId={setUserId} userId={userId} />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/home/:userId"
          element={
            <Home />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
