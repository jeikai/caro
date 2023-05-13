import rootReducer from "./indexReducer";
import { applyMiddleware, compose, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'

const middleware = [thunk]
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);
const store = createStore (rootReducer, enhancer)

export default store