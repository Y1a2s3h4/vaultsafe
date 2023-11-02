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
export interface TabsDataTypes {
  tabsList: string;
  statusCode: number;
  _id: string;
  urlName: string;
  pswd: string;
}

export interface UpdateTabDataApi {
  urlName: string;
  tabsList: string;
  _id: string;
}

export interface DeleteTabApi {
  tabId: string;
  _id: string;
}

export interface AddTabsDataApi {
  urlName: string;
  pswd: string;
  tabsList: string;
}

export interface VerifyUrlApi {
  urlName: string;
  pswd: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
export interface SubMenuPropsTypes {
  title: string;
  location: string;
  handleSave: () => void;
  disableSave: boolean;
  params: {
    name: string;
  };
}
export interface TabsButtonsTypes {
  handleAddNewTab: () => void;
  tabsList: Tab[];
  toggleTab: number;
  handleDeleteTab: (idx: number) => void;
  setToggleTab: React.Dispatch<React.SetStateAction<number>>;
}
export interface TextAreaPropsTypes {
  handleAddCurrTabData: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => void;
  tabs: TabsDataState;
  toggleTab: number;
  setDisableSave: React.Dispatch<React.SetStateAction<boolean>>;
  disableSave: boolean;
}
