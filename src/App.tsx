import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/react";
import AllChannels from "./components/AllChannels";
import AllTracksOffline from "./components/AllTracksOffline";
import BlackBG from "./components/BlackBG";
import DefaultChannels from "./components/DefaultChannels";
import FavoriteChannels from "./components/FavoriteChannels";
import Header from "./components/Header";
import Player from "./components/Player";
import "./index.css";
import WaitAnimation from "./components/Waiting";
import SearchTracks from "./components/SearchChannels";
import Menu from "./components/Humburger";
import Error from "./components/Error";
import AllStarTracks from "./components/AllStarTracks";
import History from "./components/History";
import { observer } from "mobx-react-lite";
import store from "./components/store";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

const App = observer(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataChannels, setDataChannels] = useState<any>({});

  const getAllTokens = () => {
    fetch(
      `https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/audio/audio.json`
    )
      .then((response) => response.json())
      .then((data) => {
        store.setAllTokens(data);
        setAcсessData();
      })
      .catch((error) => {
        setAcсessData();
        console.error(error);
        console.log("Audio_token storage problem");
      });
  };

  // Получение данных для доступа из текущего трека
  const getAcсessData = () => {
    const rndToken =
      store.allTokens[Math.floor(Math.random() * store.allTokens.length)];
    const ts = Date.now();
    fetch(
      `https://api.audioaddict.com/v1/${
        store.sites[store.currentSite]
      }/routines/channel/${
        store.channel_id
      }?tune_in=true&audio_token=${rndToken}&_=${ts}`
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(
          "data",
          JSON.stringify(data?.tracks[0].content.assets[0].url.split("?")[1])
        );
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        console.log("Audio Token problem. We this one attempt again...");
        getAllTokens();
      });
  };

  const setAcсessData = () => {
    getAcсessData();
  };

  // собираем инфо о всех каналах в localStorage
  const getChannels = () => {
    const infoCh: any = [];
    store.sites.map((item: any) => {
      fetch(`https://api.audioaddict.com/v1/${item}/channels.json`)
        .then((response) => response.json())
        .then((data) => {
          Object.values(data).map((i: any) => {
            let ch = {
              id: i.id,
              network_id: i.network_id,
              name: i.name,
              description_short: i.description_short,
            };
            infoCh.push(ch);
            setDataChannels((prev: any) => ({ ...prev, infoCh }));
          });
        })
        .catch((error) => console.error(error));
    });
  };

  useEffect(() => {
    if (Object.keys(dataChannels).length !== 0) {
      console.log(dataChannels.length);
      localStorage.setItem("ch", JSON.stringify(dataChannels.infoCh));
      store.setAllStationsDataLoaded(true);
    }

    const allNames: { id: number; name: string }[] = [];
    dataChannels.data?.map((item: any) => {
      allNames.push({ id: item.id, name: item.name });
    });

    store.setAllStationsNames(allNames);
    store.setAllStationsDataLoaded(true);
  }, [dataChannels]);

  useEffect(() => {
    getAllTokens();
    const channelNames = JSON.parse(localStorage.getItem("ch") || "0");
    if (channelNames == "0") {
      getChannels();
    } else {
      store.setAllStationsDataLoaded(true);
    }
  }, []);

  return (
    <>
      <Analytics />
      {/* <SpeedInsights /> */}

      {!isLoaded ? (
        <Loader />
      ) : (
        <div>
          <WaitAnimation />
          <History />
          <div className="fixed -z-50 w-full h-full bg-slate-700"></div>
          <div className="fixed bg-black z-50 h-[60px] w-full shadow-md">
            <Header />
          </div>
          <Error />
          <BlackBG />
          <Menu />
          <div className="bg-slate-700 container mx-auto h-full">
            <div className="h-full bg-slate-800 ">
              <SearchTracks />
              <FavoriteChannels />
              <AllChannels />
              <AllTracksOffline />
              <AllStarTracks />
              <DefaultChannels />
              {/* <HamburgerMenu /> */}
            </div>
          </div>
          <div className="">
            <Player />
          </div>
        </div>
      )}
    </>
  );
});

export default App;
