import { makeAutoObservable } from "mobx";

class Store {
  sites = [
    "di",
    "rockradio",
    "radiotunes",
    "jazzradio",
    "classicalradio",
    "zenradio",
  ];
  siteName = ["Electronic", "Rock", "Tunes", "Jazz", "Classical", "Zen"];
  network_ids = [1, 13, 2, 12, 15, 16];
  currentSite = JSON.parse(localStorage.getItem("currentSite") || "0") || 0;
  channel_id: number =
    JSON.parse(localStorage.getItem("channel_id") || "69") || 69;
  channel_name = localStorage.getItem("channel_name") || "Classic EuroDance";
  onlyChannelIds: any = [];
  allTokens: any = [
    "7e938c7250620a6fa561a93e733224a3",
    "6c9ef0a46a96b4ae5021a44d1feaee6e",
  ];

  allStationsData = [{}];
  allStationsDataLoaded = false;

  shuffle = false;
  bigPlayer = true;
  allFavChannelsView = true;
  allChannelsView = false;
  allTracksOfflineView = false;
  allStarTracksView = false;
  searchView = false;
  menuView = false;
  serverError = false;

  spinView = "";

  currentPlaying = {
    track: "",
    url: "",
    asset_url: "",
  };
  allStationsNames = [{}];
  allStationIds: any = [];

  favNamesSites: any = [];

  favoriteChannels = {
    currentSite: 0,
    channels_id: JSON.parse(localStorage.getItem("favoriteChannels") || "[]"),
  };

  // fav2: any =
  //   JSON.parse(localStorage.getItem("favoriteChannels2") || "[]") || [];

  // otherSite = false;

  onAir = false;
  switchChannel = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAllTokens(allTokens: any) {
    this.allTokens = allTokens;
  }

  setCurrentPlaying(currentPlaying: {
    track: string;
    url: string;
    asset_url: string;
  }) {
    this.currentPlaying = currentPlaying;
  }

  setChannel_id(channel_id: number) {
    this.channel_id = channel_id;
    localStorage.setItem("channel_id", JSON.stringify(channel_id));
  }

  setAllStationsData(data: any) {
    this.allStationsData = data;
    // console.log(this.allStationsData);
  }

  setChannel_name(channel_name: string) {
    this.channel_name = channel_name;
    console.log(channel_name);
    localStorage.setItem("channel_name", channel_name);
  }

  setAllStationsNames(allNames: { id: number; name: string }[]) {
    this.allStationsNames = allNames;
  }

  setAllStationIds(ids: { id: number }[]) {
    this.allStationIds = ids;
    // console.log(this.allStationIds);
  }

  setAllStationsDataLoaded(loaded: boolean) {
    this.allStationsDataLoaded = loaded;
  }

  setSizePlayer(size: boolean) {
    this.bigPlayer = size;
  }

  setCurrentSite(currentSite: number) {
    this.currentSite = currentSite;
    this.switchChannel = false;
    localStorage.setItem("currentSite", JSON.stringify(currentSite));
  }

  setSwitchChannel(view: boolean) {
    this.switchChannel = view;
  }

  setAllFavChannelsView(view: boolean) {
    this.allFavChannelsView = view;
  }

  setAllChannelsView(view: boolean) {
    this.allChannelsView = view;
  }

  setAllTracksOfflineView(view: boolean) {
    this.allTracksOfflineView = view;
  }

  setAllStarTracksView(view: boolean) {
    this.allStarTracksView = view;
  }

  setOnAir(air: boolean) {
    this.onAir = air;
  }

  setSpinView(view: string) {
    this.spinView = view;
  }

  setFavNamesSites(sites: any[]) {
    this.favNamesSites = sites;
  }

  // setfavoriteChannels2(id: any) {
  //   console.log(this.onlyChannelIds);
  //   console.log(id.channel_id, "IDD!!!!");
  //   if (this.onlyChannelIds.includes(id.channel_id)) {
  //     for (let i = 0, len = this.onlyChannelIds.length; i < len; i++) {
  //       if (this.onlyChannelIds[i] === id.channel_id) {
  //         console.log(this.onlyChannelIds[i], id.channel_id, "ifff");
  //         this.onlyChannelIds.splice(i, 1);
  //         // console.log(this.onlyChannelIds[i]);
  //         // let items = [{id: 1}, {id: 2}, {id: 3}];
  //         // До свидания, объекты с id: 2 👋
  //         // items = items.filter(item => item.id !== 2);
  //         this.fav2 = this.fav2.filter(
  //           (item: { channel_id: any }) =>
  //             item.channel_id !== this.onlyChannelIds[i]
  //         );
  //         // localStorage.setItem("favoriteChannels2", JSON.stringify(this.fav2));
  //         break;
  //       }
  //     }
  //   } else {
  //     // this.favoriteChannels.channels_id.push(id);
  //     console.log(id, "push");
  //     this.fav2.push(id);
  //     // localStorage.setItem("favoriteChannels2", JSON.stringify(this.fav2));
  //     this.fav2.map((item: any) => {
  //       this.onlyChannelIds.push(item.channel_id);
  //     });
  //   }
  //   // localStorage.setItem(
  //   //   "favoriteChannels",
  //   //   JSON.stringify(this.favoriteChannels.channels_id)
  //   // );
  //   this.allFavChannelsView = false;
  //   localStorage.setItem("favoriteChannels2", JSON.stringify(this.fav2));
  // }

  // setfavoriteChannelsAdd(x: any) {
  //   this.fav2.push(x);
  //   // localStorage.setItem("favoriteChannels2", JSON.stringify(this.fav2));
  //   this.fav2.map((item: any) => {
  //     this.onlyChannelIds.push(item.channel_id);
  //   });
  //   // console.log(this.fav2, "setfavoriteChannels2!!");
  // }
  setfavoriteChannels(id: number) {
    if (this.favoriteChannels.channels_id.includes(id)) {
      for (
        let i = 0, len = this.favoriteChannels.channels_id.length;
        i < len;
        i++
      ) {
        if (this.favoriteChannels.channels_id[i] === id) {
          this.favoriteChannels.channels_id.splice(i, 1);
          break;
        }
      }
    } else {
      this.favoriteChannels.channels_id.push(id);
    }
    localStorage.setItem(
      "favoriteChannels",
      JSON.stringify(this.favoriteChannels.channels_id)
    );
    this.allFavChannelsView = false;
  }

  // setOtherSite(site: boolean) {
  //   this.otherSite = site;
  // }

  setSearchView(view: boolean) {
    this.searchView = view;
  }

  setMenuView(view: boolean) {
    this.menuView = view;
  }

  setServerError(err: boolean) {
    this.serverError = err;
  }
}

export default new Store();
