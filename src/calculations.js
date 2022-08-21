import { calculateAddressEmissions } from "ethereum-emissions-calculator";

let emmmos = "appld";
// const { calculateAddressEmissions } = www;

export async function getString() {
  const emissions = await calculateAddressEmissions({
    transactionType: "eth", // "eth" | "erc20" | "erc721"
    address: "0x063dd253c8da4ea9b12105781c9611b8297f5d14", // 0x12345[...]
    etherscanAPIKey: "Z9D9V7USNJ7SQBI8NGK95DPDNW3FGUUXQM",
  });
  emmmos = emissions.kgCO2.toString;
  console.log(emissions.kgCO2);
  return emissions.kgCO2;
}
//emmmos = getString();
console.log(emmmos);

// export default async () => {
//   //await getString().then((res) => (emmmos = res));
//   getString();
// };
console.log(emmmos);

// export default getString();
