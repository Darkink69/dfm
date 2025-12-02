import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CardChannel from "./CardChannel";

const FavoriteChannels = observer(() => {
  const [allChannels, setAllChannels] = useState<any>({});
  const [allFavChannels, setAllFavChannels] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const getAllChannels = () => {
    const sites: any[] = [];

    const channelNames = JSON.parse(localStorage.getItem("ch") || "[]");
    channelNames.map((item: any) => {
      if (store.favoriteChannels.channels_id.includes(item.id)) {
        if (
          !sites.includes(
            store.sites[store.network_ids.indexOf(item.network_id)]
          )
        ) {
          sites.push(store.sites[store.network_ids.indexOf(item.network_id)]);
        }
      }
    });

    const resultCh: any = [];
    sites.map((item: any) => {
      fetch(
        `https://voltron-two.vercel.app/get_url?url=https://api.audioaddict.com/v1/${item}/track_history.json`
      )
        // fetch(`https://api.audioaddict.com/v1/${item}/track_history.json`)
        .then((response) => response.json())
        .then((data) => {
          Object.values(data).map((item: any) => {
            // console.log(item);
            let ch = {
              network_id: item.network_id,
              channel_id: item.channel_id,
              track: item.track,
              art_url: item.art_url,
            };
            resultCh.push(ch);
            setAllChannels((prev: any) => ({ ...prev, resultCh }));
            setIsLoaded(true);
          });
        })
        .catch((error) => console.error(error));
    });
  };

  useEffect(() => {
    let favChannels: any[] = [];
    Object.values(allChannels).map((item: any) => {
      item.map((i: { channel_id: any }) => {
        if (store.favoriteChannels.channels_id.includes(i.channel_id)) {
          favChannels.push(i);
        }
      });
    });
    setAllFavChannels(favChannels);
    setIsLoaded(true);
  }, [allChannels, store.favoriteChannels.channels_id]);

  // Обновляем состояние во вкладке Любимые раз в 120 сек
  useEffect(() => {
    const timeOutId = setInterval(() => {
      if (store.allFavChannelsView) {
        getAllChannels();
      } else {
      }
    }, 120000);
    return () => clearTimeout(timeOutId);
  }, [store.allFavChannelsView]);

  useEffect(() => {
    if (store.favoriteChannels.channels_id.length === 0) {
      [69, 143, 186, 79].map((item: number) => {
        store.setfavoriteChannels(item);
      });
    }

    getAllChannels();
  }, []);

  return (
    <>
      <div
        className="pt-20 pl-4 pr-4 pb-3"
        onClick={() => {
          if (store.allFavChannelsView) {
            getAllChannels();
          }
        }}
      >
        <div className="flex items-center bg-slate-800">
          <svg width="25" height="23" viewBox="0 0 25 23" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5 21C7.85847 18.4965 2.32857 14.5319 1.09381 8.10065C0.478473 4.91172 2.97243 1.47654 6.1673 1.04561C8.24768 0.766677 10.3586 1.79237 11.6553 3.434C11.9995 3.86969 12.2863 4.34877 12.5 4.85836C12.7129 4.34861 12.9993 3.86938 13.3434 3.43357C14.6392 1.79219 16.7525 0.766701 18.8327 1.04561C22.0276 1.47654 24.5215 4.91172 23.9062 8.10065C22.6674 14.5319 17.1415 18.4965 12.5 21Z"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          <div
            className="pl-4 w-full text-white text-xl cursor-pointer"
            onClick={() =>
              store.setAllFavChannelsView(!store.allFavChannelsView)
            }
          >
            Мои любимые каналы
          </div>
          <svg
            className={store.allFavChannelsView ? "m-2" : "-rotate-90 m-2"}
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 pt-4">
          {isLoaded && store.allFavChannelsView
            ? Object.values(allFavChannels)?.map((item: any) => {
                return <CardChannel data={item} key={item.channel_id} />;
              })
            : ""}
        </div>
      </div>
    </>
  );
});

export default FavoriteChannels;
