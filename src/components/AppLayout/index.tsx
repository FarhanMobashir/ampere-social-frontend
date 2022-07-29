import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useResponsive } from "../../context/ResposiveContext";
import { AppHeader } from "../AppHeader";

const Main = styled.main`
  @media (max-width: 768px) {
    padding-bottom: 6rem;
  }
`;

export const AppLayout = () => {
  return (
    <Main>
      <AppHeader />
      <Outlet />
    </Main>
  );
};
