import { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import styled from "styled-components";
import { useAppDispatch } from "../../store/hooks";
import { Button } from "../Buttons";
import { H1 } from "../Headings";
import { TextFieldWithLabel } from "../Inputs";
import { Paragraph } from "../Paragraphs";
import { useNavigate } from "react-router-dom";
import { setMode, setToken, setUser } from "../../store/features/user-slice";
import { toast } from "react-toastify";

const LoginSignupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem 3rem;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem;
  }
`;
const TextContainer = styled.div`
  @media (max-width: 800px) {
    flex-basis: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-basis: 50%;
  @media (max-width: 800px) {
    flex-basis: 100%;
    width: 100%;
  }
`;

export const AuthForm = () => {
  const baseUrl = "http://192.168.1.21:8080";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState<"login" | "signup">("login");

  // * email state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // * password state
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // * username state
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // * login state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formMode === "login") {
      setIsLoading(true);
      const response = await fetch(baseUrl + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        toast(data.error);
      }
      if (data.token) {
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
        dispatch(setMode(data.mode));
        navigate("/home");
      }
      setIsLoading(false);
    }
    if (formMode === "signup") {
      setIsLoading(true);
      const response = await fetch(baseUrl + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        toast(data.error);
      }
      if (data.token) {
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
        dispatch(setMode(data.mode));
        navigate("/home");
      }
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailRegex)) {
      setEmailError("");
      return true;
    }
    setEmailError("Please enter a valid email");
    return false;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    setUsernameError("");
    return true;
  };

  useEffect(() => {
    if (formMode === "login") {
      setEmailError("");
      setPasswordError("");
    }
    if (formMode === "signup") {
      validateEmail(email);
      validatePassword(password);
      validateUsername(username);
    }
  }, [email, password, username]);
  return (
    <LoginSignupContainer>
      <TextContainer>
        {formMode === "login" ? (
          <>
            <H1 weight="bold" alignMobile="center" align="center">
              Login
            </H1>
            <Paragraph
              alignMobile="center"
              align="center"
              weight="bold"
              color="light"
              size="1.2rem"
            >
              Login to your account to continue
            </Paragraph>
          </>
        ) : (
          <>
            <H1 weight="bold" alignMobile="center">
              Signup
            </H1>
            <Paragraph
              alignMobile="center"
              align="center"
              weight="bold"
              color="light"
              size="1.2rem"
            >
              Create an account to continue
            </Paragraph>
          </>
        )}
      </TextContainer>
      {formMode === "signup" ? (
        <FormContainer onSubmit={handleSubmit}>
          <TextFieldWithLabel
            placeholder="Enter your name"
            type="text"
            label="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<FaUser onClick={() => console.log("clicked")} />}
            infoText={usernameError}
          />
          <TextFieldWithLabel
            placeholder="Enter your email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<FaEnvelope />}
            infoText={emailError}
          />
          <TextFieldWithLabel
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              !showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(true)} />
              ) : (
                <FaEye onClick={() => setShowPassword(false)} />
              )
            }
            infoText={passwordError}
          />

          <Button size="large" variants="primary" type="submit">
            Signup
          </Button>
          <Paragraph align="center" alignMobile="center">
            By continuing, you agree to our Terms of Service and Privacy
          </Paragraph>
          <Paragraph align="center" alignMobile="center">
            Already have an account?
          </Paragraph>
          <Button
            size="x-small"
            variants="tertiary"
            onClick={() => setFormMode("login")}
          >
            Login
          </Button>
        </FormContainer>
      ) : (
        <FormContainer onSubmit={handleSubmit}>
          <TextFieldWithLabel
            placeholder="Enter your email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<FaEnvelope />}
            infoText={emailError}
          />
          <TextFieldWithLabel
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              !showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(true)} />
              ) : (
                <FaEye onClick={() => setShowPassword(false)} />
              )
            }
            infoText={passwordError}
          />

          <Button size="large" variants="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <Paragraph align="center" alignMobile="center">
            By continuing, you agree to our Terms of Service and Privacy
          </Paragraph>
          <Paragraph align="center" alignMobile="center">
            New Here ?
          </Paragraph>
          <Button
            size="x-small"
            variants="tertiary"
            onClick={() => setFormMode("signup")}
          >
            Signup
          </Button>
        </FormContainer>
      )}
    </LoginSignupContainer>
  );
};
