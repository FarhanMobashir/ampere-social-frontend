import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { PrivateRoute } from "./components/PrivateRoute";
import { SinglePin } from "./components/SinglePin";
import { AllBoardsPage } from "./pages/AllBoardsPage";
import { Homepage } from "./pages/HomePage";
import { Landingpage } from "./pages/LandingPage";
import { MoreIdeasPage } from "./pages/MoreIdeasPage";
import { OrganiseBoardPage } from "./pages/OrganiseBoardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SingleBoardPage } from "./pages/SingleBoardPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { useAppSelector } from "./store/hooks";
import { Navigate } from "react-router-dom";
import { Create } from "./pages/Create";
import { FollowersListing } from "./pages/FollowersLisitng";
import { FollowingListing } from "./pages/FollowingListing";
import { SinglePinPage } from "./pages/SinglePinPage";
import { SearchPage } from "./pages/SearchPage";
import { SearchPageMobile } from "./components/SearchPageMobile";

function App() {
  const isAuthenticated = useAppSelector((state) => state.user.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Landingpage />}
        />
        <Route path="/home" element={<PrivateRoute element={<AppLayout />} />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/home/search" element={<SearchPage />} />
          <Route path="/home/mobile" element={<SearchPageMobile />} />
          <Route path="/home/create" element={<Create />} />
          <Route path="/home/pins/:id" element={<SinglePinPage />} />
          <Route path="/home/boards" element={<AllBoardsPage />} />
          <Route path="/home/boards/:id" element={<SingleBoardPage />} />
          <Route
            path="/home/boards/:id/organise"
            element={<OrganiseBoardPage />}
          />
          <Route path="/home/boards/:id/more" element={<MoreIdeasPage />} />
          <Route path="/home/user" element={<UserProfilePage />} />
          <Route path="/home/settings" element={<SettingsPage />} />
          <Route path="/home/followers" element={<FollowersListing />} />
          <Route path="/home/followings" element={<FollowingListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
