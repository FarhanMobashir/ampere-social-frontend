import { useState } from "react";
import styled from "styled-components";
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
  @media (max-width: 800px) {
    padding: 1rem 0;
  }
`;

export const Homepage = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const onBoardingState = useAppSelector((state) => state.user.hasOnBoarded);
  const [showOnboardingModal, setShowOnboardingModal] = useState(true);
  const dispatch = useAppDispatch();

  const { data } = useGetAllPinsQuery();

  return (
    <MainContainer>
      {data?.data.map((i: any) => (
        <PinCard
          name={i.name}
          creatorName={`@${i.createdBy.username}`}
          variant="normal"
          key={i._id}
        />
      ))}
      {mode === "signup" && showOnboardingModal && !onBoardingState && (
        <Modal>
          <OnboardingModal
            onClose={() => {
              dispatch(setHasOnboarded(true));
            }}
          />
        </Modal>
      )}
    </MainContainer>
  );
};
