import { createStore, combineReducers } from 'redux';
import { navageData, activeKey, appStatus } from './reducer';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'

const rootReducer = combineReducers({
    navageData,
    activeKey,
    appStatus,
});
const persistConfig = {
    key: 'root',
    storage: storageSession,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);
export const persistor = persistStore(store)
export default store;