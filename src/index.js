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
    original: product.prices[date].original,
    current: product.prices[date].current
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
            data: Object.keys(product.prices).map(
              date => product.prices[date].current
            )
          },
          {
            name: "List price",
            data: Object.keys(product.prices).map(
              date => product.prices[date].original
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
  <div class="product">
    <div class="name">{product.name}</div>
    {prices(product)
      .slice(-1)
      .map(p => (
        <div class="prices">
          <div class="price">Date: {p.date}</div>
          <div class="price">Original price: {p.original}</div>
          <div class="price">Current price: {p.current}</div>
        </div>
      ))}
  </div>
);

const Spinner = () => (
  <div class="ontop">
    <div class="lds-grid">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

const Products = ({ state }) => (
  <div class="container">
    {state.status == "fetching" && <Spinner />}

    {state.data.map(product => (
      <Prices state={state} product={product} />
    ))}
  </div>
);

document.body.innerHTML = "";

app({
  init: blankState,
  view: state => <Products state={state} />,
  container: document.body,
  subscriptions: state => [
    console.log(state),
    Time({ after: 10, action: Connect }),
    state.firebase == "connected" &&
      state.status != "fetching" &&
      Time({ every: 10000, action: FromFirebase })
  ]
});

console.log("app instantiated");
