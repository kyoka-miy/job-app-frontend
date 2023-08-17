import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Login/>
            }
          />
          <Route
            path="/category/:selectedCategory"
            // element={<CategoryDetail />}
          />
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
