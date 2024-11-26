import AllChannels from "./components/AllChannels";
import AllTracksOffline from "./components/AllTracksOffline";
import Header from "./components/Header";
import Player from "./components/Player";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <AllChannels />
      <AllTracksOffline />
      <Player />
      {/* <div className="flex items-center text-lime-600">DI Anno!</div> */}
    </>
  );
}

export default App;
