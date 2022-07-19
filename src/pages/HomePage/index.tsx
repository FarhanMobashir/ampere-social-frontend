import { useState } from "react";
import { Modal } from "../../components/Modal";
import { OnboardingModal } from "../../components/OnboardingModal";
import { PinCard } from "../../components/PinCard";
import { setHasOnboarded } from "../../store/features/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const Homepage = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const onBoardingState = useAppSelector((state) => state.user.hasOnBoarded);
  const [showOnboardingModal, setShowOnboardingModal] = useState(true);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Homepage</h1>
      {Array.from(Array(10).keys()).map((i) => (
        <PinCard variant="normal" key={i} />
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
    </div>
  );
};
