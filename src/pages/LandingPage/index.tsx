import { Link } from "react-router-dom";
import styled from "styled-components";
import { Image } from "../../components/Image";
import logo from "../../assets/logo.png";
import heroImage from "../../assets/hero-image.svg";
import groupImage from "../../assets/group-image.svg";

import { H1 } from "../../components/Headings";
import { Paragraph } from "../../components/Paragraphs";
import { Button } from "../../components/Buttons";
import { TextFieldWithLabel } from "../../components/Inputs";
import { CustomLink } from "../../components/CustomLink";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setToken } from "../../store/features/user-slice";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/AuthForm";

const MainContainer = styled.div``;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;
const LogoContainer = styled.div``;
const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const NavItem = styled.div``;

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 4rem 0;
  }
`;
const HeroTextContainer = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  @media (max-width: 800px) {
    align-items: center;
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoginSignupContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Landingpage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <MainContainer>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/home">
            <Image src={logo} width="50px" height="50px" />
          </Link>
        </LogoContainer>
        <NavContainer>
          <NavItem>
            <CustomLink to="/home">About</CustomLink>
          </NavItem>
        </NavContainer>
      </HeaderContainer>
      <HeroContainer>
        <HeroTextContainer>
          <H1 weight="bold">A place for minimalist</H1>
          <Paragraph
            weight="bold"
            color="light"
            size="1.2rem"
            alignMobile="center"
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </Paragraph>
          <Button size="large" variants="primary">
            Let's Explore
          </Button>
        </HeroTextContainer>
        <Image
          src={heroImage}
          width="400px"
          widthMobile="150px"
          height="auto"
        />
      </HeroContainer>
      <MiddleContainer>
        <H1 weight="bold" alignMobile="center">
          Explore the world of minimalist
        </H1>
        <Paragraph
          weight="bold"
          color="light"
          size="1.2rem"
          alignMobile="center"
        >
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </Paragraph>
        <Image src={groupImage} width="50%" height="auto" widthMobile="100%" />
      </MiddleContainer>
      <LoginSignupContainerWrapper>
        <AuthForm />
      </LoginSignupContainerWrapper>
    </MainContainer>
  );
};
