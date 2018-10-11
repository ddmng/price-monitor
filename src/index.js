import { app, h } from "hyperapp";

console.log("starting");
import * as firebase from "./fx/firebase";

import { Connect, ToFirebase, FromFirebase } from "./backend";

const blankState = {
  status: "idle",
  errors: {
    firebase: "",
    others: ""
  },
  appname: "pricemonitor-ha",
  firebase: "not_connected",
  data: []
};

const Products = ({ state }) => (
  <div>
    <div>Products</div>
    {state.data.map(product => (
      <div>
        <div>{product.name}</div>
        {Object.keys(product.prices).map(date => (
          <div>
            <div>date: {date}</div>
            <div>price: {product.prices[date].current}</div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

app({
  init: blankState,
  view: state => (
    <div>
      <div>Status {state.status}</div>
      <div>Errors {state.firebase}</div>
      <button onClick={Connect}>Connect</button>
      <button onClick={FromFirebase}>Load</button>

      <Products state={state} />
    </div>
  ),
  container: document.getElementById("app"),
  subscriptions: state => [console.log(state)]
});

console.log("app instantiated");
