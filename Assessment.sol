// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance = 1000 ether;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        
        balance += _amount;
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_withdrawAmount <= balance, "Insufficient balance");

        balance -= _withdrawAmount;
        emit Withdraw(msg.sender, _withdrawAmount);
    }
}
