import { app, h } from "hyperapp";

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

const parsePrice = (priceString) => 
  (priceString && priceString.split(' ').length)?
    priceString.split(' ')[1]:""

const Chart = ({state}) => {
  if (state.data.length) {
    let product = state.data[1]
    Highcharts.chart("chart", {
      title: {
        text: state.data[1].name
      },
      series: [{
        name: 'price',
        data: Object.keys(product.prices).map(date => parseInt(parsePrice(product.prices[date].current)))
      }],
      xAxis: {
        categories: Object.keys(product.prices)
      },
    });
  }
}

const makeId = (name) => name.replace(' ', '_')

const PriceChart = ({state, product}) => {
    setTimeout(() => Highcharts.chart(makeId(product.name), {
      title: {
        text: product.name
      },
      series: [{
        name: 'price',
        data: Object.keys(product.prices).map(date => parseInt(parsePrice(product.prices[date].current)))
      }],
      xAxis: {
        categories: Object.keys(product.prices)
      },
    }), 1000);
}
const Products = ({ state }) => (
  <div>
    <div>Products</div>
    {state.data.map(product => (
      <div>
        <div>{product.name}</div>
        <div id={makeId(product.name)}></div>
        <PriceChart state={state} product={product} />
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
