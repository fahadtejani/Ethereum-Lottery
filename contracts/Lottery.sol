pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether); // If require evaluates to a falsey value, it will exit the function.
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty,now,players));
    } 
    // If you want to test a private function above, you will have to temporarily make it public!

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance); //That is how you can send money to addresses from inside a contract!
        players = new address[](0); //reset to original condition where the players array is initialized to have zero elements.

    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    } // Modifiers allow us to avoid DRY issues!

    function getPlayers() public view returns (address[]){
        return players;
    }
}