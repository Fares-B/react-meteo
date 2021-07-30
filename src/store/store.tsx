import { combineReducers, createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import themeReducer from './reducers/theme';
import searchReducer from "./reducers/search";
import citiesReducer from "./reducers/cities";

// const rootReducer = combineReducers({ theme: themeReducer, search: searchReducer });

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme'],
};

const citiesPersistConfig = {
    key: 'cities',
    storage: storage,
}

const rootReducer = combineReducers({
    cities: persistReducer(citiesPersistConfig, citiesReducer),
    theme: themeReducer,
    search: searchReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const  store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export default store;
