export interface Tab {
  _id?: string;
  tabNo: number;
  tabDetail: string;
}

export interface TabsDataState {
  isLoading: boolean;
  isError: boolean;
  data: {
    tabsList: Tab[];
    statusCode?: number;
    _id?: string;
    urlName?: string;
    pswd?: string;
  };
}

export interface UpdateTabDataApi {
  tabsList: Tab[];
  _id: string;
}

export interface DeleteTabApi {
  tabId: string;
  _id: string;
}

export interface AddTabsDataApi {
  urlName: string;
  pswd: string;
  tabsList: Tab[];
}

export interface VerifyUrlApi {
  urlName: string;
  pswd: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}