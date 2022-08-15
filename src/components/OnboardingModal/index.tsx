import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { useUpdateMeMutation } from "../../store/services/api-slice";
import { Button } from "../Buttons";
import { H1, H3 } from "../Headings";
import { Image } from "../Image";
import { Paragraph } from "../Paragraphs";
import lottie from "lottie-web";
import confetti from "../../assets/confetti.json";
import food from "../../assets/food.jpg";
import travel from "../../assets/travel.jpg";
import entertainment from "../../assets/entertainment.jpg";
import sports from "../../assets/sports.jpg";
import music from "../../assets/music.jpg";
import art from "../../assets/art.jpg";
import fashion from "../../assets/fashion.jpg";
import lifestyle from "../../assets/lifestyle.jpg";
import technology from "../../assets/technology.jpg";
import science from "../../assets/science.jpg";
import health from "../../assets/health.jpg";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.bgColor};
  width: 600px;
  border-radius: 10px;
  padding: 1.6rem;
  width: 42vw;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const StepContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

interface CicrleProps {
  active: boolean;
}

const Circle = styled.div<CicrleProps>`
  width: ${({ active }) => (active ? "20px" : "10px")};
  height: ${({ active }) => (active ? "20px" : "10px")};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#000000" : "#6b6b6b")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 1rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fcd5db;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColorDark};
  font-size: 3rem;
  font-weight: bold;
`;

const AnimationContainer = styled.div`
  width: 50%;
  width: 50%;
  margin-bottom: -10rem;
`;

const CategoriesBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  height: 300px;
  overflow-y: scroll;
`;

interface CategoryBoxProps {
  isActive: boolean;
}
const CategoryBox = styled.div<CategoryBoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) => {
    if (props.isActive) {
      return `
       border:2px solid ${props.theme.primaryColor};
       padding: 0.1rem;
       border-radius: 10px;
      `;
    }
    return `
      border:none
    `;
  }}
`;

const ImageContainer = styled.div``;

const CategoryTitleContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

interface ModalProps {
  onClick?: () => void;
  setStep?: () => void;
}

interface WelcomeModalProps extends ModalProps {
  username: string;
}
const WelcomeComponent = (props: WelcomeModalProps) => {
  const container = useRef<any>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      animationData: confetti,
    });
    return () => {
      lottie.destroy(container.current);
    };
  }, []);

  return (
    <>
      <AnimationContainer ref={container}></AnimationContainer>
      <Avatar>{props.username[0].toUpperCase()}</Avatar>
      <H1 weight="bold" align="center" alignMobile="center">
        Welcome to Pinit {props.username}
      </H1>
      <Paragraph
        size="1.2rem"
        align="center"
        color="light"
        alignMobile="center"
      >
        Your answer to next few questions will help us to personalize your
        experience.
      </Paragraph>
      <Button variants="primary" size="large" onClick={props.setStep}>
        Next
      </Button>
    </>
  );
};

// const GenderComponent = (props: ModalProps) => {
//   const [updateUser] = useUpdateMeMutation();
//   return (
//     <>
//       <H1 weight="bold" align="center">
//         How do you identify yourself?
//       </H1>
//       <Paragraph size="1.2rem" align="center" color="light">
//         We will use this information to personalize your experience.
//       </Paragraph>
//       <form action="">
//         {["Female", "Male", "Others"].map((item) => (
//           <label>
//             {item}
//             <input
//               type="radio"
//               name="gender"
//               value={item.toLowerCase()}
//               onChange={(e) => {
//                 if (e.target.checked) {
//                   updateUser({
//                     gender: e.target.value,
//                   });
//                 }
//               }}
//             />
//           </label>
//         ))}
//       </form>

//       <Button variants="primary" onClick={props.setStep}>
//         Next
//       </Button>
//     </>
//   );
// };

export const CategoryData = [
  {
    name: "Food",
    image: food,
  },
  {
    name: "Travel",
    image: travel,
  },
  {
    name: "Entertainment",
    image: entertainment,
  },
  {
    name: "Sports",
    image: sports,
  },
  {
    name: "Music",
    image: music,
  },
  {
    name: "Art",
    image: art,
  },
  {
    name: "Fashion",
    image: fashion,
  },
  {
    name: "Lifestyle",
    image: lifestyle,
  },
  {
    name: "Health",
    image: health,
  },
  {
    name: "Science",
    image: science,
  },
  {
    name: "Technology",
    image: technology,
  },
];

interface SelectCategoryProps extends ModalProps {
  onClose: () => void;
}
const SelectCategory = (props: SelectCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    | {
        name: string;
        image: string;
      }[]
    | []
  >([]);
  const [updateUser, { isError }] = useUpdateMeMutation();

  return (
    <>
      <H1 weight="bold" align="center" sizeMobile="1.4rem" alignMobile="center">
        Tell us what you are interested in
      </H1>
      <CategoriesBox>
        {CategoryData.map((item) => (
          <CategoryBox
            isActive={
              selectedCategory.find(
                (category) => category.name === item.name
              ) !== undefined
            }
            onClick={() => {
              if (
                selectedCategory.find((category) => category.name === item.name)
              ) {
                setSelectedCategory(
                  selectedCategory.filter(
                    (category) => category.name !== item.name
                  )
                );
              } else {
                setSelectedCategory([...selectedCategory, item]);
              }
            }}
          >
            <ImageContainer>
              <Image
                src={item.image}
                width="100px"
                height="100px"
                widthMobile="80px"
                heightMobile="80px"
                filter={
                  selectedCategory.find(
                    (category) => category.name === item.name
                  )
                    ? "grayscale(0)"
                    : "grayscale(0)"
                }
              />
            </ImageContainer>
            <CategoryTitleContainer>
              <H3 weight="bold" sizeMobile="0.5rem" size="0.6rem">
                {item.name}
              </H3>
            </CategoryTitleContainer>
          </CategoryBox>
        ))}
      </CategoriesBox>
      <Button
        variants={selectedCategory.length >= 5 ? "primary" : "disabled"}
        onClick={() => {
          let formData = new FormData();
          formData.append(
            "interests",
            selectedCategory.map((item) => item.name).join(",")
          );
          updateUser(formData);
          if (!isError) {
            props.onClose();
          }
        }}
      >
        {selectedCategory.length >= 5
          ? "Continue"
          : "Select at least 5 categories"}
      </Button>
    </>
  );
};

interface OnBoardingModalProps {
  onClose: () => void;
}
export const OnboardingModal = (props: OnBoardingModalProps) => {
  const [step, setStep] = useState(0);
  const username = useAppSelector((state) => state.user.userData.username);
  return (
    <MainContainer>
      <StepContainer>
        {[0, 1].map((item) => (
          <Circle active={item === step} />
        ))}
      </StepContainer>
      {step === 0 && (
        <WelcomeComponent
          username={username}
          setStep={() => {
            setStep(1);
          }}
        />
      )}
      {step === 1 && <SelectCategory onClose={props.onClose} />}
    </MainContainer>
  );
};
