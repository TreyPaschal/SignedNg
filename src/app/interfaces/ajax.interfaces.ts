export interface AjaxResponse<T> {
    success : boolean,
    errorMessage? : string,
    data : T
}

export interface DataPoint{
    artistId : string,
    aci: string,
    timestamp: string
}

export interface Album {
    album_group: string;
    album_type: string;
    artists?: (ArtistsEntity)[] | null;
    available_markets?: (string)[] | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images?: (Image)[] | null;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  export interface ArtistsEntity {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  export interface ExternalUrls {
    spotify: string;
  }
  export interface ImagesEntity {
    height: number;
    url: string;
    width: number;
  }
  
export interface Followers {
    href?: any;
    total: number;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

export interface Item {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface Artists {
    href: string;
    items: Item[];
    limit: number;
    next?: any;
    offset: number;
    previous?: any;
    total: number;
}

export interface ArtistResults {
    artists: Artists;
}