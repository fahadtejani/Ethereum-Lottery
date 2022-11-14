# Ethereum-Lottery

Ethererum Lottery smart contract that allows players to join by depositing eth and then chooses a random winner after being called by the Contract manager.

Technologies learned and used:
- Solidity language (Using the Solidity compiler 'solc' with NodeJs)
- Remix IDE
- Web3 Module for NodeJs
- Ganache for local deployment
- Mocha for testing
- File system module (fs for NodeJs)



Note to self:
+ The solidity compiler gives us two things:
  - ByteCode to be deployed on the blockchain
  - ABI (Application Binary Interface)
+ ABI is the portal between the solidity world and javaScript world.
+ Before passing the file path to the 'fs.readFileSync()' method, the path needs to be resolved, e.g. 'path.resolve(__dirname,'contracts','Lottery.sol')'
+ when you require the 'web3' module, it returns a constructor function and should be denoted by the variable's capital first letter. We need to pass a 'provider' to interact with the specific blockchain. For example:
    'const Web3 = require('web3');
     const web3 = new Web3(ganache.provider());'
+ Check the comments in the 'lottery.test.js' file for testing notes.