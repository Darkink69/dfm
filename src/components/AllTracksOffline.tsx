import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardTrackOffline from "./CardTrackOffline";

const AllTracksOffline = observer(() => {
  const [allChannelTracks, setAllChannelTracks] = useState<any>(null);
  const [showOfflineTracks, setShowOfflineTracks] = useState<any>(null);
  const [dataSearch, setDataSearch] = useState<any>([]);
  const [showTracks, setShowTracks] = useState(20);
  const [input, setInput] = useState("");
  const inputRef = useRef<any>();

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
        setAllChannelTracks(data.sort(() => Math.random() - 0.5));
        // store.setOtherSite(false);
      })
      .catch((error) => {
        console.error(error);
        console.log("Такой тут нет!");
        // store.setOtherSite(true);
      });
  };

  const getAllSearchTracks = () => {
    const resultSearch: { track: string }[] = [];
    const wordsSearch = input.toLowerCase().split(" ");
    allChannelTracks.map((item: { track: string }) => {
      const wordsTrack = item.track.toLowerCase().split(" ");
      const filteredArray = wordsSearch.filter((val: string) =>
        wordsTrack.includes(val)
      );
      if (filteredArray.length !== 0) {
        resultSearch.push(item);
      }
    });

    setDataSearch(resultSearch);
  };

  const onEnter = (e: any) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  useEffect(() => {
    setShowOfflineTracks(allChannelTracks?.slice(0, showTracks));
  }, [allChannelTracks, showTracks]);

  useEffect(() => {
    if (store.allTracksOfflineView) {
      getAllChannelTracks();
    }
  }, [store.channel_id, store.allTracksOfflineView]);

  useEffect(() => {
    setDataSearch([]);
  }, [store.allChannelsView]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      store.setSpinView("");
      if (input.length !== 0) {
        store.setSpinView("");
        getAllSearchTracks();
      } else {
        setDataSearch([]);
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <>
      <div
        className={
          store.allChannelsView ? "pl-4 pr-4 mt-8 pb-8" : "pl-4 pr-4 pb-3"
        }
      >
        <div
          className="flex items-center pb-2 bg-slate-800"
          onClick={() => {
            {
              !store.allTracksOfflineView ? store.setSpinView("") : "";
            }
            store.setAllTracksOfflineView(
              store.allTracksOfflineView ? false : true
            );
          }}
        >
          <svg width="25" height="26" viewBox="0 0 25 26" fill="none">
            <path
              d="M1.03474 12.94C1.03474 10.135 1.04728 7.33 1.02578 4.52681C1.0204 3.90667 1.16737 3.56613 1.83411 3.38331C4.42043 2.67355 6.97806 1.86701 9.56438 1.15905C10.8047 0.820297 10.9893 0.956513 11.0484 2.2201C11.1237 3.85828 11.1076 5.50004 11.1004 7.14001C11.0735 12.7177 11.0341 18.2954 11 23.8731C10.9929 24.9664 10.7258 25.1797 9.64503 24.8714C7.20927 24.176 4.78964 23.4196 2.34313 22.7672C1.35377 22.5056 0.964837 22.0844 1.00248 20.9946C1.09747 18.3133 1.03295 15.6248 1.03474 12.94ZM9.87087 2.22727C7.31681 2.95853 4.91511 3.62707 2.53132 4.35654C2.30549 4.42465 2.05815 4.87452 2.05636 5.14875C2.02768 10.3698 2.04381 15.589 2.02589 20.81C2.0241 21.3674 2.25172 21.6004 2.75536 21.7402C3.98848 22.0844 5.20905 22.4787 6.43858 22.8371C7.54085 23.158 8.64851 23.4591 9.87087 23.8014V2.22727Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M23.6512 12.9889C23.6512 16.1827 23.632 19.3766 23.6634 22.5684C23.6721 23.3956 23.4441 23.6781 22.7203 23.666C20.227 23.6236 17.7338 23.6539 15.2422 23.6438C14.8908 23.6438 14.3618 23.7628 14.4645 23.0829C14.4993 22.8529 14.9847 22.5684 15.2666 22.5623C17.4397 22.518 19.6146 22.5119 21.7877 22.5543C22.4472 22.5664 22.6281 22.3101 22.6264 21.5717C22.6055 15.9245 22.6003 10.2772 22.6299 4.62999C22.6351 3.74427 22.3254 3.55663 21.6503 3.56672C19.505 3.599 17.3597 3.58084 15.2144 3.57479C14.8264 3.57479 14.3375 3.70997 14.334 2.96346C14.3305 2.20888 14.8212 2.35818 15.2092 2.35818C17.6729 2.35415 20.1383 2.39652 22.6003 2.33397C23.465 2.31178 23.679 2.67091 23.6668 3.61111C23.6268 6.73636 23.6512 9.86363 23.6512 12.9889Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M21.0007 13.3291C20.996 16.4015 18.5071 19.234 15.1626 19.6626C14.9311 19.693 14.5071 19.5315 14.4508 19.362C14.2897 18.8821 14.6417 18.7638 15.0594 18.6982C17.5967 18.2968 19.2955 16.7438 19.8712 14.3367C20.6283 11.1684 18.6104 7.99367 15.4739 7.41629C15.3206 7.38751 15.1673 7.35072 15.0124 7.33633C14.6667 7.30434 14.2991 7.30754 14.3366 6.79094C14.382 6.18798 14.8263 6.33992 15.1595 6.37831C16.8317 6.57183 18.2443 7.31713 19.3534 8.60302C20.4438 9.86812 20.9694 11.3747 21.0007 13.3323V13.3291Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M13.9922 14.7804C14.1786 14.4542 14.3023 14.0616 14.5639 13.8143C15.211 13.2085 15.2002 12.7568 14.5263 12.1206C14.3166 11.9216 14.2772 11.5416 14.1589 11.2459C14.4761 11.2352 14.8382 11.1205 15.0998 11.2352C15.858 11.5685 16.2666 12.4862 16.1233 13.3268C15.9673 14.2498 15.3113 14.8323 13.9922 14.7786V14.7804Z"
              fill="white"
            />
          </svg>

          <div className="pl-4 w-full text-white text-xl cursor-pointer">
            Все треки{" "}
            <span className="text-sky-400 font-semibold">
              {store.channel_name}
            </span>
          </div>
          <svg
            className={store.allTracksOfflineView ? "m-2" : "-rotate-90 m-2"}
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="grid grid-cols-1">
          {store.allTracksOfflineView ? (
            <div className="pt-4 pb-4 cursor-pointer">
              <div className="relative shadow-sm w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
                  <svg
                    className="absolute text-slate-400 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyUp={onEnter}
                  type="text"
                  placeholder={"Поиск на " + store.channel_name}
                  className="block text-base bg-slate-700 border-2 border-gray-400 w-full pl-10 py-2 px-3 ring-1 ring-slate-900/10 text-white rounded-full dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400"
                ></input>
                {input.length > 0 ? (
                  <div
                    className="absolute inset-y-0 right-4 pl-3 flex items-center pointer-events-auto"
                    onClick={() => {
                      inputRef.current.value = "";
                      setInput("");
                      setDataSearch([]);
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 1L17 17" stroke="white" strokeWidth="2" />
                      <path d="M17 1L1 17" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {dataSearch.length !== 0 ? (
                <div className="pt-4">
                  {dataSearch?.map((item: any) => {
                    return <CardTrackOffline data={item} key={item.id} />;
                  })}
                </div>
              ) : (
                <div className="relative top-6 text-center pt-4 text-white">
                  {input.length > 0 ? (
                    "Кажется такой артист или трек никогда не звучит на этом канале..."
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 text-left grid-cols-1">
                      {store.allTracksOfflineView
                        ? showOfflineTracks?.map((item: any) => {
                            return (
                              <CardTrackOffline data={item} key={item.id} />
                            );
                          })
                        : ""}
                      <div
                        onClick={() => {
                          store.setSpinView("");
                          setShowTracks(showTracks + 30);
                        }}
                        className="text-sky-400  pt-4 text-lg underline cursor-pointer"
                      >
                        {store.allTracksOfflineView ? "Показать еще" : ""}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
});

export default AllTracksOffline;
