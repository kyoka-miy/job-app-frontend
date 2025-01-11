import styled from "styled-components";
import { Header } from "./Header";
import { Route, Routes } from "react-router-dom";
import { CONSTANTS } from "../constants";
import { Job } from "./job";
import { Profile } from "./profile";
import { Boards } from "./boards";

export const Home = () => {
  return (
    <HomeWrapper>
      <Header />
      <ContentArea>
        <Routes>
          <Route path={CONSTANTS.LINK.JOB} element={<Job />} />
          <Route path={CONSTANTS.LINK.PROFILE} element={<Profile />} />
          <Route path={CONSTANTS.LINK.BOARDS} element={<Boards />} />
        </Routes>
      </ContentArea>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const ContentArea = styled.div`
  box-sizing: content-box;
  width: 85%;
  margin: 0 auto;
  padding: 40px 0px;
`;
