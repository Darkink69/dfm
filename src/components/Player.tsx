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
  const [dataChannels, setDataChannels] = useState<any>({});
  // const [allStationIds, setAllStationIds] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>();
  // const [allTokens, setAllTokens] = useState<any>();
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTimePlay, setCurrentTimePlay] = useState(Number);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [allChannelTracks, setAllChannelTracks] = useState<any>([]);
  const [idChannelForNext, setIdChannelForNext] = useState(Number);

  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const audioRef = useRef<any>(null);
  const svgRef = useRef<any>(null);

  const copyToClipboard = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.textContent || "";

      // Используем современный Clipboard API
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Сброс статуса через 2 секунды
        })
        .catch((err) => {
          console.error("Ошибка при копировании: ", err);
          // Fallback для старых браузеров
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        });
    }
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsSwiping(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartX(clientX);
    setStartY(clientY);
    setTranslateX(0);
    setTranslateY(0);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;

    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    // Определяем основное направление свайпа
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Горизонтальный свайп
      setTranslateX(diffX);
      setTranslateY(0);
    } else {
      // Вертикальный свайп (только вниз)
      if (diffY > 0) {
        setTranslateY(diffY);
        setTranslateX(0);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const swipeThreshold = 100;

    if (translateX > swipeThreshold) {
      handleSwipeRight();
    } else if (translateX < -swipeThreshold) {
      handleSwipeLeft();
    } else if (translateY > swipeThreshold) {
      handleSwipeDown();
    }

    // Анимация возврата
    setTranslateX(0);
    setTranslateY(0);
  };

  const handleSwipeRight = () => {
    console.log("Свайп вправо");
  };

  const handleSwipeLeft = () => {
    setTranslateX(0);
    setTranslateY(0);
    getRandomTrack();
  };

  const handleSwipeDown = () => {
    store.setSizePlayer(false);
  };

  // const handleSwipeComplete = () => {
  //   console.log("Свайп вправо выполнен!");
  //   getRandomTrack();
  // };

  const getAllTokens = () => {
    fetch(
      `https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/audio/audio.json`
    )
      .then((response) => response.json())
      .then((data) => store.setAllTokens(data))
      .catch((error) => {
        console.error(error);
        console.log("Audio_token problem");
      });
  };

  const getTracks = () => {
    const audio_token =
      store.allTokens[Math.floor(Math.random() * store.allTokens.length)];
    const ts = Date.now();
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
        store.setServerError(true);
        store.setSizePlayer(false);
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
      .catch((error) => {
        console.error(error);
        console.log("api audioaddict problem..");
        store.setServerError(true);
        store.setSizePlayer(false);
      });
  };

  const getChannels = () => {
    // собираем инфо о всех каналах (?)
    const infoCh: any = [];
    store.sites.map((item: any) => {
      // console.log(item);
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
            // console.log(infoCh);
            infoCh.push(ch);
            setDataChannels((prev: any) => ({ ...prev, infoCh }));
          });
        })
        .catch((error) => console.error(error));
    });
  };

  const setAudioToken = () => {
    localStorage.setItem(
      "data",
      JSON.stringify(currentTrack?.content.assets[0].url.split("?")[1] || [])
    );
  };

  const getNextTrack = () => {
    getHistory();
    getTracks();
    store.setOnAir(true);
  };

  const setSpecialNextChannel = () => {
    store.setSpinView("");
    store.setOnAir(true);
    let nextChannel = store.channel_id;

    const channelNames = JSON.parse(localStorage.getItem("ch") || "[]");
    if (store.favoriteChannels.channels_id.length <= 1) {
      // console.log(channelNames.length, "channelNames");
      let index = channelNames.findIndex(
        (obj: { id: number }) => obj.id === nextChannel
      );
      if (index === 430) {
        index = 0;
      }
      // console.log(channelNames[index], index);
      store.setChannel_id(channelNames[index + 1].id);
      store.setChannel_name(channelNames[index + 1].name);
      store.setCurrentSite(
        store.network_ids.indexOf(channelNames[index + 1].network_id)
      );
    } else {
      for (
        let i = 0, len = store.favoriteChannels.channels_id.length;
        i < len;
        i++
      ) {
        if (store.favoriteChannels.channels_id[i] === store.channel_id) {
          // console.log(store.channel_id);
          if (i >= len - 1) {
            nextChannel = store.favoriteChannels.channels_id[0];
          } else {
            nextChannel = store.favoriteChannels.channels_id[i + 1];
          }
          break;
        }
        nextChannel = store.favoriteChannels.channels_id[0];
      }
      store.setChannel_id(nextChannel);
      channelNames.map((item: any) => {
        if (
          nextChannel === item.id &&
          store.favoriteChannels.channels_id.includes(nextChannel)
        ) {
          // console.log(item);
          store.setChannel_name(item.name);
          store.setCurrentSite(store.network_ids.indexOf(item.network_id));
        }
      });
    }
  };

  const setCountPlay = () => {
    const min = store.minMax[store.options.shuffle - 1][0];
    const max = store.minMax[store.options.shuffle - 1][1];
    const rand = min + Math.random() * (max + 1 - min);
    store.setCountPlayingTracks(Math.floor(rand));

    console.log(store.countPlayingTracks, "- треков будет играть");
  };

  const getOnAirTrack = () => {
    console.log(currentTimePlay);
    getNextTrack();
    // audioRef.current?.setJumpTime(currentTimePlay);
    // audioRef.current.audio.current.play();
    store.setOnAir(true);
    console.log(store.onAir, "butt 2");
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

  const getAllChannelTracks = () => {
    fetch(
      `https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/${
        store.sites[store.currentSite]
      }/db_${store.sites[store.currentSite]}_full_${
        store.channel_id
      }_light.json`
    )
      .then((response) => response.json())
      .then((data) => {
        {
          setAllChannelTracks(data.sort(() => Math.random() - 0.5));
          setIdChannelForNext(store.channel_id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRandomTrack = () => {
    store.setSpinView("");
    store.setOnAir(false);
    console.log(idChannelForNext, "next!");
    if (
      allChannelTracks.length === 0 ||
      idChannelForNext !== store.channel_id
    ) {
      getAllChannelTracks();
    }

    console.log(store.channel_id);
    console.log(allChannelTracks);
    const audio_token = String(localStorage.getItem("data")).slice(1, -1);

    const rndTrack = Math.floor(Math.random() * allChannelTracks.length);
    // console.log(rndTrack);

    store.setCurrentPlaying({
      track: allChannelTracks[rndTrack].track,
      url: `https:${allChannelTracks[rndTrack].url}?${audio_token}`,
      asset_url: allChannelTracks[rndTrack].asset_url,
    });
    // console.log("random!!");
  };

  const addPlaylist = () => {
    const allStarTracks = JSON.parse(localStorage.getItem("stars") || "[]");

    Object.values(dataHistory).map((item: any) => {
      if (item.channel_id === store.channel_id) {
        const track = {
          asset_url: item.art_url,
          id: item.track_id,
          length: item.length,
          size: null,
          track: item.track,
          url: store.currentPlaying.url.split("?")[0].split("https:")[1],
        };

        if (
          allStarTracks.filter((item: { id: any }) => item.id === track.id)
            .length === 0
        ) {
          allStarTracks.push(track);
        }
      }
    });

    localStorage.setItem("stars", JSON.stringify(allStarTracks));
    store.setRemoveStarTrack(true);
  };

  // useEffect(() => {
  //   audioRef.current?.setJumpTime(currentTimePlay);
  // }, [currentTimePlay]);

  // useEffect(() => {
  //   getAllChannelTracks();
  // }, [allChannelTracks]);

  useEffect(() => {
    getTracks();
    getHistory();
    // getChannels();
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
    setAudioToken();
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
    // audioRef.current?.setJumpTime(currentTimePlay);
  }, [dataHistory]);

  useEffect(() => {
    // console.log(typeof dataChannels, dataChannels, "eff!");
    if (Object.keys(dataChannels).length !== 0) {
      // console.log(dataChannels.length);

      localStorage.setItem("ch", JSON.stringify(dataChannels.infoCh));
      store.setAllStationsDataLoaded(true);
    }

    const allNames: { id: number; name: string }[] = [];
    // const allIds: { id: number }[] = [];
    // ВСЕ ИМЕНА КАНАЛОВ!! ТУТ УСТАНАВЛИВАЕТ ПРАВИЛЬНО!
    dataChannels.data?.map((item: any) => {
      allNames.push({ id: item.id, name: item.name });
      // console.log(item.id, item.name);
      // allIds.push(item.id);
    });
    // console.log(typeof allIds, allIds);
    store.setAllStationsNames(allNames);
    // setAllStationIds(allIds);
    // store.setAllStationIds(allIds);
  }, [dataChannels]);

  useEffect(() => {
    setCountPlay();

    // let min = minMax[store.options.shuffle - 1][0];
    // let max = minMax[store.options.shuffle - 1][1];
    // let rand = min + Math.random() * (max + 1 - min);
    // store.setCountPlayingTracks(Math.floor(rand));

    // console.log(store.countPlayingTracks, "- мы задали треков играть");
  }, [store.options.shuffle]);

  useEffect(() => {
    getAllTokens();
    const channelNames = JSON.parse(localStorage.getItem("ch") || "0");
    if (channelNames === 0) {
      getChannels();
    } else {
      store.setAllStationsDataLoaded(true);
    }

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
              if (store.options.shuffle === 1) {
                getNextTrack();
              } else {
                store.setCountPlayingTracks((store.countPlayingTracks -= 1));
                if (store.countPlayingTracks === 0) {
                  setSpecialNextChannel();
                  setCountPlay();
                }
                getNextTrack();
                console.log("осталось", store.countPlayingTracks);
              }

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
            title={"Вы слушаете прямой эфир канала"}
          >
            <OnAir />
          </div>
        ) : (
          <div
            className="relative bottom-6 left-12 w-[70px]"
            onClick={() => {
              getOnAirTrack();
              // console.log(currentTimePlay);
              // // getNextTrack();
              // audioRef.current?.setJumpTime(currentTimePlay);
              // audioRef.current.audio.current.play();
              // store.setOnAir(true);
              // console.log(store.onAir, "butt 2");
            }}
            title="Вернуться в прямой эфир"
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
              fill={store.options.shuffle === 1 ? "#ffff" : "#C1272D"}
            />
            <rect
              x="15.1582"
              y="2.52637"
              width="3.78947"
              height="18.9474"
              rx="1.89474"
              fill={store.options.shuffle === 1 ? "#ffff" : "#C1272D"}
            />
          </svg>
        </div>
      </div>

      {store.bigPlayer ? (
        <div className="fixed bottom-0 bg-black z-20 h-[80%] sm:h-[450px] w-full animate-up">
          <div>
            <div className="p-4 sm:flex block">
              {store.favoriteChannels.channels_id.includes(store.channel_id) ? (
                <div
                  className="z-30 absolute top-10 right-10 cursor-pointer"
                  onClick={() => {
                    store.setfavoriteChannels(store.channel_id);
                    // store.setfavoriteChannels({
                    //   currentSite: store.currentSite,
                    //   channel_id: store.channel_id,
                    // });
                  }}
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
                  className="z-30 absolute top-10 right-10 cursor-pointer"
                  onClick={() => {
                    store.setfavoriteChannels(store.channel_id);
                  }}
                  title="Добавить в любимые каналы"
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
                <div
                  className="z-30 absolute top-[60%] right-20 cursor-pointer opacity-50 hover:opacity-100"
                  onClick={() => addPlaylist()}
                  title="Добавить в избранные треки"
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
                <div
                  className="z-30 absolute top-[60.5%] right-10 cursor-pointer opacity-50 hover:opacity-100"
                  onClick={() => downloadTrack()}
                  title="Скачать трек"
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

                <div
                  className="z-30 absolute top-[35%] right-10 cursor-pointer opacity-50 hover:opacity-100"
                  onClick={() => getRandomTrack()}
                  title="Следующий случайный трек"
                >
                  <svg width="26" height="19" viewBox="0 0 26 19" fill="none">
                    <path
                      d="M0 4.01912V15.1411C0 16.7626 1.82816 17.7101 3.15303 16.7753L10.7628 11.4061C11.8695 10.6252 11.8963 8.99325 10.8159 8.17647L3.20609 2.4237C1.88859 1.42771 0 2.36751 0 4.01912Z"
                      fill="#FCFCFC"
                    />
                    <path
                      d="M13 4.01912V15.1411C13 16.7626 14.8282 17.7101 16.153 16.7753L23.7628 11.4061C24.8695 10.6252 24.8963 8.99325 23.8159 8.17647L16.2061 2.4237C14.8886 1.42771 13 2.36751 13 4.01912Z"
                      fill="#FCFCFC"
                    />
                  </svg>
                </div>

                <img
                  ref={imageRef}
                  className="cursor-grab active:cursor-grabbing transition-transform duration-300"
                  onClick={() => store.setSizePlayer(false)}
                  // src={"https:" + currentTrack?.asset_url}
                  src={
                    store.currentPlaying.asset_url === "https:null"
                      ? "//cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                      : store.currentPlaying.asset_url
                  }
                  alt=""
                  style={{
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    userSelect: "none",
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleTouchStart}
                  onMouseMove={handleTouchMove}
                  onMouseUp={handleTouchEnd}
                  onMouseLeave={handleTouchEnd}
                />
              </div>

              <div className="pl-10">
                <p
                  onClick={() => store.setSizePlayer(false)}
                  className="text-sky-400 sm:text-2xl text-base font-bold"
                >
                  {store.channel_name}
                </p>
                <p
                  ref={textRef}
                  className="text-white sm:text-2xl cursor-pointer"
                  onClick={() => copyToClipboard()}
                >
                  {store.currentPlaying.track}
                </p>
                {/* {isCopied && (
                  <div className="mt-2 text-teal-600 text-base">
                    Артист и название трека скопированы!
                  </div>
                )} */}
                {isCopied && (
                  <div className="fixed bottom-40 right-4 z-50">
                    <div className="bg-black bg-opacity-70 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Артист и название трека скопированы!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 bg-black z-20 h-[80px] w-full p-2 animate-down">
          <div className="flex cursor-pointer">
            <img
              onClick={() => {
                store.setSizePlayer(true);
                store.setMenuView(false);
              }}
              className="h-[60px]"
              src={
                store.currentPlaying.asset_url === "https:null"
                  ? "//cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                  : store.currentPlaying.asset_url
              }
              alt=""
            />
            <div
              onClick={() => {
                store.setSizePlayer(true);
                store.setMenuView(false);
              }}
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
              className="fixed bottom-7 right-0 w-[50px] cursor-pointer"
              onClick={() => {
                setSpecialNextChannel();
                // audioRef.current.audio.current.play();
                // store.setOnAir(false);
              }}
              title="Следующий канал"
            >
              <svg width="19" height="24" viewBox="0 0 19 24" fill="none">
                <path
                  d="M0 4.01911V20.1411C0 21.7626 1.82816 22.7101 3.15303 21.7753L14.1839 13.9923C15.2906 13.2114 15.3174 11.5795 14.2369 10.7627L3.20609 2.4237C1.88859 1.42771 0 2.36751 0 4.01911Z"
                  fill={store.options.shuffle === 1 ? "#ffff" : "#C1272D"}
                />
                <rect
                  x="15.1582"
                  y="2.52637"
                  width="3.78947"
                  height="18.9474"
                  rx="1.89474"
                  fill={store.options.shuffle === 1 ? "#ffff" : "#C1272D"}
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
