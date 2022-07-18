import { Outlet } from "react-router-dom";
import { useResponsive } from "../../context/ResposiveContext";
import { AppHeader } from "../AppHeader";

export const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
};
