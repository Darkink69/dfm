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
        <div className="container mx-auto flex items-center justify-between p-1 pl-3 pr-3">
          <div onClick={() => location.reload()}>
            <svg width="35" height="36" viewBox="0 0 35 36" fill="none">
              <path
                d="M7.38867 11.6281C7.72551 9.27378 8.34246 7.08611 9.76427 5.13954C11.1223 3.27807 13.044 1.77471 15.1785 0.898934C19.9013 -1.037 25.4255 0.239441 28.9286 3.90565C32.4352 7.57187 33.3145 13.2201 31.1659 17.8082C29.0066 22.4176 24.0816 25.2754 19.0184 24.9385C16.2174 24.7506 13.5085 23.5841 11.4449 21.6871C10.4167 20.7405 9.54089 19.6342 8.87785 18.4039C8.65093 17.9819 7.97371 16.9679 8.0978 16.4857C8.15808 16.2446 8.72893 15.9786 8.92749 15.8368C9.25014 15.6134 9.56925 15.3475 9.91673 15.1596C10.5798 16.9501 11.374 18.5918 12.7781 19.932C14.1715 21.2617 15.9763 22.18 17.8555 22.5736C21.8514 23.4139 26.131 21.6162 28.3825 18.2301C30.7298 14.7022 30.7262 9.96874 28.2265 6.51172C25.6878 2.99797 21.1813 1.42369 17.001 2.62213C14.7849 3.2568 13.2071 4.60415 11.6576 6.24225C11.2641 6.66063 10.7429 7.07193 10.4699 7.5825C10.3351 7.8307 10.3812 8.11436 10.2607 8.34482C10.1472 8.55756 9.821 8.73839 9.64371 8.89085C9.22178 9.25251 8.68638 9.59999 8.34955 10.0467C7.99498 10.5148 7.77869 11.153 7.51277 11.6777C7.47022 11.6636 7.43122 11.6494 7.38867 11.6316V11.6281Z"
                fill="#C4C4C4"
              />
              <path
                d="M8.6024 11.1497C8.75841 10.8023 8.85414 10.5151 9.1378 10.2421C9.78665 9.61093 10.5312 9.00462 11.2439 8.44441C11.1978 8.28485 11.0099 8.19621 11.0276 8.01538C11.0454 7.81682 11.3397 7.55444 11.4602 7.41262C11.8254 6.9765 12.2367 6.55811 12.6941 6.22128C13.2472 5.81352 13.4387 6.22128 13.8535 6.64321C14.2861 7.08287 14.7258 7.51544 15.1725 7.93738C16.956 9.61802 18.938 11.0079 20.8527 12.5255C19.6259 14.0075 17.7998 15.0748 15.9951 15.6846C15.4916 15.8548 15.2541 16.0215 15.052 15.4932C14.8392 14.933 14.6407 14.3621 14.4669 13.7913C14.1585 12.7843 14.0911 11.4653 13.5131 10.5931C12.024 12.2879 10.5419 13.9579 8.63786 15.1989C6.93239 16.3087 5.50704 17.5993 4.45752 19.365C3.92922 20.255 3.62429 21.2159 3.17754 22.1413C2.78042 22.9603 1.44371 23.2724 0.702667 22.7866C0.344555 22.5561 -0.017102 22.1626 0.000626292 21.7158C0.0183546 21.1982 0.596297 20.5989 0.876405 20.1876C1.5359 19.2197 2.29821 18.3333 3.09599 17.4752C4.00013 16.5001 4.94682 15.5676 5.85806 14.5997C6.32963 14.0997 8.52794 11.3199 8.60595 11.1497H8.6024Z"
                fill="#569DE5"
              />
              <path
                d="M15.2937 7.06577C16.5985 6.20772 17.8288 5.53404 19.4208 5.43831C20.6263 5.36739 21.8354 5.59786 22.9239 6.12262C25.0832 7.16504 26.6008 9.2818 26.8809 11.6645C27.1645 14.0684 26.1576 16.5043 24.2606 18.0077C22.0162 19.7876 18.9422 20.011 16.4318 18.6601C15.3433 18.0715 14.4498 17.1886 13.8222 16.1249C13.4747 15.5363 13.184 14.891 13.0103 14.228C12.8968 13.7919 12.8294 13.3274 12.8152 12.8807C12.8011 12.4233 12.9783 12.3488 13.223 11.9871C13.5421 13.143 13.9286 14.2776 14.3009 15.4193C14.4143 15.7668 14.5278 16.3873 14.9001 16.5788C15.2547 16.7631 15.7759 16.4937 16.1198 16.3802C16.3999 16.288 16.5843 16.1852 16.8644 16.2987C17.0949 16.3909 17.3111 16.6284 17.5345 16.7525C17.9919 17.0113 18.4919 17.1922 19.0095 17.2844C19.9562 17.4475 20.9738 17.3269 21.8496 16.9333C25.6931 15.2208 25.5619 9.57255 21.7007 7.99473C20.6299 7.55507 19.3924 7.50543 18.2968 7.89545C17.8501 8.05501 17.18 8.66486 16.758 8.44857C16.5063 8.32093 16.2616 7.98409 16.0524 7.79617C15.7936 7.55861 15.5348 7.32814 15.2937 7.07286V7.06577Z"
                fill="#C4C4C4"
              />
              <path
                d="M19.1853 14.8901C20.1993 14.1986 21.0858 13.3938 21.8906 12.4329C20.8907 11.6777 19.898 10.9295 18.8945 10.1708C20.405 9.28082 22.2735 10.7168 22.3976 12.284C22.5288 13.9221 20.8376 15.5495 19.1853 14.8901Z"
                fill="#C4C4C4"
              />
              <path
                d="M2 28.8057H6.32071C6.63024 28.8057 6.92281 28.8594 7.20266 28.9714C7.48251 29.0834 7.72844 29.2357 7.94045 29.4327C8.15245 29.6298 8.32206 29.8672 8.44927 30.1449C8.57647 30.4226 8.64007 30.7272 8.64007 31.0676V33.7371C8.64007 34.0686 8.57647 34.3732 8.44502 34.6509C8.31782 34.9286 8.14397 35.166 7.92773 35.3675C7.71148 35.5691 7.46131 35.7259 7.18146 35.8333C6.89737 35.9453 6.6048 35.9991 6.29527 35.9991H2V28.8057ZM6.85921 30.6197H3.75542V34.2254H6.85921V30.6197Z"
                fill="#26A69A"
              />
              <path
                d="M9.74805 33.7861H11.9614V35.9995H9.74805V33.7861Z"
                fill="#C4C4C4"
              />
              <path
                d="M18.9349 28.8057V29.9511H21.2487C22.0379 29.9511 22.6209 30.0848 23.0065 30.3567C23.3921 30.6285 23.5805 31.0118 23.5805 31.5021V33.3339C23.5805 33.521 23.5311 33.7038 23.428 33.8865C23.3249 34.0692 23.1724 34.2297 22.9661 34.3723C22.7599 34.5149 22.4998 34.6264 22.1859 34.711C21.872 34.7957 21.5043 34.8358 21.0828 34.8358H18.9349V35.9991H16.9933V34.8358H15.0113C14.7423 34.8358 14.4643 34.8091 14.1728 34.7511C13.8813 34.6977 13.6123 34.6085 13.3657 34.4837C13.1235 34.3589 12.9172 34.1985 12.7558 33.9935C12.5944 33.7885 12.5137 33.5433 12.5137 33.2492V31.3773C12.5137 31.1634 12.5585 30.9717 12.6482 30.7934C12.7379 30.6196 12.8679 30.4681 13.0338 30.3433C13.1997 30.2185 13.4015 30.1204 13.6347 30.0491C13.8679 29.9778 14.128 29.9422 14.4149 29.9422H16.9933V28.8057H18.9349ZM14.0562 31.3951V33.316H16.9933V31.3951H14.0562ZM18.9349 31.3951V33.316H21.9527V31.3951H18.9349Z"
                fill="#868686"
              />
              <path
                d="M24.1372 35.8284V30.5515C24.1372 30.3109 24.1814 30.0833 24.2696 29.8689C24.3579 29.6545 24.4815 29.4707 24.636 29.3176C24.7905 29.1645 24.9714 29.0376 25.1833 28.9457C25.3951 28.8538 25.6202 28.8057 25.863 28.8057C26.0925 28.8057 26.3044 28.845 26.503 28.9238C26.6972 29.0026 26.8781 29.112 27.037 29.2476C27.1959 29.3832 27.3372 29.5451 27.4607 29.7289C27.5843 29.9127 27.6858 30.1096 27.7697 30.3196L29.3763 34.2357L31.133 30.114C31.2786 29.7158 31.5037 29.3964 31.7994 29.1601C32.0951 28.9238 32.4571 28.81 32.8808 28.81C33.15 28.81 33.3928 28.8625 33.609 28.9719C33.8253 29.0813 34.0107 29.2257 34.1652 29.4051C34.3196 29.5845 34.4388 29.7945 34.5227 30.0308C34.6065 30.2671 34.6463 30.5121 34.6463 30.7659V35.8328H32.9249V30.6653L31.2256 34.3495C31.0976 34.6295 30.9785 34.8702 30.8681 35.0715C30.7578 35.2727 30.6386 35.4478 30.5062 35.5878C30.3738 35.7278 30.2237 35.8284 30.0516 35.8984C29.8795 35.9641 29.6588 35.9991 29.3984 35.9991C29.1689 35.9991 28.9614 35.9509 28.776 35.8591C28.5907 35.7672 28.4185 35.6447 28.2685 35.4915C28.114 35.3384 27.9772 35.1633 27.8536 34.9621C27.73 34.7608 27.6241 34.5551 27.527 34.3364L25.8542 30.7265V35.8197H24.1328L24.1372 35.8284Z"
                fill="#868686"
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
          <div className="w-full h-[200px] bg-black opacity-90">
            <div className="grid grid-cols-2 justify-center p-8 text-2xl font-bold pb-4">
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
