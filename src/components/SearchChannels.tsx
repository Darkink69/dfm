import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const SearchChannels = observer(() => {
  const [input, setInput] = useState("");
  const [dataSearch, setDataSearch] = useState<any>([]);
  const [dataChannels, setDataChannels] = useState<any>([]);

  const onEnter = (e: any) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const getDataChannel = () => {
    // console.log(dataChannels.length);
    if (dataChannels.length === 0) {
      const resultCh: { name: string }[] = [];
      store.sites.map((item) => {
        console.log(item);
        fetch(`https://api.audioaddict.com/v1/${item}/channels.json`)
          .then((response) => response.json())
          .then((data) => {
            data.map((item: any) => {
              let ch = {
                id: item.id,
                name: item.name,
                network_id: item.network_id,
                description_short: item.description_short,
              };
              resultCh.push(ch);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
      setDataChannels(resultCh);
    }
  };

  const setSearchChannel = (network_id: number, id: any, name: any) => {
    store.setSpinView("");
    store.setChannel_id(id);
    store.setChannel_name(name);
    store.setCurrentSite(store.network_ids.indexOf(network_id));
    store.setSearchView(false);
    store.setSizePlayer(true);
    store.setOnAir(true);
  };

  const getAllSearchChannels = () => {
    const resultSearch: { name: string }[] = [];
    const wordsSearch = input.toLowerCase().split(" ");
    dataChannels.map((item: { [x: string]: any; name: any }) => {
      const words =
        item.name.toLowerCase().split(" ") +
        " " +
        item.description_short.toLowerCase().split(" ");
      const filteredArray = wordsSearch.filter((val: string) =>
        words.includes(val)
      );
      if (filteredArray.length !== 0) {
        resultSearch.push(item);
      }
    });
    setDataSearch(resultSearch);
  };

  useEffect(() => {
    if (store.searchView) {
      getDataChannel();
    }
    setInput("");
  }, [store.searchView]);

  useEffect(() => {
    setDataSearch([]);
    setInput("");
  }, [store.searchView]);

  useEffect(() => {
    // console.log(input, "input!!");
    store.setSpinView("");
    const timeOutId = setTimeout(() => {
      if (input.length !== 0) {
        store.setSpinView("");
        getAllSearchChannels();
      } else {
        setDataSearch([]);
      }
    }, 200);
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
              onKeyUp={onEnter}
              type="text"
              placeholder={"Поиск радиостанций"}
              className="block text-base bg-slate-700 border-2 border-gray-400 w-full pl-10 py-2 px-3 ring-1 ring-slate-900/10 text-white rounded-full dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400"
            ></input>
          </div>

          {dataSearch.length !== 0 ? (
            <div className="pt-4">
              {dataSearch?.map((item: any) => {
                return (
                  <div
                    onClick={() =>
                      setSearchChannel(item.network_id, item.id, item.name)
                    }
                    className="text-sky-400 text-base sm:text-xl font-bold pl-10 pb-4"
                    key={item.id}
                  >
                    {item.name}{" "}
                    <span className="text-white font-light sm:text-xl">
                      {
                        store.siteName[
                          store.network_ids.indexOf(item.network_id)
                        ]
                      }
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative top-6 text-center pt-4 text-white">
              {input.length > 0 ? "Такой радиостанции тут нет..." : ""}
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      {/* return (
    <div className="App">
      <input onKeyUp={onEnter} />
    </div>
  ); */}
    </>
  );
});

export default SearchChannels;
