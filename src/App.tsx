import "./App.css";
import {
  Button,
  ButtonWithIcon,
  IconButton,
  IconButtonWithBadge,
} from "./components/Buttons";
import { H1, H2, H3, H4, H5, H6 } from "./components/Headings";
import { Paragraph } from "./components/Paragraphs";
import { useThemeContext } from "./context/ThemeContext";
import { FaEllipsisH, FaLink } from "react-icons/fa";
import { Image } from "./components/Image";
import { PinCard } from "./components/PinCard";
import { SinglePin } from "./components/SinglePin";
import { ProfileCard } from "./components/ProfileCard";
import { BoardCard } from "./components/BoardCard";

function App() {
  const { toggleTheme } = useThemeContext();
  return (
    <>
      <Button size="large" variants="primary">
        Hello World
      </Button>
      <Button size="regular" variants="secondary">
        Hello World
      </Button>
      <Button size="small" variants="tertiary">
        Hello World
      </Button>
      <button
        onClick={() => {
          toggleTheme();
        }}
      >
        Switch Theme
      </button>
      <H1 weight="bold" align="center">
        This is Heading
      </H1>
      <H2 weight="bold" align="center">
        This is Heading
      </H2>
      <H3 weight="light" align="center">
        This is Heading
      </H3>
      <H4 weight="light" align="center">
        This is Heading
      </H4>
      <H5 weight="light" align="center">
        This is Heading
      </H5>
      <H6 weight="regular" align="center">
        This is Heading
      </H6>
      <H1 weight="bold" align="center">
        This is Heading
      </H1>
      <Paragraph align="center" weight="bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        commodi facilis doloremque nam architecto perspiciatis nobis tenetur
        ipsam, sit nemo.
      </Paragraph>
      <ButtonWithIcon variants="secondary" size="small">
        Play TV
        <FaLink />
      </ButtonWithIcon>
      <IconButton>
        <FaEllipsisH />
      </IconButton>
      <IconButtonWithBadge badge={3}>
        <FaLink />
      </IconButtonWithBadge>
      <Image
        type="circle"
        width="3rem"
        height="3rem"
        src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
      />

      <PinCard variant="normal" />
      <PinCard variant="more-ideas" />
      <SinglePin />
      <ProfileCard />
      <BoardCard />
      <PinCard variant="organise" />
    </>
  );
}

export default App;
