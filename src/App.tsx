import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { SinglePin } from "./components/SinglePin";
import { AllBoardsPage } from "./pages/AllBoardsPage";
import { Homepage } from "./pages/HomePage";
import { Landingpage } from "./pages/LandingPage";
import { MoreIdeasPage } from "./pages/MoreIdeasPage";
import { OrganiseBoardPage } from "./pages/OrganiseBoardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SingleBoardPage } from "./pages/SingleBoardPage";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<AppLayout />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/home/pins/:id" element={<SinglePin />} />
          <Route path="/home/boards" element={<AllBoardsPage />} />
          <Route path="/home/boards/:id" element={<SingleBoardPage />} />
          <Route
            path="/home/boards/:id/organise"
            element={<OrganiseBoardPage />}
          />
          <Route path="/home/boards/:id/more" element={<MoreIdeasPage />} />
          <Route path="/home/user" element={<UserProfilePage />} />
          <Route path="/home/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
