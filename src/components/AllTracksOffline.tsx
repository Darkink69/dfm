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
        store.setOtherSite(false);
      })
      .catch((error) => {
        console.error(error);
        console.log("Такой тут нет!");
        store.setOtherSite(true);
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
    console.log(resultSearch);
  };

  useEffect(() => {
    setShowOfflineTracks(allChannelTracks?.slice(0, showTracks));
  }, [allChannelTracks, showTracks]);

  useEffect(() => {
    getAllChannelTracks();
  }, [store.channel_id]);

  useEffect(() => {
    setDataSearch([]);
  }, [store.allChannelsView]);

  useEffect(() => {
    console.log(input, "input!!");
    const timeOutId = setTimeout(() => {
      store.setSpinView("");
      if (input.length !== 0) {
        // setInput(input);
        getAllSearchTracks();
      } else {
        setDataSearch([]);
      }
    }, 2000);
    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <>
      <div
        className={
          store.allChannelsView ? "pl-4 pr-4 mt-8 pb-28" : "pl-4 pr-4 pb-28"
        }
      >
        <div
          className="flex items-baseline pb-2 bg-slate-800"
          onClick={() => {
            // store.setSpinView("");
            store.setAllTracksOfflineView(
              store.allTracksOfflineView ? false : true
            );
          }}
        >
          <div className="w-full text-white text-xl cursor-pointer">
            Все треки {store.channel_name}
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
                      <path d="M1 1L17 17" stroke="white" stroke-width="2" />
                      <path d="M17 1L1 17" stroke="white" stroke-width="2" />
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
                    <div className="grid sm:grid-cols-3 text-left grid-cols-1">
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
                        className="text-white pt-4 text-lg underline cursor-pointer"
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
