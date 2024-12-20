import AllChannels from "./components/AllChannels";
import AllTracksOffline from "./components/AllTracksOffline";
import Header from "./components/Header";
import Player from "./components/Player";
import "./index.css";

function App() {
  return (
    <>
      <div className="bg-slate-700 container mx-auto h-full">
        <div className="container mx-auto h-full bg-slate-800">
          <Header />
          <AllChannels />
          <AllTracksOffline />
          <Player />
        </div>
      </div>
    </>
  );
}

export default App;
