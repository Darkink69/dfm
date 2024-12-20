import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import store from "./store";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import CardTrackOffline from "./CardTrackOffline";

const Player = observer(() => {
  const [dataTrack, setDataTrack] = useState([]);
  // const [allChannelTracks, setAllChannelTracks] = useState<any>(null);
  const [dataHistory, setDataHistory] = useState([]);
  const [dataChannels, setDataChannels] = useState([]);
  const [currentTrack, setCurrentTrack] = useState<any>();
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTimePlay, setCurrentTimePlay] = useState(Number);
  const [isPlaying, setIsPlaying] = useState(true);
  // const timerIdRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const svgRef = useRef<any>(null);
  const audio_token = "7e938c7250620a6fa561a93e733224a3";
  const ts = "1718769278012";

  const getTracks = () => {
    fetch(
      `https://api.audioaddict.com/v1/${
        store.sites[store.currentSite]
      }/routines/channel/${
        store.channel_id
      }?tune_in=true&audio_token=${audio_token}&_=${ts}`
    )
      .then((response) => response.json())
      .then((data) => setDataTrack(data.tracks))
      .catch((error) => console.error(error));
  };

  const getHistory = () => {
    fetch(
      `https://api.audioaddict.com/v1/${
        store.sites[store.currentSite]
      }/track_history.json`
    )
      .then((response) => response.json())
      .then((data) => setDataHistory(data))
      .catch((error) => console.error(error));
  };

  const getChannels = () => {
    fetch(
      `https://api.audioaddict.com/v1/${
        store.sites[store.currentSite]
      }/channels.json`
    )
      .then((response) => response.json())
      .then((data) => setDataChannels(data))
      .catch((error) => console.error(error));
  };

  const getAudioToken = () => {
    // console.log(currentTrack?.content.assets[0].url.split("?")[1]);
    localStorage.setItem(
      "data",
      JSON.stringify(currentTrack?.content.assets[0].url.split("?")[1] || [])
    );
  };

  const getNextTrack = () => {
    getHistory();
    getTracks();
  };

  // useEffect(() => {
  //   audioRef.current?.setJumpTime(currentTimePlay);
  // }, [currentTimePlay]);

  useEffect(() => {
    getTracks();
    getHistory();
    getChannels();
    store.setAllTracksOfflineView(false);
    // getAllChannelTracks();
  }, [store.channel_id, store.currentSite]);

  useEffect(() => {
    dataTrack?.map((item: any) => {
      if (currentTrackId === item.id) {
        setCurrentTrack(item);
        // store.setSrcCurrentTrack("https:" + item.content.assets[0].url);
        // store.setCurrentPlaying({track: "https:" + item.content.assets[0].url});
        store.setCurrentPlaying({
          track: item.track,
          url: "https:" + item.content.assets[0].url,
          asset_url: "https:" + item.asset_url,
        });

        // document.title = `${currentTrack?.track}`;
        // console.log(item.id);
        // console.log("https:" + item.content.assets[0].url);
      }
    });
    getAudioToken();
    // audioRef.current?.setJumpTime(300);
    // audioRef.current?.setJumpTime(currentTimePlay);
  }, [dataTrack]);

  useEffect(() => {
    // trackData.sort(() => Math.random() - 0.5)
    // let duration: number = 1000;
    Object.values(dataHistory).map((item: any) => {
      if (item.channel_id === store.channel_id) {
        setCurrentTrackId(item.track_id);
        // console.log(item.duration, "item.duration");
        // duration = item.duration;
        const timeStamp = item?.started;
        const timeLeft = Math.floor((Date.now() - timeStamp * 1000) / 1000);
        console.log(timeLeft);
        setCurrentTimePlay(timeLeft * 1000);
      }
    });

    console.log(audioRef.current?.duration);
    // document.title = `${currentTrack?.track}`;
  }, [dataHistory]);

  useEffect(() => {
    // console.log(dataChannels);
    const allNames: { id: number; name: string }[] = [];
    dataChannels.map((item: any) => {
      allNames.push({ id: item.id, name: item.name });
    });
    // console.log(allNames);
    store.setAllStationsNames(allNames);
    // console.log(audioRef.current);
  }, [dataChannels]);

  // useEffect(() => {
  //   // allChannelTracks?.map((item: any) => {
  //   //   console.log(item.track);
  //   // });
  //   setIsLoaded(true);
  // }, [allChannelTracks]);

  return (
    <>
      <div
        className={
          store.bigPlayer
            ? "fixed bottom-0 z-30 p-2 w-full bg-slate-800"
            : "hidden"
        }
      >
        <AudioPlayer
          ref={audioRef}
          style={{
            background: "#1e293b",
          }}
          autoPlay
          src={store.currentPlaying.url}
          // src={store.srcCurrentTrack}
          // src={"https:" + currentTrack?.content.assets[0].url}
          volume={0.5}
          showJumpControls={false}
          showFilledProgress={false}
          customAdditionalControls={[]}
          // onLoadStart={() => console.log("onLoadStart")}
          onLoadedData={() => {
            // audioRef.current?.setJumpTime(currentTimePlay);
            console.log("onLoadedData");
          }}
          onPlay={() => {
            // audioRef.current?.setJumpTime(currentTimePlay);
            {
              setIsPlaying(true);
              document.title = `${store.currentPlaying.track}`;
            }
          }}
          onPause={() => {
            setIsPlaying(false);
            console.log("onPause!!");
          }}
          onEnded={() => {
            getNextTrack();
            console.log("END!!");
          }}
          // onSeeking={() => console.log("onSeeking")}
          // onSeeked={() => console.log("onSeeked")}
          // onPlaying={() => console.log("playing?")}
          // onWaiting={() => console.log("onWaiting!!!!!!")}
          onError={() => console.log("Что пошло не туда... )")}
          // onChangeCurrentTimeError={() => console.log("error!!!")}
          // onListen={() => console.log("onListen")}
        />
        <button
          className="relative bottom-2 w-[100px] bg-lime-500"
          onClick={() => {
            getNextTrack();
            console.log(currentTimePlay);
            // audioRef.current?.setJumpTime(currentTimePlay);
          }}
        >
          on Air
        </button>
      </div>
      {store.bigPlayer ? (
        <div className="fixed bottom-0 bg-black z-20 h-[550px] w-full">
          <div>
            <div className="p-4">
              <img
                onClick={() => store.setSizePlayer(false)}
                className="w-full"
                // src={"https:" + currentTrack?.asset_url}
                src={
                  store.currentPlaying.asset_url === "https:null"
                    ? "//cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                    : store.currentPlaying.asset_url
                }
                alt=""
              />
              <p
                onClick={() => store.setSizePlayer(false)}
                className="text-sky-400 text-base font-bold"
              >
                {store.channel_name}
              </p>
              <p className="text-white">{store.currentPlaying.track}</p>
            </div>
            {/* <a href={currentTrack?.details_url}>
              <p className="text-black">{currentTrack?.details_url}</p>
            </a> */}
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 bg-black z-20 h-[80px] w-full p-2">
          <div className="flex cursor-pointer">
            <img
              onClick={() => store.setSizePlayer(true)}
              className="h-[60px]"
              src={
                store.currentPlaying.asset_url === "https:null"
                  ? "//cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                  : store.currentPlaying.asset_url
              }
              alt=""
            />
            <div onClick={() => store.setSizePlayer(true)} className="pl-4">
              <p className="text-sky-400 text-sm font-bold">
                {store.channel_name}
              </p>
              <p className="text-white text-xs">{store.currentPlaying.track}</p>
            </div>
            {isPlaying ? (
              <div
                onClick={() => audioRef.current.audio.current.pause()}
                className="w-[120px]"
              >
                <svg
                  ref={svgRef}
                  className="fixed bottom-5 right-4"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle cx="24" cy="24" r="24" fill="#868686" />
                  <rect
                    x="16.5"
                    y="11.625"
                    width="4.725"
                    height="23.625"
                    rx="2"
                    fill="#FCFCFC"
                  />
                  <rect
                    x="27.5234"
                    y="11.625"
                    width="4.725"
                    height="23.625"
                    rx="2"
                    fill="#FCFCFC"
                  />
                </svg>
              </div>
            ) : (
              <div
                onClick={() => audioRef.current.audio.current.play()}
                className="w-[120px]"
              >
                <svg
                  ref={svgRef}
                  className="fixed bottom-5 right-4"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle cx="24" cy="24" r="24" fill="#868686" />
                  <path
                    d="M17.3613 14.2037V32.9332C17.3613 34.5496 19.1794 35.4983 20.5053 34.5737L33.4719 25.5319C34.5906 24.7518 34.6175 23.1055 33.525 22.2892L20.5584 12.6015C19.2394 11.6161 17.3613 12.5573 17.3613 14.2037Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default Player;
