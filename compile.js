const path = require('path');
const fs = require('fs');
const solc = require('solc') ;

const lotteryPath = path.resolve(__dirname,'contracts','Lottery.sol') ;

const source = fs.readFileSync(lotteryPath, 'utf8') ; //2nd parameter is just defining the encoding.

// console.log(solc.compile(source,1));

module.exports = solc.compile(source,1).contracts[":Lottery"];

//Why do .contract[":Lottery"]? answer: we only care about the bytecode and ABI.

// Remember: ABI is the portal between the solidity world and javaScript world