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
  const audio_token = "7e938c7250620a6fa561a93e733224a3";

  const getTracks = () => {
    fetch(
      `https://api.audioaddict.com/v1/${store.site}/routines/channel/${store.channel_id}?tune_in=true&audio_token=${audio_token}&_=1718769278012`
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
        // store.setSrcCurrentTrack("https:" + item.content.assets[0].url);
        // store.setCurrentPlaying({track: "https:" + item.content.assets[0].url});
        store.setCurrentPlaying({
          track: item.track,
          url: "https:" + item.content.assets[0].url,
          asset_url: "https:" + item.asset_url,
        });

        document.title = `${currentTrack?.track}`;
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
      <div className="fixed bottom-0 bg-black z-30 h-4/6 w-full">
        {currentTrack ? (
          <div>
            <div className="p-4">
              <img
                className="w-full"
                // src={"https:" + currentTrack?.asset_url}
                src={store.currentPlaying.asset_url}
                alt=""
              />
              <p className="text-sky-400 text-base font-bold">
                {store.channel_name}
              </p>
              <p className="text-white">{store.currentPlaying.track}</p>
            </div>
            {/* <a href={currentTrack?.details_url}>
              <p className="text-black">{currentTrack?.details_url}</p>
            </a> */}
            <div className="p-2 w-full bg-slate-800">
              <AudioPlayer
                ref={audioRef}
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
    </>
  );
});

export default Player;
