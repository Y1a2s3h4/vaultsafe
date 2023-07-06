import { configureStore } from "@reduxjs/toolkit";
import tabHandlerReducer from "../slices/tabs.slices";

const store = configureStore({
  reducer: {
    tabHandler: tabHandlerReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
