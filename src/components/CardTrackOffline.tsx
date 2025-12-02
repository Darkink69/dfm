import { observer } from "mobx-react-lite";
import { useState } from "react";
import store from "./store";

const CardTrackOffline = observer(({ data }: any) => {
  const [viewItem, setViewItem] = useState(false);
  const url = data.url;
  const audio_token = String(localStorage.getItem("data")).slice(1, -1);

  const downloadTrack = () => {
    try {
      fetch(`https:${url}?${audio_token}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${data.track}.mp3`;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const addPlaylist = () => {
    const allStarTracks = JSON.parse(localStorage.getItem("stars") || "[]");
    // const allStarTracks = [];
    if (
      allStarTracks.filter((item: { id: any }) => item.id === data.id)
        .length === 0
    ) {
      allStarTracks.push(data);
    }
    // allStarTracks.push(data);
    console.log("playlist", allStarTracks);
    localStorage.setItem("stars", JSON.stringify(allStarTracks));
    store.setRemoveStarTrack(true);
  };

  return (
    <>
      <div className="p-2 sm:p-4">
        <div className="flex justify-between">
          <div
            className="flex cursor-pointer"
            onClick={async () => {
              try {
                await store.setCurrentPlaying({
                  track: data?.track,
                  url: `https:${url}?${audio_token}`,
                  asset_url: data.asset_url,
                });
                store.setOnAir(false);
                store.setHistoryView(false);
              } catch (error) {
                console.error("Error setting current playing track:", error);
              }
            }}
          >
            <img
              className="w-[80px] sm:w-[120px] h-[80px] sm:h-[120px]"
              src={
                data.asset_url === null
                  ? "https://cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                  : data.asset_url + "?size=120x120&quality=90"
              }
              alt=""
            />
            <div className="pr-8 pl-4">
              <p className="text-white text-sm sm:text-xl">{data.track}</p>
              <p className="text-gray-500 text-sm">
                {Math.floor(data.length / 60)}:
                {data.length % 60 < 10
                  ? "0" + (data.length % 60)
                  : data.length % 60}
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              setViewItem(!viewItem);
              setTimeout(() => setViewItem(false), 5000);
            }}
            className="relative p-2 m-2 ml-6 w-2 cursor-pointer"
          >
            <svg width="3" height="18" viewBox="0 0 4 24" fill="none">
              <path
                d="M4 11.6241C4 10.5314 3.10457 9.64562 2 9.64562C0.89543 9.64562 -1.34244e-07 10.5314 -8.64816e-08 11.6241C-3.87191e-08 12.7168 0.895431 13.6026 2 13.6026C3.10457 13.6026 4 12.7168 4 11.6241Z"
                fill="white"
              />
              <path
                d="M4 1.97846C4 0.885786 3.10457 -4.90408e-06 2 -4.85579e-06C0.89543 -4.80751e-06 -1.34244e-07 0.885786 -8.64816e-08 1.97846C-3.87191e-08 3.07114 0.895431 3.95693 2 3.95693C3.10457 3.95693 4 3.07114 4 1.97846Z"
                fill="white"
              />
              <path
                d="M4 21.0215C4 19.9289 3.10457 19.0431 2 19.0431C0.89543 19.0431 -1.34244e-07 19.9289 -8.64816e-08 21.0215C-3.87191e-08 22.1142 0.895431 23 2 23C3.10457 23 4 22.1142 4 21.0215Z"
                fill="white"
              />
            </svg>
            <div className="absolute top-0 right-6 opacity-80">
              {viewItem && (
                <div className="w-[200px] p-4 bg-black cursor-pointer">
                  <div
                    onClick={() => downloadTrack()}
                    className="text-white text-xl pb-2"
                  >
                    <div className="flex items-center">
                      <svg
                        className="mr-2"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M14 9V13.0003H2V9H0V15.0181H3.3536H16V11.4818V9H14Z"
                          fill="white"
                        />
                        <path
                          d="M6.33233 9.81408L7.99982 11.4819L10.9188 8.56259L13.004 6.47764H13.0026H9V0.492188H7V6.47764H2.99561L6.33233 9.81408Z"
                          fill="white"
                        />
                      </svg>
                      Скачать
                    </div>
                  </div>
                  <div
                    onClick={() => addPlaylist()}
                    className="text-white text-xl pb-2"
                  >
                    <div className="flex items-center">
                      <svg
                        className="mr-2"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                          fill="white"
                        />
                      </svg>
                      В избранные
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default CardTrackOffline;
