'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';
import mySessionReducer from '../slice/my.session.slice'
import loginReducer from '../slice/auth.slice'
import otpReducer from '../slice/socket.slice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','login'], 
};

const rootReducer = combineReducers({
  myfeedback: mySessionReducer,
  login:loginReducer,
  code:otpReducer
});

  export type RootState = ReturnType<typeof rootReducer>;

  

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const makeStore = () => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  };

  export type AppStore = ReturnType<typeof makeStore>['store'];
  export type AppDispatch = AppStore['dispatch'];