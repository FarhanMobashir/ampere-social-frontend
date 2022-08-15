import styled from "styled-components";
import { H6 } from "../Headings";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  height: 100vh;
`;

const LoaderSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px dotted ${(props) => props.theme.primaryColor};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderSpinner></LoaderSpinner>
      <H6>Loading...</H6>
    </LoaderContainer>
  );
};
