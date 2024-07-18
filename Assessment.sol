// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance = 1000 ether;

    event Contribution(address indexed account, uint256 amount);
    event ExtractChange(address indexed account, uint256 amount);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function contribute(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        
        balance += _amount;
        emit Contribution(msg.sender, _amount);
    }

    function extractChange(uint256 _changeAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_changeAmount <= balance, "Insufficient balance");

        balance -= _changeAmount;
        emit ExtractChange(msg.sender, _changeAmount);
    }
}
