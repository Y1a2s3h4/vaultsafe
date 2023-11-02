import { configureStore } from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import tabHandlerReducer from "../slices/tabs.slices";

const store = configureStore({
  reducer: {
    tabHandler: tabHandlerReducer,
  },
});
// export const makeStore = () =>
// configureStore({
//   reducer: {
//     tabHandler: tabHandlerReducer,
//   },
//   devTools: true,
// });
// type AppStore = ReturnType<typeof makeStore>;
// export default createWrapper<AppStore>(makeStore);
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

export default store
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;