import styled from "styled-components";
import { Image } from "../Image";
import logo from "../../assets/logo.svg";
import { Button, ButtonWithIcon, IconButton } from "../Buttons";
import {
  FaArrowDown,
  FaBell,
  FaHome,
  FaMoon,
  FaPlus,
  FaSearch,
  FaSun,
} from "react-icons/fa";
import { TextField } from "../Inputs";
import { useResponsive } from "../../context/ResposiveContext";
import { useThemeContext } from "../../context/ThemeContext";
import { CustomLink } from "../CustomLink";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bgColor};
  padding: 1rem 0;
`;

const MobileContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.bgColor};
    padding: 0.8rem 0;
    gap: 1rem;
  }
`;

const LogoContainer = styled.div`
  background: none;
`;

export const AppHeader = () => {
  const { isMobile } = useResponsive();
  const { toggleTheme, mode } = useThemeContext();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  if (isMobile) {
    return (
      <MobileContainer>
        <CustomLink to="/home">
          <IconButton variants="tertiary" size="large">
            <FaHome />
          </IconButton>
        </CustomLink>
        <CustomLink to="/home/mobile">
          <IconButton variants="tertiary" size="large">
            <FaSearch />
          </IconButton>
        </CustomLink>
        <CustomLink to="/home/create">
          <IconButton variants="primary" size="large">
            <FaPlus />
          </IconButton>
        </CustomLink>

        <CustomLink to="/home/user">
          <Image
            type="circle"
            width="40px"
            height="40px"
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
          />
        </CustomLink>
        <IconButton
          variants="tertiary"
          onClick={() => {
            toggleTheme();
            console.log(mode);
          }}
        >
          {mode === "light" ? <FaSun /> : <FaMoon />}
        </IconButton>
      </MobileContainer>
    );
  } else {
    return (
      <MainContainer>
        <CustomLink to="/home">
          <LogoContainer>
            <Image width="40px" height="auto" src={logo} type="circle" />
          </LogoContainer>
        </CustomLink>
        <Button variants="secondary">Home</Button>
        <CustomLink to="/home/create">
          <ButtonWithIcon variants="tertiary">
            Create
            <FaArrowDown />
          </ButtonWithIcon>
        </CustomLink>

        <TextField
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              navigate("/home/search");
            }
          }}
          value={search}
        />
        <IconButton variants="tertiary">
          <FaBell />
        </IconButton>
        <CustomLink to="/home/user">
          <Image
            type="circle"
            width="50px"
            height="50px"
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
          />
        </CustomLink>

        <IconButton
          variants="tertiary"
          onClick={() => {
            toggleTheme();
          }}
        >
          {mode === "light" ? <FaSun /> : <FaMoon />}
        </IconButton>
      </MainContainer>
    );
  }
};
