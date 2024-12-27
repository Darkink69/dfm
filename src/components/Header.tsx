import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
import store from "./store";

const Header = observer(() => {
  const setSiteData = (site: number, id: number, name: string) => {
    store.setCurrentSite(site);
    store.setChannel_id(id);
    store.setAllChannelsView(false);
    store.setAllTracksOfflineView(false);
    store.setSizePlayer(true);
    store.setChannel_name(name);
  };

  return (
    <>
      <div className="fixed bg-black z-50 sm:h-[60px] h-[60px] w-full sm:shadow-md">
        <div className="container mx-auto flex items-center justify-between p-1 pl-4 pr-3">
          <div onClick={() => location.reload()}>
            <svg width="28" height="21" viewBox="0 0 28 21" fill="none">
              <path
                d="M0.00976562 6.67023H0.619766V2.93023C0.619766 2.54023 0.699766 2.18023 0.849766 1.85023C0.999766 1.52023 1.21977 1.24023 1.47977 1.00023C1.73977 0.760234 2.04977 0.580234 2.39977 0.440234C2.74977 0.310234 3.10977 0.240234 3.49977 0.240234H9.92977C10.3098 0.240234 10.6798 0.300234 11.0298 0.430234C11.3798 0.560234 11.6998 0.740234 11.9698 0.970234C12.2398 1.20023 12.4698 1.48023 12.6298 1.81023C12.7898 2.13023 12.8798 2.49023 12.8798 2.88023V6.65023H13.7998V9.00023H0.00976562V6.65023V6.67023ZM10.6898 2.51023H2.70977V6.67023H10.6898V2.51023Z"
                fill="#26A69A"
              />
              <path
                d="M27.3698 9.02H25.1298V2.4L19.0898 8.29C18.8098 8.59 18.5098 8.81 18.1998 8.95C17.8798 9.09 17.5598 9.15 17.2198 9.15C16.8798 9.15 16.5598 9.08 16.2798 8.95C16.0098 8.82 15.7798 8.64 15.5898 8.42C15.3998 8.2 15.2598 7.93 15.1598 7.63C15.0598 7.33 15.0098 7.01 15.0098 6.67V0.2H17.2698V6.8L23.2998 0.86C23.8898 0.28 24.5098 0 25.1498 0C25.4398 0 25.7098 0.04 25.9798 0.13C26.2498 0.22 26.4798 0.34 26.6898 0.51C26.8998 0.68 27.0598 0.9 27.1898 1.17C27.3098 1.44 27.3798 1.76 27.3798 2.12V9.02H27.3698Z"
                fill="#26A69A"
              />
              <path
                d="M7.91 11.05V12.47H10.75C11.72 12.47 12.44 12.64 12.91 12.97C13.38 13.31 13.62 13.78 13.62 14.39V16.66C13.62 16.89 13.56 17.12 13.43 17.34C13.31 17.56 13.12 17.76 12.86 17.94C12.6 18.12 12.28 18.26 11.9 18.36C11.52 18.46 11.06 18.52 10.54 18.52H7.9V19.96H5.51V18.52H3.07C2.74 18.52 2.4 18.49 2.04 18.42C1.68 18.35 1.35 18.24 1.05 18.09C0.75 17.94 0.5 17.74 0.3 17.48C0.1 17.23 0 16.92 0 16.56V14.24C0 13.98 0.06 13.74 0.17 13.52C0.28 13.3 0.44 13.12 0.64 12.96C0.84 12.8 1.09 12.68 1.38 12.59C1.67 12.5 1.99 12.46 2.34 12.46H5.51V11.04H7.9L7.91 11.05ZM1.91 14.25V16.63H5.52V14.25H1.91ZM7.91 14.25V16.63H11.62V14.25H7.91Z"
                fill="#E7E7E7"
              />
              <path
                d="M14.8205 20.0199V13.3699C14.8205 13.0699 14.8805 12.7799 14.9905 12.5099C15.1005 12.2399 15.2505 12.0099 15.4505 11.8099C15.6405 11.6099 15.8705 11.4599 16.1305 11.3399C16.3905 11.2199 16.6805 11.1699 16.9805 11.1699C17.2705 11.1699 17.5305 11.2199 17.7805 11.3199C18.0205 11.4199 18.2505 11.5599 18.4505 11.7299C18.6505 11.8999 18.8305 12.0999 18.9805 12.3399C19.1305 12.5699 19.2605 12.8199 19.3605 13.0799L21.3605 18.0099L23.5605 12.8099C23.7405 12.3099 24.0205 11.9099 24.3905 11.6099C24.7605 11.3099 25.2105 11.1699 25.7405 11.1699C26.0805 11.1699 26.3805 11.2399 26.6505 11.3699C26.9205 11.5099 27.1505 11.6899 27.3505 11.9199C27.5405 12.1499 27.6905 12.4099 27.7905 12.7099C27.8905 13.0099 27.9505 13.3099 27.9505 13.6299V20.0099H25.8005V13.5099L23.6805 18.1499C23.5205 18.4999 23.3705 18.8099 23.2405 19.0599C23.1005 19.3199 22.9505 19.5299 22.7905 19.7099C22.6305 19.8899 22.4405 20.0199 22.2205 20.0999C22.0005 20.1799 21.7305 20.2299 21.4005 20.2299C21.1105 20.2299 20.8505 20.1699 20.6205 20.0599C20.3905 19.9399 20.1805 19.7899 19.9805 19.5999C19.7805 19.4099 19.6205 19.1899 19.4605 18.9299C19.3105 18.6799 19.1705 18.4199 19.0505 18.1399L16.9605 13.5899V20.0099H14.8105L14.8205 20.0199Z"
                fill="#E7E7E7"
              />
            </svg>
          </div>

          <div className="flex items-center">
            <p
              onClick={() =>
                store.setSwitchChannel(store.switchChannel ? false : true)
              }
              className="text-white text-xl font-bold cursor-pointer"
            >
              {store.siteName[store.currentSite]}
            </p>
            <svg
              className={store.switchChannel ? " rotate-180 m-2" : "m-2"}
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
            >
              <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between w-[90px]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M20.2588 17.6985L20.0314 18.0396L20.3213 18.3294L26.7952 24.8033L27.277 25.2851L26.7952 25.7669L25.751 26.8111L25.2692 27.2929L24.7874 26.8111L18.3135 20.3372L18.0014 20.0251L17.653 20.296C15.8773 21.6771 13.6944 22.2791 11.486 22.2791C5.49705 22.2791 0.5 17.282 0.5 11.2931C0.5 5.29442 5.50281 0.316583 11.2608 0.505206L11.269 0.505474H11.2772C17.2655 0.505474 22.2632 5.51238 22.2632 11.5019C22.2632 13.682 21.4683 15.8843 20.2588 17.6985ZM3.12331 11.3662C3.12331 15.913 6.81385 19.6036 11.3607 19.6036C15.9075 19.6036 19.5981 15.913 19.5981 11.3662C19.5981 6.81933 15.9075 3.12879 11.3607 3.12879C6.81385 3.12879 3.12331 6.81933 3.12331 11.3662Z"
                fill="#808080"
                stroke="#191919"
              />
            </svg>

            <svg
              className=""
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle
                cx="25"
                cy="25"
                r="25"
                fill="url(#paint0_linear_3409_4)"
              />
              <rect
                x="16.428"
                y="17.857"
                width="17.1429"
                height="1.80952"
                fill="white"
              />
              <rect
                x="16.428"
                y="23.2854"
                width="17.1429"
                height="1.80952"
                fill="white"
              />
              <rect
                x="16.428"
                y="29.619"
                width="17.1429"
                height="1.80952"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3409_4"
                  x1="25"
                  y1="0"
                  x2="25"
                  y2="50"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#26A69A" />
                  <stop offset="1" stopColor="#05635A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {store.switchChannel ? (
          <div className="w-full h-[200px] bg-black opacity-90 animate-right">
            <div className="grid grid-cols-2 justify-center p-8 text-2xl font-bold pb-4 ">
              <div
                onClick={() => setSiteData(0, 69, "Classic EuroDance")}
                className={
                  store.currentSite === 0
                    ? "text-sky-400 pb-4"
                    : "text-white pb-4"
                }
              >
                Electronic
              </div>
              <div
                onClick={() => {
                  setSiteData(1, 143, "Classic Rock");
                }}
                className={
                  store.currentSite === 1
                    ? "text-sky-400 pb-4"
                    : "text-white pb-4"
                }
              >
                Rock
              </div>
              <div
                onClick={() => {
                  setSiteData(2, 38, "Classic Hip-Hop");
                }}
                className={
                  store.currentSite === 2
                    ? "text-sky-400 pb-4"
                    : "text-white pb-4"
                }
              >
                Tunes
              </div>
              <div
                onClick={() => setSiteData(3, 79, "Modern Vocal Jazz")}
                className={
                  store.currentSite === 3
                    ? "text-sky-400 pb-4"
                    : "text-white pb-4"
                }
              >
                Jazz
              </div>
              <div
                onClick={() => setSiteData(4, 398, "Vivaldi")}
                className={
                  store.currentSite === 4
                    ? "text-sky-400 pb-4"
                    : "text-white pb-4"
                }
              >
                Classical
              </div>
              <div
                onClick={() => setSiteData(5, 449, "Meditation")}
                className={
                  store.currentSite === 5
                    ? "text-sky-400 pb-4"
                    : "text-white pb-4"
                }
              >
                Zen
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
});

export default Header;
