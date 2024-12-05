import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth-slice';
import homeReducer from './slice/home-slice'



export type AppState = ReturnType<typeof appReducer>;

const appReducer = combineReducers({
  auth: authReducer,
  home: homeReducer

});


const rootReducer = (state: AppState | undefined, action: any) => {
  if (action.type === 'RESET_STORE') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});