import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import hotSauces from "./hotSauces";
import singleHotSauce from "./singleHotSauce";
import customers from "./customers";
import singleCustomer from "./singleCustomer";
import cart from "./cart";

const reducer = combineReducers({
  auth,
  singleHotSauce,
  hotSauces,
  customers,
  singleCustomer,
  cart,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
