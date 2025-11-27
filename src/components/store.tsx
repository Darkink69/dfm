import { makeAutoObservable, observable, action, computed } from "mobx";

interface CurrentPlaying {
  track: string;
  url: string;
  asset_url: string;
}

interface FavoriteChannels {
  currentSite: number;
  channels_id: number[];
}

interface Options {
  shuffle: number;
  favChannels: number;
}

class Store {
  // Site configuration
  @observable sites = [
    "di",
    "rockradio",
    "radiotunes",
    "jazzradio",
    "classicalradio",
    "zenradio",
  ];
  
  @observable siteName = ["Electronic", "Rock", "Tunes", "Jazz", "Classical", "Zen"];
  @observable network_ids = [1, 13, 2, 12, 15, 16];
  
  // Current session data
  @observable currentSite: number = this.getStoredValue("currentSite", 0);
  @observable channel_id: number = this.getStoredValue("channel_id", 69);
  @observable channel_name: string = localStorage.getItem("channel_name") || "Classic EuroDance";
  
  // Configuration
  @observable onlyChannelIds: string[] = [];
  @observable premium = [
    "615841863e5533f627fa26bd6e921776",
    "055e654b1236dd686b31094e1c5495f2",
  ];
  
  // Data storage
  @observable allTokens: any[] = [];
  @observable dataChannels: any[] = [];
  @observable allStationsData: any[] = [{}];
  @observable allChannelTracks: any[] = [];
  @observable allStationsDataLoaded = false;
  @observable removeStarTrack = false;
  @observable bitratePremium = this.getStoredValue("premium", false);
  
  @observable message: string = "";
  
  // Options
  @observable options: Options = this.getStoredObject("options", { shuffle: 2, favChannels: 1 });
  @observable countPlayingTracks = 0;
  @observable minMax = [
    [0, 0],
    [7, 11],
    [2, 6],
    [1, 1],
  ];
  
  // View states
  @observable bigPlayer = true;
  @observable allFavChannelsView = true;
  @observable allChannelsView = false;
  @observable allTracksOfflineView = false;
  @observable allStarTracksView = false;
  @observable searchView = false;
  @observable menuView = false;
  @observable historyView = false;
  @observable serverError = false;
  
  @observable spinView = "";
  
  // Current playing track
  @observable currentPlaying: CurrentPlaying = {
    track: "",
    url: "",
    asset_url: "",
  };
  
  // Station data
  @observable allStationsNames: any[] = [{}];
  @observable allStationIds: number[] = [];
  @observable favNamesSites: any[] = [];
  
  // Favorites
  @observable favoriteChannels: FavoriteChannels = {
    currentSite: 0,
    channels_id: this.getStoredObject("favoriteChannels", []),
  };
  
  // Status flags
  @observable onAir = false;
  @observable switchChannel = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Helper methods for localStorage
  private getStoredValue(key: string, defaultValue: any): any {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.warn(`Error parsing localStorage item "${key}":`, e);
      return defaultValue;
    }
  }

  private getStoredObject<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.warn(`Error parsing localStorage object "${key}":`, e);
      return defaultValue;
    }
  }

  private setStoredValue(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error storing value in localStorage for key "${key}":`, e);
    }
  }

  // Actions
  @action setAllTokens(allTokens: any[]) {
    this.allTokens = allTokens;
  }

  @action setAllChannelTracks(allChannelTracks: any[]) {
    this.allChannelTracks = allChannelTracks;
  }

  @action setCurrentPlaying(currentPlaying: CurrentPlaying) {
    this.currentPlaying = currentPlaying;
  }

  @action setCurrentSite(currentSite: number) {
    this.currentSite = currentSite;
    this.switchChannel = false;
    this.setStoredValue("currentSite", currentSite);
  }

  @action setChannel_id(channel_id: number) {
    this.channel_id = channel_id;
    this.setStoredValue("channel_id", channel_id);
  }

  @action setAllStationsData(data: any[]) {
    this.allStationsData = data;
  }

  @action setChannel_name(channel_name: string) {
    this.channel_name = channel_name;
    console.log(channel_name); // Consider removing this in production
    localStorage.setItem("channel_name", channel_name);
  }

  @action setAllStationsNames(allNames: { id: number; name: string }[]) {
    this.allStationsNames = allNames;
  }

  @action setAllStationIds(ids: { id: number }[]) {
    this.allStationIds = ids.map(item => item.id);
  }

  @action setAllStationsDataLoaded(loaded: boolean) {
    this.allStationsDataLoaded = loaded;
  }

  @action setSizePlayer(size: boolean) {
    this.bigPlayer = size;
  }

  @action setSwitchChannel(view: boolean) {
    this.switchChannel = view;
  }

  @action setAllFavChannelsView(view: boolean) {
    this.allFavChannelsView = view;
  }

  @action setAllChannelsView(view: boolean) {
    this.allChannelsView = view;
  }

  @action setAllTracksOfflineView(view: boolean) {
    this.allTracksOfflineView = view;
  }

  @action setAllStarTracksView(view: boolean) {
    this.allStarTracksView = view;
  }

  @action setOnAir(air: boolean) {
    this.onAir = air;
  }

  @action setSpinView(view: string) {
    this.spinView = view;
  }

  @action setFavNamesSites(sites: any[]) {
    this.favNamesSites = sites;
  }

  @action setRemoveStarTrack(remove: boolean) {
    this.removeStarTrack = remove;
  }

  @action setFavoriteChannels(id: number) {
    const channels = this.favoriteChannels.channels_id;
    const index = channels.indexOf(id);
    
    if (index !== -1) {
      channels.splice(index, 1);
    } else {
      channels.push(id);
    }
    
    this.setStoredValue("favoriteChannels", channels);
    this.allFavChannelsView = false;
  }

  @action setOptions(shuffle: number) {
    this.options.shuffle = shuffle;
    this.setStoredValue("options", this.options);
  }

  @action setCountPlayingTracks(count: number) {
    this.countPlayingTracks = count;
  }

  @action setSearchView(view: boolean) {
    this.searchView = view;
  }

  @action setMenuView(view: boolean) {
    this.menuView = view;
  }

  @action setHistoryView(view: boolean) {
    this.historyView = view;
  }

  @action setBitratePremium(bit: boolean) {
    this.bitratePremium = bit;
    localStorage.setItem("premium", String(bit));
    // Consider using a more elegant approach than location.reload()
    location.reload();
  }

  @action setServerError(err: boolean) {
    this.serverError = err;
  }

  @action setMessage(txt: string) {
    this.message = txt;
  }

  // Computed values
  @computed get isCurrentChannelFavorite(): boolean {
    return this.favoriteChannels.channels_id.includes(this.channel_id);
  }

  @computed get currentSiteName(): string {
    return this.siteName[this.currentSite] || this.siteName[0];
  }

  @computed get currentNetworkId(): number {
    return this.network_ids[this.currentSite] || this.network_ids[0];
  }

  @computed get favoriteChannelsCount(): number {
    return this.favoriteChannels.channels_id.length;
  }

  // Utility methods
  clearAllData(): void {
    this.allTokens = [];
    this.allStationsData = [{}];
    this.allChannelTracks = [];
    this.allStationsDataLoaded = false;
    this.countPlayingTracks = 0;
    this.currentPlaying = {
      track: "",
      url: "",
      asset_url: "",
    };
  }

  resetToDefaults(): void {
    this.clearAllData();
    this.currentSite = 0;
    this.channel_id = 69;
    this.channel_name = "Classic EuroDance";
    this.bitratePremium = false;
    this.favoriteChannels.channels_id = [];
    
    // Clear localStorage
    localStorage.removeItem("currentSite");
    localStorage.removeItem("channel_id");
    localStorage.removeItem("channel_name");
    localStorage.removeItem("premium");
    localStorage.removeItem("favoriteChannels");
    localStorage.removeItem("options");
  }
}

export default new Store();
