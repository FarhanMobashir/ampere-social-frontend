import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MasonryGrid } from "../../components/MasonryGrid";
import { Modal } from "../../components/Modal";
import { OnboardingModal } from "../../components/OnboardingModal";
import { PinCard } from "../../components/PinCard";
import { setHasOnboarded } from "../../store/features/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetAllPinsQuery } from "../../store/services/api-slice";

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PinCardContainer = styled.div`
  break-inside: avoid-column;
  margin-bottom: 0.5rem;
`;

export const Homepage = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const onBoardingState = useAppSelector((state) => state.user.hasOnBoarded);
  const [showOnboardingModal, setShowOnboardingModal] = useState(true);
  const dispatch = useAppDispatch();

  const { data } = useGetAllPinsQuery();
  const navigate = useNavigate();

  return (
    <MasonryGrid>
      {data?.data.map((i: any) => {
        return (
          <PinCardContainer key={i._id}>
            <PinCard
              name={i.name}
              creatorName={`@${i.createdBy.username}`}
              variant="normal"
              image={i.image.url}
              onClick={() => {
                navigate(`/home/pins/${i._id}`);
              }}
            />
          </PinCardContainer>
        );
      })}
      {mode === "signup" && showOnboardingModal && !onBoardingState && (
        <Modal>
          <OnboardingModal
            onClose={() => {
              dispatch(setHasOnboarded(true));
            }}
          />
        </Modal>
      )}
    </MasonryGrid>
  );
};
