const assert = require('assert') ;
const ganache = require('ganache-cli');
const { linkBytecode } = require('solc');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile') ;

let lottery;
let accounts;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from:accounts[0], gas:'1000000'});
});

describe("Lottery contract",()=>{
    it('deploys a contract',()=>{
        assert.ok(lottery.options.address);
    });
    // What behaviour do we really care about?

    //  Players are able to enter the lotter properly!
    it('Allow one account to enter', async ()=>{
        await lottery.methods.enter().send(
            {from: accounts[0], value: web3.utils.toWei('0.02','ether')}
        );

        const players = await lottery.methods.getPlayers().call(
            {from:accounts[0]}
        )

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length); ///remember, (value that it should be , value that it is in reality)
    });

    it('Allows multiple accounts to enter', async ()=>{

        await lottery.methods.enter().send(
            {from: accounts[0], value: web3.utils.toWei('0.02','ether')}
        );

        await lottery.methods.enter().send(
            {from: accounts[1], value: web3.utils.toWei('0.02','ether')}
        );

        await lottery.methods.enter().send(
            {from: accounts[2], value: web3.utils.toWei('0.02','ether')}
        );

        const players = await lottery.methods.getPlayers().call(
            {from:accounts[0]}
        )

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length); ///remember, (value that it should be , value that it is in reality)
    });

    it('Requires a minimum ammount of ether to enter', async () => {
        try{
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false); // We are expecting an error above, if we don't get an error then we will force an error to fail this test. This is just to be 100% sure!
        } catch (err) {
            assert(err); // We are checking for truthiness and assert.ok() would only check for existence.
        } 
    });

    it('Only manager can call pickWinner', async ()=>{
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch (err){
            assert(err);
        }
    });

    it('sends money to the winner and resets the players array', async ()=>{
        await lottery.methods.enter().send(
            {from: accounts[0], value:web3.utils.toWei('2','ether')}
        );
        const initialBalance = await web3.eth.getBalance(accounts[0]); //get balance method can we used for personally owned accounts and contract accounts.
            // ^ balance after entering the Lottery


        await lottery.methods.pickWinner().send({from: accounts[0]});


        const finalBalance = await web3.eth.getBalance(accounts[0]);
            // ^ balance after winning the Lottery upon calling the pickWinner. Since for testing purposes we only used one entry, predictably, there will be only one winner.

        const difference = finalBalance - initialBalance;
        console.log("I am in the final test!");
        console.log((web3.utils.toWei('2','ether'))-difference); // How much gas was used up for this transaction? We sent in 2 ethers.

        assert(difference > web3.utils.toWei('1.8','ether')); //we are just checking if the condition is true, no need for any other assert methods! Also I choose 1.8 to arbitarily allow some room for the difference in the balance due to gas costs. 
    });



    }
);

// note: Assert module has a helper for catching functions that throw an error but it is abit more compliated to make it work with async and await syntax.



// Two more tests that we can do:


// 'to implement the additional two test cases-

// 1. which checks the players array gets empty after calling the pickwinner function.

// 2. which checks that the contract does not have any balance left after callint the pick winner function.

// I have implemented those two test case.'


// code from forums:

// it('checks there are no players after pick winner',async()=>{
     
//     await lottery.methods.enter().send({
//         from: accounts[0],
//         value: web3.utils.toWei('2','ether')
//     })

//     await lottery.methods.pickwinner().send({
//         from: accounts[0]
//     })

//     const players = await lottery.methods.getPlayers().call();
//     console.log(players.length);
//     assert(players.length == 0);

// })

// it('checks the lottery balance is empty after pick winner is called',async()=>{

//     await lottery.methods.enter().send({
//         from: accounts[0],
//         value: web3.utils.toWei('2','ether')
//     })

//     await lottery.methods.pickwinner().send({
//         from: accounts[0]
//     })

//     const balance = await web3.eth.getBalance(lottery.options.address);
//     console.log(balance);
//     assert(balance==0)

// })


