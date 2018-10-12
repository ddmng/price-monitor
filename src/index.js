import { app, h } from "hyperapp";
import { Time } from "hyperapp-fx";

import * as Highcharts from "highcharts";

import { Connect, FromFirebase } from "./backend";

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


const makeId = name => name.replace(" ", "_");

const prices = product =>
  Object.keys(product.prices).map(date => ({
    date,
    original: ((product.prices[date].original)),
    current: ((product.prices[date].current))
  }));

const PriceChart = ({ state, product }) => {
  setTimeout(
    () =>
      Highcharts.chart(makeId(product.name), {
        title: {
          text: product.name
        },
        series: [
          {
            name: "Current price",
            data: Object.keys(product.prices).map(date =>
              ((product.prices[date].current))
            )
          },
          {
            name: "List price",
            data: Object.keys(product.prices).map(date =>
              ((product.prices[date].original))
            )
          }
        ],
        xAxis: {
          categories: Object.keys(product.prices)
        }
      }),
    1000
  );
};

const Prices = ({ state, product }) => (
  <div>
    <div>{product.name}</div>
    <div>
      {prices(product).map(p => (
        <div>
          <div>Original price: {p.original}</div>
          <div>Current price: {p.current}</div>
        </div>
      ))}
    </div>
  </div>
);

const Products = ({ state }) => (
  <div>
    <div>Products</div>
    {state.data.map(product => (
      <div>
        <Prices state={state} product={product} />
      </div>
    ))}
  </div>
);

document.body.innerHTML = "";

app({
  init: blankState,
  view: state => (
    <div>
      <div>Status {state.status}</div>
      <div>Errors {state.firebase}</div>
      <Products state={state} />
    </div>
  ),
  container: document.body,
  subscriptions: state => [
    console.log(state),
    Time({ after: 10, action: Connect }),
    state.firebase == "connected" &&
      Time({ every: 10000, action: FromFirebase })
  ]
});

console.log("app instantiated");
