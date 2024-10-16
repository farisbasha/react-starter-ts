import { homeReducers } from './home';

import { authReducers } from './auth';

import { sharedReducers } from './shared';

import { configureStore } from "@reduxjs/toolkit"


const reducers = {
  ...homeReducers,
  ...authReducers,
  ...sharedReducers,}

export const store = configureStore({
    reducer: {
      ...reducers
    },
  })
  
export type RootState = ReturnType<typeof store.getState>
  
export type AppDispatch = typeof store.dispatch