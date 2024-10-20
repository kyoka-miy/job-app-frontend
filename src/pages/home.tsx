import styled from "styled-components";
import { Header } from "./Header";

export const Home = () => {
  return <HomeWrapper>
    <Header />
  </HomeWrapper>;
};

const HomeWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
`;