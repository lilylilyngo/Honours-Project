import { calculateAddressEmissions } from "ethereum-emissions-calculator";

let emmmos = "appld";
// const { calculateAddressEmissions } = www;

export async function getString(address) {
  let apple = "";
  let stream = "";

  console.log(address);
  const emissions = await calculateAddressEmissions({
    transactionType: "eth", // "eth" | "erc20" | "erc721"
    address: address, // 0x063dd253c8da4ea9b12105781c9611b8297f5d14
    etherscanAPIKey: process.env.API,
  })
    .then((res) => {
      console.log(res);
      stream = res;
    })
    .catch((err) => {
      console.log(err.message);
      apple = err.message;
    });

  if (apple == "") {
    console.log(stream);
    return stream;
  }
  return apple;
}
//emmmos = getString();
console.log(emmmos);

// export default async () => {
//   //await getString().then((res) => (emmmos = res));
//   getString();
// };
console.log(emmmos);
