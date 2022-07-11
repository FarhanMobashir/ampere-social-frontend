import "./App.css";
import { Button } from "./components/Buttons";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { toggleTheme } = useThemeContext();
  return (
    <>
      <Button>Hello World</Button>
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
