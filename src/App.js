import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import {Biconomy} from "@biconomy/mexa";
import abi from './abi';
function App() {
  const {ethereum}=window;
  const [add,setadd]=useState();
  const [c,setc]=useState("false");
  
  useEffect(()=>{
    const biconomy = new Biconomy(window.ethereum,
      {walletProvider:window.ethereum, apiKey:"UEf9ChbPv.a4a6d9bb-35b6-4300-9ade-d42ff09d2db4", debug: true});
    //let ethersProvider = new ethers.providers.Web3Provider(biconomy);
    let web3 = new Web3(biconomy);
    biconomy.onEvent(biconomy.READY, () => {
      //console.log("biconomy connected");
      ethereum.request({ method: "eth_requestAccounts" }).then((e) => {
        setadd(e[0]);
        if(c=="true"){
        u();
        setc("false");
        }
      //  console.log(e[0])
        //Session.set("add", e[0]);
      });
      // Initialize your dapp here like getting user accounts etc
    }).onEvent(biconomy.ERROR, (error, message) => {
     // console.log("biconomy error");
      // Handle error while initializing mexa
    });
    async function u(){  
      console.log("u ke andar");
      let contract = new web3.eth.Contract(
        abi,
       "0x9b6afcddaf200bf4bc4d9df1213a6a11da8a1731"
      );
    let userAddress = add;
   //all strings params must change as our smartcontract do not allow key duplication
  let tx = contract.methods.createid("string1","string2","string3","nishu").send({
    from: add
    //signatureType: biconomy.PERSONAL_SIGN
    //by default mexa will consider personal sign hence signatureType is optional 
    //and can be omitted in case of personal sign
});

tx.on("transactionHash", function (hash) {
    console.log(`Transaction hash is ${hash}`);
    //showInfoMessage(`Transaction sent. Waiting for confirmation ..`);
}).once("confirmation", function (confirmationNumber, receipt) {
    console.log(receipt);
    console.log(receipt.transactionHash);
    //do something with transaction hash
});
    }
  
  },[c]
);
  return (
    <div className="App">
    
        <button onClick={()=>{
       setc("true");
        }}>See meta</button>
        </div>
  );
}

export default App;
