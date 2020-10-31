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