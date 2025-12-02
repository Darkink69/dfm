import AllChannels from "./components/AllChannels";
import AllTracksOffline from "./components/AllTracksOffline";
import BlackBG from "./components/BlackBG";
// import DefaultChannels from "./components/DefaultChannels";
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

  // запас audio_token на нашем storage
  const getAllTokens = () => {
    fetch(
      `https://voltron-two.vercel.app/get_url?url=https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/audio/audio.json`
      // `https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/audio/audio.json`
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
        store.setMessage("Нет аудио-токенов для подключения");
      });
  };

  // Получение данных для доступа из текущего трека
  const getAcсessData = () => {
    const rndToken =
      store.allTokens[Math.floor(Math.random() * store.allTokens.length)];
    // const ts = Date.now();
    fetch(
      `https://voltron-two.vercel.app/di/get_tracks?site=${
        store.sites[store.currentSite]
      }&channel=${store.channel_id}&token=${rndToken}`
    )
      // fetch(
      //   `https://api.audioaddict.com/v1/${
      //     store.sites[store.currentSite]
      //   }/routines/channel/${
      //     store.channel_id
      //   }?tune_in=true&audio_token=${rndToken}&_=${ts}`
      // )
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
        store.setMessage("Аудио-токен не подходит. Еще попытка...");
        console.log("Audio Token problem. We this one attempt again...");
        setTimeout(() => getAllTokens(), 10000);
      });
  };

  const setAcсessData = () => {
    getAcсessData();
  };

  // собираем инфо о всех каналах в localStorage
  const getChannels = () => {
    const infoCh: any = [];
    store.sites.map((item: any) => {
      fetch(
        `https://voltron-two.vercel.app/get_url?url=https://api.audioaddict.com/v1/${item}/channels.json`
      )
        // fetch(`https://api.audioaddict.com/v1/${item}/channels.json`)
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
      store.setMessage("");
    });
  };

  // получаем все треки текущего канала с нашего storage и перемешиваем
  const getAllChannelTracks = () => {
    const premium = store.bitratePremium ? "premium_" : "";
    fetch(
      `https://voltron-two.vercel.app/get_url?url=https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/${
        store.sites[store.currentSite]
      }/db_${store.sites[store.currentSite]}_full_${
        store.channel_id
      }_${premium}light.json`
    )
      // fetch(
      //   `https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/${
      //     store.sites[store.currentSite]
      //   }/db_${store.sites[store.currentSite]}_full_${
      //     store.channel_id
      //   }_${premium}light.json`
      // )
      .then((response) => response.json())
      .then((data) => {
        {
          store.setAllChannelTracks(data.sort(() => Math.random() - 0.5));
        }
      })
      .catch((error) => {
        console.error("Не удалось получиться все треки со storage", error);
        store.setMessage("Не удалось получиться все треки");
      });
  };

  // подготавливаем имена каналов
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
    getAllChannelTracks();
    const channelNames = JSON.parse(localStorage.getItem("ch") || "0");
    if (channelNames == "0") {
      getChannels();
    } else {
      store.setAllStationsDataLoaded(true);
    }
  }, []);

  return (
    <>
      {!isLoaded ? (
        <Loader />
      ) : (
        <div>
          <WaitAnimation />
          {/* <History /> */}
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
              <History />

              {/* <DefaultChannels /> */}
              {/* <HamburgerMenu /> */}
            </div>
          </div>
          <div className="z-40 fixed bottom-0 bg-black w-full h-[80px]">
            <Player />
          </div>
        </div>
      )}
    </>
  );
});

export default App;
