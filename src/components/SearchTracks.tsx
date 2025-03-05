import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CardTrackOffline from "./CardTrackOffline";

const SearchTracks = observer(() => {
  const [input, setInput] = useState("");
  const [dataSearch, setDataSearch] = useState<any>([]);
  // const [allResultSearch, setAllResultSearch] = useState<any>([]);

  const getAllSearchTracks = () => {
    // console.log(allResultSearch);
    // store.allStationIds.map((item: any) => {

    // });
    fetch(
      `https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/${
        store.sites[store.currentSite]
      }/db_${store.sites[store.currentSite]}_full_${
        store.channel_id
      }_light.json`
    )
      .then((response) => response.json())
      .then((data) => {
        const resultSearch: { track: string }[] = [];
        const wordsSearch = input.toLowerCase().split(" ");
        // console.log(wordsSearch);
        data.map((item: { track: string }) => {
          const wordsTrack = item.track.toLowerCase().split(" ");
          const filteredArray = wordsSearch.filter((val: string) =>
            wordsTrack.includes(val)
          );
          if (filteredArray.length !== 0) {
            resultSearch.push(item);
          }
        });

        // setAllResultSearch(resultSearch);
        setDataSearch(resultSearch);
        // console.log(resultSearch);
      })
      .catch((error) => {
        console.error(error);
      });
    // setAllResultSearch(dataSearch);
  };

  useEffect(() => {
    setDataSearch([]);
    // setAllResultSearch([]);
    // if (!store.searchView) {
    //   setAllResultSearch([]);
    // }
  }, [store.searchView]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      store.setSpinView("");
      if (input.length !== 0) {
        // setInput(input);
        getAllSearchTracks();
      } else {
        setDataSearch([]);
      }
      // getAllSearchTracks();
    }, 2000);
    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <>
      {store.searchView ? (
        <div className="pt-20 pl-4 pr-4 cursor-pointer">
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
              onChange={(event) => setInput(event.target.value)}
              type="text"
              placeholder={"Поиск радиостанций"}
              className="block text-base bg-slate-700 border-2 border-gray-400 w-full pl-10 py-2 px-3 ring-1 ring-slate-900/10 text-white rounded-full dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400"
            ></input>
          </div>

          {dataSearch.length !== 0 ? (
            <div className="pt-4">
              {dataSearch?.map((item: any) => {
                return <CardTrackOffline data={item} key={item.id} />;
              })}
            </div>
          ) : (
            <div className="relative top-6 text-center pt-4 text-white">
              {input.length > 0 ? "Ничего не найдено..." : ""}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default SearchTracks;
