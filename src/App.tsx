import Game from "./components/Game";
import { GlobalStateProvider } from "./components/GlobalStateProvider";

function App() {
  return (
    <GlobalStateProvider>
      <Game />
    </GlobalStateProvider>
  );
}

export default App;
