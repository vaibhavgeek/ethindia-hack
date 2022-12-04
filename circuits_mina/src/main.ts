import { MatchMeBetter } from './matchbetter.js';
import {
  isReady,
  Mina,
  shutdown,
  PrivateKey,
  AccountUpdate,
  Field,
  Struct
} from 'snarkyjs';

class History extends Struct({
    history: [Field, Field],
  }) {}

(async function main() {
  await isReady;

  console.log('SnarkyJS loaded');

  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  const deployerAccount = Local.testAccounts[0].privateKey;
  //console.log("deployer account", deployerAccount);
  const zkAppPrivateKey = PrivateKey.random();
  const zkAppAddress = zkAppPrivateKey.toPublicKey();
  //console.log("zk App Address", zkAppAddress);
  const contract = new MatchMeBetter(zkAppAddress);
  let history = new History({history: [new Field(1), new Field(3)]});
  let keyword = new Field(3);
  //console.log("Contract", contract);
  const deployTxn = await Mina.transaction(deployerAccount, () => {
         AccountUpdate.fundNewAccount(deployerAccount);
         contract.deploy({ zkappKey: zkAppPrivateKey });
         contract.initState(history,keyword);
         contract.sign(zkAppPrivateKey);
       });
   //console.log("deply transaction", deployTxn);
   await deployTxn.send();
   console.log("contract result",contract.result.get())

   const txn1 = await Mina.transaction(deployerAccount, () => {
         contract.checkComputation(Field(2));
         contract.sign(zkAppPrivateKey);
       });
    await txn1.send();
  
   // get inital history state
   console.log("contract result",contract.result.get());
  console.log('Shutting down')
  await shutdown();
})();
