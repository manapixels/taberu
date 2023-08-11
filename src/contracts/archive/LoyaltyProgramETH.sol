// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LoyaltyProgram {
    // The address of the shop owner
    address public owner;

    // The amount of ETH required to get one stamp
    uint256 public stampPrice;

    // A mapping of customer addresses to their stamp balances
    mapping(address => uint256) public stamps;

    // An event to notify customers when they receive stamps
    event StampsAwarded(address indexed customer, uint256 amount);

    // An event to notify customers when they redeem stamps
    event StampsRedeemed(address indexed customer, uint256 amount);

    // A modifier to check that only the owner can call a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // The constructor that sets the stamp price
    constructor(uint256 _stampPrice) {
        stampPrice = _stampPrice;
        owner = msg.sender;
    }

    // A function that allows customers to pay in ETH and get stamps
    function payWithETH() external payable {
        require(msg.value > 0, "Amount must be positive");
        uint256 _stamps = msg.value / stampPrice;
        stamps[msg.sender] += _stamps;
        emit StampsAwarded(msg.sender, _stamps);
    }

    // A function that allows customers to redeem their stamps for ETH
    function redeemStamps(uint256 _amount) external {
        require(_amount > 0, "Amount must be positive");
        require(stamps[msg.sender] >= _amount, "Not enough stamps");
        uint256 _eth = _amount * stampPrice;
        payable(msg.sender).transfer(_eth);
        stamps[msg.sender] -= _amount;
        emit StampsRedeemed(msg.sender, _amount);
    }

    // A function that allows the owner to withdraw the ETH balance of the contract
    function withdrawETH() external onlyOwner {
        uint256 _balance = address(this).balance;
        payable(owner).transfer(_balance);
    }

}
