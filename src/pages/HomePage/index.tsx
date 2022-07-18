import { OnboardingModal } from "../../components/OnboardingModal";
import { PinCard } from "../../components/PinCard";

export const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      {Array.from(Array(10).keys()).map((i) => (
        <PinCard variant="normal" key={i} />
      ))}
      <OnboardingModal />
    </div>
  );
};
