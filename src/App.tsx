import "./App.css";
import { Button } from "./components/Buttons";
import { useThemeContext } from "./context/ThemeContext";

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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        commodi facilis doloremque nam architecto perspiciatis nobis tenetur
        ipsam, sit nemo.
      </p>
    </>
  );
}

export default App;
