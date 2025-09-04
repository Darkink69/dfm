import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CardTrackOffline from "./CardTrackOffline";

const History = observer(() => {
  const [historyData, setHistoryData] = useState<any>(null);
  // const [historyData, setHistoryData] = useState<any>(
  //   localStorage.getItem("historyData")
  // );

  function formatTimestamp(timestamp: string | number | Date) {
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const day = date.getDate();

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const month = months[date.getMonth()];
    return `${hours}:${minutes}, ${day} ${month}`;
  }

  useEffect(() => {
    let data = localStorage.getItem("historyData");
    if (data) {
      try {
        const parsedItems = JSON.parse(data);
        setHistoryData(parsedItems);
      } catch (error) {}
    }
  }, [store.historyView]);

  return (
    <>
      {store.historyView && (
        <div className="h-full w-full bg-black">
          {/* <div className="z-[100] fixed w-full h-full"></div> */}
          <div className="fixed bg-black w-full h-[60px] opacity-80"></div>
          <div
            className="fixed flex pt-4 pl-4 cursor-pointer"
            onClick={() => store.setHistoryView(false)}
          >
            <svg width="28" height="28" viewBox="0 0 36 35" fill="none">
              <path
                d="M18 3L3 18L17.02 32.02"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.41016 17.9199H33.8102"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="pl-4 text-xl text-white">История прослушивания</div>
          </div>

          <div className="pt-16 pl-4 grid grid-cols-1 scroll-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 text-left grid-cols-1">
              {historyData?.map((item: any) => {
                return [
                  <div className="pt-4 pl-1 text-white text-sm">
                    {formatTimestamp(item.ts)}
                  </div>,
                  <CardTrackOffline data={item} key={item.id} />,
                ];
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default History;
