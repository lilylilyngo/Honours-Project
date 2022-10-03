import fetch from "isomorphic-fetch";
const cors = require("cors");

function getYesterdaysDate() {
  var date = new Date();
  date.setDate(date.getDate() - 2);

  console.log(
    date.getFullYear() +
      "" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "" +
      date.getDate().toString().padStart(2, "0")
  );
  return (
    date.getFullYear() +
    "" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "" +
    date.getDate().toString().padStart(2, "0")
  );
}

const endpointEstimate =
  "https://digiconomist.net/wp-json/mo/v1/ethereum/stats/" +
  getYesterdaysDate();

const endpointGas =
  "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" +
  process.env.API;

let stream = "";
let gasPrice = "";
let basePrice = "";

async function getEstimate() {
  const response = await fetch(endpointEstimate, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      console.log(endpointEstimate);
      return response.json();
    })
    .then(function (stories) {
      console.log(stories);
      stream = stories[0].Gas_unit_gCO2;
      console.log(stream);
      return stories;
    });
}

async function getGasPrice() {
  const response = await fetch(endpointGas)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      console.log(response.json);
      return response.json();
    })
    .then(function (stories) {
      console.log(stories.result.ProposeGasPrice);
      console.log(stories);
      gasPrice = stories.result.ProposeGasPrice;
      basePrice = stories.result.suggestBaseFee;
    });
}

export async function carbonEstimate() {
  await getGasPrice();
  await getEstimate();
  return stream * gasPrice;
}
