const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'olympic payment stand diagram retreat truck renew oak orphan update found own',
    'https://goerli.infura.io/v3/5f1ae27bc65f41f1b31114e2d9405ebc'
);

const web3 = new Web3(provider);

//the function below is being define only to use the async/await syntax...if you use promises, you don't need to do this:
const deploy = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log('Attempting to deply from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({gas:'1000000',from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
};
deploy();

// Example of a contract deployed:
// Attempting to deply from account 0xC39e1802c2d68e8278f1974da2cf4B0Ff8Aeeb0F
// Contract deployed to 0x2303C26ceD6Cf920A4d139Bd4A44Ae93a868745d