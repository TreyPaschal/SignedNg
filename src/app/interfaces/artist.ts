//declare module Artist {

    export interface ExternalUrls {
        spotify: string;
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

//}