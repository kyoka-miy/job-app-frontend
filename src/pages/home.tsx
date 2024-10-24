import styled from "styled-components";
import { Header } from "./Header";
import { Route, Routes } from "react-router-dom";
import { CONSTANTS } from "../constants";
import { Job } from "./job";

export const Home = () => {
  return (
    <HomeWrapper>
      <Header />
      <ContentArea>
        <Routes>
          <Route path={CONSTANTS.LINK.JOB} element={<Job />}/>
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
  width: 1160px;
  margin: 0 auto;
  padding: 40px 20px;
`;
