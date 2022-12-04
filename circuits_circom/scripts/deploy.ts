import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import hre, { ethers } from "hardhat";
import fs from "fs-extra";


const deployContractGeneric = async (name: string, network:string) => {
  const contractBase = await ethers.getContractFactory(name);
  console.log("get Contract Factory?");
  const deployedContract = await contractBase.deploy();
  console.log(`${name} Contract Deployed at: `, deployedContract.address);

  const addressesJson = `./scripts/contractAddresses/${network}.json`;
  const addressData = await fs.readJSON(addressesJson);
  console.log("address data", addressData);
  addressData[name] = deployedContract.address;
  await fs.writeJson(addressesJson, addressData);
}
const checkIfDeployed = async (name: string, network: string) => {
  const addressesJson = `./scripts/contractAddresses/${network}.json`;
  console.log("addressJSON PATH", addressesJson);
  const addressData = await fs.readJSON(addressesJson);
  console.log("address data", addressData);
  if(addressData.hasOwnProperty(name)){
      console.log("eureka");
      return true;
  }
  else{
    console.log("Expected result");
    return false;
  }
}

const deploy = async () => {
  console.log("network name : ", hre.network.name);
  
  if (!(await checkIfDeployed("Verifier", hre.network.name))) {
    await deployContractGeneric("Verifier", hre.network.name)
  }

  const addressesJson = `./scripts/contractAddresses/${hre.network.name}.json`;
  
  const addressData = await fs.readJSON(addressesJson);
  const verifierAddress = addressData["Verifier"];
  await fs.writeJson(addressesJson, addressData);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });