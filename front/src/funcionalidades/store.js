import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import rootReducer from './rootreducer';
import rootSaga from './rootsaga';
import persistreducer from './persistreducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistreducer(rootReducer),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };