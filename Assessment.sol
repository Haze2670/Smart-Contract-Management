// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Tollgate {
    address payable public owner;
    uint256 public balance = 0;
    bool public balanceSet = false;

    event Payment(address indexed account, uint256 amount);
    event BalanceUpdated(address indexed account, uint256 newBalance);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function payToll(uint256 _amount) public payable {
        require(balanceSet, "You need to set ETH balance first");
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= balance, "Insufficient balance");
        
        balance -= _amount;
        emit Payment(msg.sender, _amount);

        if (balance <= 0) {
            balance = 0;
            balanceSet = false;
        }
    }

    function inputBalance(uint256 _newBalance) public {
        require(msg.sender == owner, "You are not the owner of this account");
        
        balance = _newBalance;
        balanceSet = true;
        emit BalanceUpdated(msg.sender, _newBalance);
    }

    function resetBalance() public {
        require(msg.sender == owner, "You are not the owner of this account");
        balance = 0;
        balanceSet = false;
    }
}
