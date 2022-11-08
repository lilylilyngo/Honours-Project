import { calculateAddressEmissions } from "ethereum-emissions-calculator";

export async function getString(address) {
  let response = "";
  let emissionJSON = "";

  console.log(address);
  // Function to get the NFTs emissions
  const emissions = await calculateAddressEmissions({
    transactionType: "eth", // "eth" | "erc20" | "erc721"
    address: address, // 0x063dd253c8da4ea9b12105781c9611b8297f5d14
    etherscanAPIKey: process.env.API,
  })
    .then((res) => {
      console.log(res);
      emissionJSON = res;
    })
    .catch((err) => {
      console.log(err.message);
      response = err.message;
    });

  if (response == "") {
    console.log(emissionJSON);
    return emissionJSON;
  }
  return response;
}
