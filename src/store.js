import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./redux/rootReducer";
import rootSaga from "./redux/sagas";

const middleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(middleWare));

export default store;

middleWare.run(rootSaga);
