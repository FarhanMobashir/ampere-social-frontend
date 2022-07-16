import styled from "styled-components";
import { Image } from "../Image";
import logo from "../../assets/logo.svg";
import { Button, ButtonWithIcon, IconButton } from "../Buttons";
import {
  FaArrowDown,
  FaBell,
  FaCommentAlt,
  FaHome,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { TextField } from "../Inputs";
import { useResponsive } from "../../context/ResposiveContext";

const MainContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MobileContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
`;

const LogoContainer = styled.div`
  background: none;
`;

export const AppHeader = () => {
  const { isMobile } = useResponsive();
  if (isMobile) {
    return (
      <MobileContainer>
        <IconButton variants="tertiary" size="large">
          <FaHome />
        </IconButton>
        <IconButton variants="tertiary" size="large">
          <FaSearch />
        </IconButton>
        <IconButton variants="primary" size="large">
          <FaPlus />
        </IconButton>
        <IconButton variants="tertiary" size="large">
          <FaCommentAlt />
        </IconButton>
        <Image
          type="circle"
          width="40px"
          height="40px"
          src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
        />
      </MobileContainer>
    );
  } else {
    return (
      <MainContainer>
        <LogoContainer>
          <Image width="40px" height="40px" src={logo} />
        </LogoContainer>
        <Button variants="secondary">Home</Button>
        <ButtonWithIcon variants="tertiary">
          Create
          <FaArrowDown />
        </ButtonWithIcon>
        <TextField placeholder="Search" />
        <IconButton variants="tertiary">
          <FaBell />
        </IconButton>
        <IconButton variants="tertiary">
          <FaCommentAlt />
        </IconButton>
        <Image
          type="circle"
          width="60px"
          height="40px"
          src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
        />
      </MainContainer>
    );
  }
};
