// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LoyaltyProgram {
    // The address of the shop owner
    address public owner;

    // The amount of ETH (in Wei) required to get one point
    uint256 public pointPrice;
    uint256 public pointValue;

    // A mapping of customer addresses to their point balances
    mapping(address => uint256) public points;

    event Paid(address indexed customer, uint256 amount);
    event PointsAwarded(address indexed customer, uint256 amount);
    event PointsRedeemed(address indexed customer, uint256 amount);

    // A modifier to check that only the owner can call a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // The constructor that sets the point price
    constructor(uint256 _pointPrice, uint256 _pointValue) {
        pointPrice = _pointPrice;
        pointValue = _pointValue;
        owner = msg.sender;
    }

    // A function that allows customers to pay in ETH and get points
    function payWithETH() external payable {
        require(msg.value > 0, "Amount must be positive");
        uint256 _points = msg.value / pointPrice;
        points[msg.sender] += _points;
        
        emit PointsAwarded(msg.sender, _points);
        emit Paid(msg.sender, msg.value);
    }

    // A function that allows customers to redeem their points for ETH
    function redeemPoints(uint256 _amount) external {
        require(_amount > 0, "Amount must be positive");
        require(points[msg.sender] >= _amount, "Not enough points");
        uint256 _eth = _amount * pointValue;
        payable(msg.sender).transfer(_eth);
        points[msg.sender] -= _amount;
        
        emit PointsRedeemed(msg.sender, _amount);
    }

    // A function that allows the owner to withdraw the ETH balance of the contract
    function withdrawETH() external onlyOwner {
        uint256 _balance = address(this).balance;
        payable(owner).transfer(_balance);
    }

}
