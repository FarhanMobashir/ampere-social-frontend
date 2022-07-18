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
import { neutral } from "../../utils";
import { CustomLink } from "../../components/CustomLink";
import { FaEnvelope, FaEye } from "react-icons/fa";

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

const LoginSignupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 2rem 3rem;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem;
  }
`;
const TextContainer = styled.div`
  flex-basis: 50%;
  @media (max-width: 800px) {
    flex-basis: 100%;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-basis: 30%;
  @media (max-width: 800px) {
    flex-basis: 100%;
  }
`;

export const Landingpage = () => {
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
            <CustomLink to="/home">Home</CustomLink>
          </NavItem>
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
        <LoginSignupContainer>
          <TextContainer>
            <H1 weight="bold" alignMobile="center">
              Login or Signup
            </H1>
            <Paragraph
              weight="bold"
              color="light"
              size="1.2rem"
              alignMobile="center"
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </Paragraph>
          </TextContainer>
          <FormContainer>
            <TextFieldWithLabel
              type="email"
              label="Email"
              icon={<FaEnvelope />}
            />
            <TextFieldWithLabel
              type="password"
              label="Password"
              icon={<FaEye onClick={() => console.log("clicked")} />}
            />
            <Button size="large" variants="primary">
              Login
            </Button>
            <Button size="large" variants="secondary">
              Signup
            </Button>
          </FormContainer>
        </LoginSignupContainer>
      </LoginSignupContainerWrapper>
    </MainContainer>
  );
};
