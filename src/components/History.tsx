import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CardTrackOffline from "./CardTrackOffline";

const History = observer(() => {
  const [historyData, setHistoryData] = useState<any>(null);
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
  }, [store.historyView, store.currentPlaying]);

  return (
    <>
      <div className="pl-4 pr-4 pb-28">
        <div className="flex items-center bg-slate-800">
          <svg
            width="23"
            height="21"
            viewBox="0 0 23 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.82387 11.3184C5.37553 11.0311 5.9111 9.59445 6.43977 9.43585C7.34311 9.16692 7.91775 9.69789 7.74306 10.6127C7.69249 10.8725 5.56861 13.8215 5.26979 14.1204C4.47908 14.9134 4.02626 14.7226 3.1505 14.1985C2.61034 13.8744 0.757685 12.5573 0.36233 12.1505C-0.423784 11.3437 0.169249 10.2633 1.18522 10.4288C1.55529 10.4886 2.85169 11.6563 2.91145 11.5735C1.71849 3.03661 11.1381 -3.10519 18.4774 1.66896C26.5615 6.9281 23.132 19.6507 13.5378 20.2231C12.685 20.2736 10.6944 20.3426 10.6944 19.1427C10.6944 17.7475 12.2828 18.329 13.0298 18.3267C19.9163 18.3038 23.5435 9.98751 19.0773 4.75824C13.786 -1.43642 3.6378 3.36301 4.82387 11.3184Z"
              fill="white"
            />
            <path
              d="M11.3125 4.89125C11.4481 4.24995 12.4572 4.0109 12.933 4.47981C12.9629 4.50969 13.2226 4.98779 13.2226 5.01767V9.6631H17.9945C18.5162 9.6631 19.015 10.4998 18.7553 11.0606C18.7254 11.1273 18.2841 11.5709 18.2496 11.5709H11.5056L11.3148 11.3801V4.88895L11.3125 4.89125Z"
              fill="white"
            />
          </svg>

          <div
            className="pl-4 w-full text-white text-xl cursor-pointer"
            onClick={() => {
              store.setHistoryView(!store.historyView);
            }}
          >
            История прослушивания
          </div>
          <svg
            className={store.historyView ? "m-2" : "-rotate-90 m-2"}
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {store.historyView ? (
          <div className="">
            <div className="flex pt-1 pl-4 cursor-pointer"></div>

            <div className="pl-4 grid grid-cols-1 scroll-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 text-left grid-cols-1">
                {historyData?.map((item: any) => {
                  return [
                    <div className="pt-4 pl-1 text-white text-sm">
                      {formatTimestamp(item.ts)}
                    </div>,
                    <CardTrackOffline data={item} key={item.ts} />,
                  ];
                })}
              </div>
              {historyData ? (
                <div
                  className="text-white text-xs opacity-50 pt-4 cursor-pointer"
                  onClick={() =>
                    localStorage.setItem("historyData", JSON.stringify([]))
                  }
                >
                  Очистить историю
                </div>
              ) : (
                <div className="text-white text-center text-sm pt-4">Пусто</div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
});

export default History;
