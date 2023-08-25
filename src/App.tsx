import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/login/sign-up";

function App() {
  const [userId, setUserId] = useState<number>();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setUserId={setUserId} />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/search/:searchTerm"
          // element={
          //   <SearchFeed
          //     setSelectedCategory={setSelectedCategory}
          //   />
          // }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
