import AllChannels from "./components/AllChannels";
import AllTracksOffline from "./components/AllTracksOffline";
import BlackBG from "./components/BlackBG";
import DefaultChannels from "./components/DefaultChannels";
import FavoriteChannels from "./components/FavoriteChannels";
import Header from "./components/Header";
import Player from "./components/Player";
import "./index.css";
import WaitAnimation from "./components/Waiting";

function App() {
  return (
    <>
      <WaitAnimation />
      <div className="fixed -z-50 w-full h-full bg-slate-700"></div>
      <div className="fixed bg-black z-50 h-[60px] w-full shadow-md">
        <Header />
      </div>
      <BlackBG />
      <div className="bg-slate-700 container mx-auto h-full">
        <div className="h-full bg-slate-800 ">
          <FavoriteChannels />
          <AllChannels />
          <AllTracksOffline />
          <DefaultChannels />
        </div>
      </div>
      <div className="">
        <Player />
      </div>
    </>
  );
}

export default App;
