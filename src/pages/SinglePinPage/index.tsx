import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../../components/Loader";
import { SinglePin } from "../../components/SinglePin";
import { useGetSinglePinQuery } from "../../store/services/api-slice";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding-top: 1rem;
`;

// const PinListingContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-self: flex-start;
//   flex-wrap: wrap;
//   @media (max-width: 768px) {
//     align-self: center;
//     gap: 2rem;
//   }
// `;

export const SinglePinPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetSinglePinQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainContainer>
      {!isLoading && data && <SinglePin pin={data?.data} />}
    </MainContainer>
  );
};
