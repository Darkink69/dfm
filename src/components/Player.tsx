import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import store from "./store";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import OnAir from "./OnAir";
import OffAir from "./offAir";

const Player = observer(() => {
  const [dataTrack, setDataTrack] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [dataChannels, setDataChannels] = useState([]);
  const [allStationIds, setAllStationIds] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>();
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTimePlay, setCurrentTimePlay] = useState(Number);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<any>(null);
  const svgRef = useRef<any>(null);
  const audio_tokens = [
    "7e938c7250620a6fa561a93e733224a3",
    "958b3ee79e1b5cac40b80a71a1bf463b",
    "5b811a1b5306570f946a07351839e47b",
  ];
  const audio_token =
    audio_tokens[Math.floor(Math.random() * audio_tokens.length)];
  const ts = Date.now();

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
      .catch((error) => {
        console.error(error);
        console.log("Audio_token problem");
      });
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
    localStorage.setItem(
      "data",
      JSON.stringify(currentTrack?.content.assets[0].url.split("?")[1] || [])
    );
  };

  const getNextTrack = () => {
    getHistory();
    getTracks();
  };

  const setSpecialNextChannel = () => {
    store.setSpinView("");
    console.log(store.favoriteChannels.channels_id);
    let nextChannel = store.channel_id;

    // console.log(store.allStationIds.includes(nextChannel), typeof nextChannel);
    // console.log(store.otherSite, "эта другая станция?");
    for (
      let i = 0, len = store.favoriteChannels.channels_id.length;
      i < len;
      i++
    ) {
      if (
        store.favoriteChannels.channels_id[i] === store.channel_id &&
        allStationIds.includes(nextChannel)
      ) {
        console.log(store.channel_id);
        if (i >= len - 1) {
          nextChannel = store.favoriteChannels.channels_id[0];
        } else {
          nextChannel = store.favoriteChannels.channels_id[i + 1];
        }
        break;
      }
      // nextChannel = store.favoriteChannels.channels_id[0];
    }

    // const nextChannel =
    //   store.favoriteChannels.channels_id[
    //     Math.floor(Math.random() * store.favoriteChannels.channels_id.length)
    //   ];
    // console.log(nextChannel);

    store.setChannel_id(nextChannel);

    // console.log(Object.values(store.allStationsNames));
    store.allStationsNames.map((item: any) => {
      if (nextChannel === item.id) {
        store.setChannel_name(item.name);
      }
    });

    // store.setSizePlayer(true);
  };

  const downloadTrack = () => {
    try {
      fetch(`${store.currentPlaying.url}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${store.currentPlaying.track}.mp4`;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.error(error);
    }
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
        store.setCurrentPlaying({
          track: item.track,
          url: "https:" + item.content.assets[0].url,
          asset_url: "https:" + item.asset_url,
        });
      }
    });
    getAudioToken();
    // audioRef.current?.setJumpTime(300);
    // audioRef.current?.setJumpTime(currentTimePlay);
  }, [dataTrack]);

  useEffect(() => {
    Object.values(dataHistory).map((item: any) => {
      if (item.channel_id === store.channel_id) {
        setCurrentTrackId(item.track_id);
        const timeStamp = item?.started;
        const timeLeft = Math.floor((Date.now() - timeStamp * 1000) / 1000);
        // console.log(timeLeft);
        setCurrentTimePlay(timeLeft * 1000);
      }
    });

    // console.log(audioRef.current?.duration);
    audioRef.current?.setJumpTime(currentTimePlay);
  }, [dataHistory]);

  useEffect(() => {
    const allNames: { id: number; name: string }[] = [];
    const allIds: { id: number }[] = [];
    dataChannels.map((item: any) => {
      allNames.push({ id: item.id, name: item.name });
      allIds.push(item.id);
      // console.log(typeof item.id);
    });
    // console.log(typeof allIds, allIds);
    store.setAllStationsNames(allNames);
    setAllStationIds(allIds);
    store.setAllStationIds(allIds);
  }, [dataChannels]);

  useEffect(() => {
    const os = navigator.userAgent;
    // if (os.includes("Android")) {
    //   console.log("Android");
    // }
    if (os.includes("iPhone") || os.includes("iPad")) {
      // console.log(audioRef.current);
      // console.log(audioRef.current.props);
    }
  }, []);

  return (
    <>
      <div
        className={
          store.bigPlayer
            ? "fixed bottom-0 z-30 p-2 w-full bg-slate-800"
            : "hidden"
        }
      >
        {isPlaying ? (
          <div
            onClick={() => audioRef.current.audio.current.pause()}
            className="w-[120px] cursor-pointer"
          >
            <svg
              ref={svgRef}
              className="fixed bottom-3 m-auto inset-x-0"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle cx="32" cy="32" r="32" fill="#868686" />
              <rect
                x="22"
                y="15.5"
                width="6.3"
                height="31.5"
                rx="2"
                fill="#FCFCFC"
              />
              <rect
                x="36.6973"
                y="15.5"
                width="6.3"
                height="31.5"
                rx="2"
                fill="#FCFCFC"
              />
            </svg>
          </div>
        ) : (
          <div
            onClick={() => audioRef.current.audio.current.play()}
            className="w-[120px] cursor-pointer"
          >
            <svg
              ref={svgRef}
              className="fixed bottom-3 m-auto inset-x-0"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle cx="32" cy="32" r="32" fill="#868686" />
              <path
                d="M23.125 17.6158V45.1964C23.125 46.8128 24.9431 47.7615 26.269 46.8369L45.3632 33.5222C46.4819 32.7421 46.5089 31.0957 45.4163 30.2794L26.3221 16.0136C25.0031 15.0282 23.125 15.9694 23.125 17.6158Z"
                fill="white"
              />
            </svg>
          </div>
        )}

        <div className="container mx-auto">
          <AudioPlayer
            ref={audioRef}
            style={{
              background: "#1e293b",
            }}
            autoPlay
            src={store.currentPlaying.url}
            // src={store.srcCurrentTrack}
            // src={"https:" + currentTrack?.content.assets[0].url}
            volume={
              navigator.userAgent.includes("iPhone") ||
              navigator.userAgent.includes("iPad") ||
              navigator.userAgent.includes("Android")
                ? 1
                : 0.5
            }
            customVolumeControls={
              navigator.userAgent.includes("iPhone") ||
              navigator.userAgent.includes("iPad") ||
              navigator.userAgent.includes("Android")
                ? []
                : [RHAP_UI.VOLUME]
            }
            // customVolumeControls={[RHAP_UI.VOLUME]}
            showFilledVolume={false}
            showJumpControls={false}
            customAdditionalControls={[]}
            // onLoadStart={() => store.setSpinView("")}
            onLoadedData={() => {
              // audioRef.current?.setJumpTime(currentTimePlay);
              console.log("onLoadedData");
            }}
            onPlay={() => {
              // audioRef.current?.setJumpTime(currentTimePlay);
              {
                setIsPlaying(true);
                document.title = `${store.currentPlaying.track}`;
                // store.setAllFavChannelsView(true);
              }
            }}
            onPause={() => {
              setIsPlaying(false);
              console.log("onPause!!");
              store.setOnAir(false);
            }}
            onEnded={() => {
              store.setSpinView("");
              getNextTrack();
              // store.setAllFavChannelsView(false);
              console.log("END!!");
            }}
            // onSeeking={() => console.log("onSeeking")}
            // onSeeked={() => store.setOnAir(false)}
            // onPlaying={() => console.log("playing?")}
            // onWaiting={() => {
            //   store.setSpinView("");
            //   console.log("onWaiting!!!!!!");
            // }}
            onError={() => console.log("Что пошло не туда...")}
            // onChangeCurrentTimeError={() => console.log("error!!!")}
            // onListen={() => console.log("onListen")}
          />
        </div>

        {store.onAir ? (
          <div
            className="relative bottom-6 left-12 w-[70px]"
            onClick={() => {
              // getNextTrack();

              // audioRef.current.audio.current.play();
              // store.setOnAir(false);
              console.log(store.onAir, "butt 1");
            }}
          >
            <OnAir />
          </div>
        ) : (
          <div
            className="relative bottom-6 left-12 w-[70px]"
            onClick={() => {
              console.log(currentTimePlay);
              // getNextTrack();
              audioRef.current?.setJumpTime(currentTimePlay);
              audioRef.current.audio.current.play();
              store.setOnAir(true);
              console.log(store.onAir, "butt 2");
            }}
          >
            <OffAir />
          </div>
        )}

        <div
          className="fixed bottom-8 right-12 w-[50px]"
          onClick={() => {
            setSpecialNextChannel();
            // audioRef.current.audio.current.play();
            // store.setOnAir(false);
          }}
        >
          <svg width="19" height="24" viewBox="0 0 19 24" fill="none">
            <path
              d="M0 4.01911V20.1411C0 21.7626 1.82816 22.7101 3.15303 21.7753L14.1839 13.9923C15.2906 13.2114 15.3174 11.5795 14.2369 10.7627L3.20609 2.4237C1.88859 1.42771 0 2.36751 0 4.01911Z"
              fill="#C1272D"
            />
            <rect
              x="15.1582"
              y="2.52637"
              width="3.78947"
              height="18.9474"
              rx="1.89474"
              fill="#C1272D"
            />
          </svg>
        </div>
      </div>

      {store.bigPlayer ? (
        <div className="fixed bottom-0 bg-black z-20 h-4/6 sm:h-[450px] w-full animate-up">
          <div>
            <div className="p-4 sm:flex block">
              {store.favoriteChannels.channels_id.includes(store.channel_id) ? (
                <div
                  className="absolute top-10 right-10 cursor-pointer"
                  onClick={() => store.setfavoriteChannels(store.channel_id)}
                >
                  <svg width="33" height="29" viewBox="0 0 33 29" fill="none">
                    <path
                      d="M32.8654 10.1157C31.088 19.2778 23.1596 24.9259 16.5 28.4925C9.84041 24.9259 1.9062 19.2778 0.1346 10.1157C-0.748278 5.57273 2.83001 0.678892 7.41396 0.0649706C11.191 -0.437861 15.0383 2.03537 16.5 5.49672C17.9559 2.03537 21.809 -0.437861 25.586 0.0649706C30.17 0.678892 33.7483 5.57273 32.8654 10.1157Z"
                      fill="#3399FF"
                    />
                  </svg>
                </div>
              ) : (
                <div
                  className="absolute top-10 right-10 cursor-pointer"
                  onClick={() => store.setfavoriteChannels(store.channel_id)}
                >
                  <svg width="33" height="29" viewBox="0 0 33 29" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30.902 9.73485L30.9021 9.73421C31.2207 8.09509 30.7456 6.28989 29.6577 4.7925C28.5697 3.29494 26.9883 2.27096 25.3216 2.04741C22.5313 1.67623 19.487 3.55356 18.3436 6.27213L16.5037 10.6464L14.6576 6.27478C13.5077 3.55192 10.467 1.67653 7.67852 2.0474C6.0118 2.27092 4.4303 3.29491 3.34227 4.7925C2.25438 6.28989 1.77933 8.09509 2.09787 9.73421L2.09823 9.73605C3.60743 17.5411 10.1761 22.6877 16.5 26.2135C22.8225 22.6882 29.3876 17.5412 30.902 9.73485ZM16.5 28.4925C9.84041 24.9259 1.9062 19.2778 0.1346 10.1157C-0.748278 5.57273 2.83001 0.678892 7.41396 0.0649706C10.3988 -0.332398 13.4275 1.12883 15.2881 3.46753C15.7819 4.08823 16.1934 4.77074 16.5 5.49672C16.8055 4.7705 17.2164 4.08778 17.7101 3.46692C19.5693 1.12857 22.6014 -0.332363 25.586 0.0649706C30.17 0.678892 33.7483 5.57273 32.8654 10.1157C31.088 19.2778 23.1596 24.9259 16.5 28.4925Z"
                      fill="#3399FF"
                    />
                  </svg>
                </div>
              )}

              <div className="w-full sm:w-[300px]">
                {store.favoriteChannels.channels_id.includes(
                  store.channel_id
                ) ? (
                  <div
                    className="absolute top-[60%] right-20 cursor-pointer opacity-50 hover:opacity-100"
                    onClick={() => {
                      // console.log(allStationIds);
                      // // const y = [1, 2, 3];
                      // const x = 10000;
                      // if (allStationIds.includes(x)) {
                      //   console.log(x, "HERE!");
                      // }
                      const array1 = ["Text1", "Text2", "Text3"];
                      const aaray2 = ["Text1", "Text3"];
                      console.log(aaray2.every((x) => array1.includes(x)));
                    }}
                  >
                    <svg width="29" height="27" viewBox="0 0 29 27" fill="none">
                      <path
                        d="M14.5 1.23607L17.0289 9.01925C17.2967 9.8433 18.0646 10.4012 18.931 10.4012H27.1147L20.494 15.2115C19.793 15.7208 19.4997 16.6235 19.7674 17.4476L22.2963 25.2307L15.6756 20.4205C14.9746 19.9112 14.0254 19.9112 13.3244 20.4205L6.70366 25.2307L9.23257 17.4476C9.50031 16.6235 9.207 15.7208 8.50602 15.2115L1.88525 10.4012L10.069 10.4012C10.9354 10.4012 11.7033 9.8433 11.9711 9.01925L14.5 1.23607Z"
                        fill="#3399FF"
                        stroke="#3399FF"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className="absolute top-[60%] right-20 cursor-pointer opacity-50 hover:opacity-100"
                    // onClick={() => store.setfavoriteChannels(store.channel_id)}
                  >
                    <svg width="29" height="27" viewBox="0 0 29 27" fill="none">
                      <path
                        d="M14.5 1.23607L17.0289 9.01925C17.2967 9.8433 18.0646 10.4012 18.931 10.4012H27.1147L20.494 15.2115C19.793 15.7208 19.4997 16.6235 19.7674 17.4476L22.2963 25.2307L15.6756 20.4205C14.9746 19.9112 14.0254 19.9112 13.3244 20.4205L6.70366 25.2307L9.23257 17.4476C9.50031 16.6235 9.207 15.7208 8.50603 15.2115L7.91824 16.0205L8.50602 15.2115L1.88525 10.4012L10.069 10.4012C10.9354 10.4012 11.7033 9.8433 11.9711 9.01925L14.5 1.23607Z"
                        stroke="#3399FF"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                )}
                <div
                  className="absolute top-[60.5%] right-10 cursor-pointer opacity-50 hover:opacity-100"
                  onClick={() => downloadTrack()}
                >
                  <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
                    <path
                      d="M20.385 13.2305V18.1655H3.615V13.2305H0V21.7805H24V13.2305H20.385Z"
                      fill="#3399FF"
                    />
                    <path
                      d="M9.495 13.98L12 16.485L16.38 12.105L19.515 8.985H14.55V0H9.465V8.985H4.5L9.51 13.995L9.495 13.98Z"
                      fill="#3399FF"
                    />
                  </svg>
                </div>

                <img
                  onClick={() => store.setSizePlayer(false)}
                  // src={"https:" + currentTrack?.asset_url}
                  src={
                    store.currentPlaying.asset_url === "https:null"
                      ? "//cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                      : store.currentPlaying.asset_url
                  }
                  alt=""
                />
              </div>

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
        <div className="fixed bottom-0 bg-black z-20 h-[80px] w-full p-2 animate-down">
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
            <div
              onClick={() => store.setSizePlayer(true)}
              className="pl-4 w-1/2"
            >
              <p className="text-sky-400 text-sm font-bold">
                {store.channel_name}
              </p>
              <p className="text-white text-xs">{store.currentPlaying.track}</p>
            </div>
            {isPlaying ? (
              <div
                onClick={() => audioRef.current.audio.current.pause()}
                className="fixed w-[50px] bottom-4 right-20"
              >
                <svg
                  ref={svgRef}
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
                className="fixed w-[50px] bottom-4 right-20"
              >
                <svg
                  ref={svgRef}
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
            <div
              className="fixed bottom-7 right-0 w-[50px]"
              onClick={() => {
                setSpecialNextChannel();
                // audioRef.current.audio.current.play();
                // store.setOnAir(false);
              }}
            >
              <svg width="19" height="24" viewBox="0 0 19 24" fill="none">
                <path
                  d="M0 4.01911V20.1411C0 21.7626 1.82816 22.7101 3.15303 21.7753L14.1839 13.9923C15.2906 13.2114 15.3174 11.5795 14.2369 10.7627L3.20609 2.4237C1.88859 1.42771 0 2.36751 0 4.01911Z"
                  fill="#C1272D"
                />
                <rect
                  x="15.1582"
                  y="2.52637"
                  width="3.78947"
                  height="18.9474"
                  rx="1.89474"
                  fill="#C1272D"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Player;
