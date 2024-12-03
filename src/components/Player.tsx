// import store from "../store/store";
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
  const [currentTrack, setCurrentTrack] = useState<any>();
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTimePlay, setCurrentTimePlay] = useState(Number);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const timerIdRef = useRef<any>(null);
  const audioRef = useRef<any>(null);

  // const site = "di";
  // const channel_id = 69;

  const getTracks = () => {
    fetch(
      `https://api.audioaddict.com/v1/${store.site}/routines/channel/${store.channel_id}?tune_in=true&audio_token=7e938c7250620a6fa561a93e733224a3&_=1718769278012`
    )
      .then((response) => response.json())
      .then((data) => setDataTrack(data.tracks))
      .catch((error) => console.error(error));
  };

  const getHistory = () => {
    fetch(`https://api.audioaddict.com/v1/${store.site}/track_history.json`)
      .then((response) => response.json())
      .then((data) => setDataHistory(data))
      .catch((error) => console.error(error));
  };

  // const getAllChannelTracks = () => {
  //   fetch(
  //     `https://raw.githubusercontent.com/Darkink69/selenium_101ru/refs/heads/main/di/db_di_full_${channel_id}.json`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setAllChannelTracks(data))
  //     .catch((error) => console.error(error));
  // };

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
    // document.title = `${currentTrack?.track}`;
    // setTimeout(() => {
    //   audioRef.current?.setJumpTime(currentTimePlay);
    // }, 1000);
  };

  // useEffect(() => {
  //   audioRef.current?.setJumpTime(currentTimePlay);
  // }, [currentTimePlay]);

  useEffect(() => {
    getTracks();
    getHistory();
    // getAllChannelTracks();
  }, [store.channel_id]);

  useEffect(() => {
    dataTrack?.map((item: any) => {
      if (currentTrackId === item.id) {
        setCurrentTrack(item);
        store.setSrcCurrentTrack("https:" + item.content.assets[0].url);
        document.title = `${currentTrack?.track}`;
        // console.log(item.id);
        console.log("https:" + item.content.assets[0].url);
      }
    });
    getAudioToken();
    // audioRef.current?.setJumpTime(300);
    // audioRef.current?.setJumpTime(currentTimePlay);
  }, [dataTrack]);

  useEffect(() => {
    // let duration: number = 1000;
    Object.values(dataHistory).map((item: any) => {
      if (item.channel_id === store.channel_id) {
        setCurrentTrackId(item.track_id);
        console.log(item.duration, "item.duration");
        // duration = item.duration;
        const timeStamp = item?.started;
        const timeLeft = Math.floor((Date.now() - timeStamp * 1000) / 1000);
        console.log(timeLeft);
        setCurrentTimePlay(timeLeft * 1000);
      }
    });

    // timerIdRef.current = setTimeout(() => {
    //   console.log(duration, "timer off!");
    //   getHistory();
    //   getTracks();
    //   document.title = `${currentTrack?.track}`;
    //   // dataTrack?.map((item: any) => {
    //   //   if (currentTrackId === item.id) {
    //   //     setCurrentTrack(item);
    //   //     document.title = `${currentTrack?.track}`;
    //   //   } else {

    //   //   }
    //   // });
    // }, duration * 1000);
    // return () => {
    //   timerIdRef.current && clearTimeout(timerIdRef.current);
    //   timerIdRef.current = null;
    //   console.log("timer clear?");
    // };
    // audioRef.current?.setJumpTime(300);
    // audioRef.current?.setJumpVolume(0.2);
    // audioRef.current?.Play();
    // console.log(audioRef);
    console.log(audioRef.current?.duration);
    document.title = `${currentTrack?.track}`;
  }, [dataHistory]);

  // useEffect(() => {
  //   // allChannelTracks?.map((item: any) => {
  //   //   console.log(item.track);
  //   // });
  //   setIsLoaded(true);
  // }, [allChannelTracks]);

  return (
    <>
      <div className="flex items-center xl:gap-8 gap-2 flex-col sm:pt-40 pt-28 text-sm sm:text-2xl text-white font-bold sm:p-5 p-6">
        {currentTrack ? (
          <div>
            <a href={currentTrack?.details_url}>
              <p className="text-black">{currentTrack?.details_url}</p>
            </a>
            <img
              className="w-[200px]"
              src={"https:" + currentTrack?.asset_url}
              alt=""
            />
            <p className="text-black">{currentTrack?.track}</p>
            <div className="w-5/6">
              <AudioPlayer
                ref={audioRef}
                autoPlay
                src={store.srcCurrentTrack}
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
                  console.log("onPlay");
                }}
                onPause={() => console.log("onPause!!")}
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
            </div>
          </div>
        ) : (
          <p>Loading..</p>
        )}
        <button
          className="w-[500px] bg-lime-500"
          onClick={() => {
            getNextTrack();
            console.log(currentTimePlay);
            // audioRef.current?.setJumpTime(currentTimePlay);
          }}
        >
          on Air
        </button>
        {/* <button
          className="w-[500px] bg-lime-500"
          onClick={() => setIsLoaded(!isLoaded)}
        >
          Все треки
        </button> */}
      </div>
      {/* <div className="grid sm:grid-cols-5 grid-cols-1 gap-4 pt-4">
        {isLoaded ? (
          allChannelTracks?.map((item: any) => {
            return <CardTrackOffline data={item} key={item.id} />;
          })
        ) : (
          <p className="font-mono text-center text-slate-600 decoration-solid">
            Загрузка...
          </p>
        )}
      </div> */}
      {/* {allChannelTracks?.map((item) => {
        <div>
          <img src={item.asset_url} alt="" />
          <p>{item.track}</p>
        </div>;
      })} */}
    </>
  );
});

export default Player;
