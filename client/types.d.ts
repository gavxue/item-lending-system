export interface Alert {
    message: string,
    forUser?: boolean
}

export interface Status {
    status: 'none' | 'success' | 'error',
    message: string,
    user?: boolean
}

export interface LoadingStatus {
    loading: boolean,
    message: string
}

export interface FormData {
    name: string,
    email: string,
    item: string
}

export interface Data {
    id: number,
    item: string,
    name: string,
    email: string,
    date_load: string,
    date_return: string
}