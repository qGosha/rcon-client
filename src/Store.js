import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import { user } from "src/reducers/User";
import { auth } from "src/reducers/Auth";
import { orders } from "src/reducers/Orders";

import { rootEpic } from "src/epics/index";

const epicMiddleWare = createEpicMiddleware();

const reducer = combineReducers({
  user,
  auth,
  orders
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(epicMiddleWare))
);

epicMiddleWare.run(rootEpic);
