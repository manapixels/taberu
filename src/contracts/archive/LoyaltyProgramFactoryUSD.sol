// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LoyaltyProgram {
    // USDC token contract
    IERC20 public usdc;

    // The address of the shop owner
    address public owner;

    // The amount of USDC, DAI or USDT required to get one stamp
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

    // The constructor that sets the USDC, DAI and USDT token contracts and the stamp price
    constructor(IERC20 _usdc, uint256 _stampPrice) {
        usdc = _usdc;
        stampPrice = _stampPrice;
        owner = msg.sender;
    }

    // A function that allows customers to pay in USDC, DAI or USDT and get stamps
    function payWithToken(IERC20 _token, uint256 _amount) external {
        require(_amount > 0, "Amount must be positive");
        require(_token == usdc, "Invalid token");
        require(_token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        uint256 _stamps = _amount / stampPrice;
        stamps[msg.sender] += _stamps;
        emit StampsAwarded(msg.sender, _stamps);
    }

    // A function that allows customers to redeem their stamps for USDC, DAI or USDT
    function redeemStamps(IERC20 _token, uint256 _amount) external {
        require(_amount > 0, "Amount must be positive");
        require(stamps[msg.sender] >= _amount, "Not enough stamps");
        require(_token == usdc, "Invalid token");
        uint256 _tokenAmount = _amount * stampPrice;
        require(_token.transfer(msg.sender, _tokenAmount), "Transfer failed");
        stamps[msg.sender] -= _amount;
        emit StampsRedeemed(msg.sender, _amount);
    }

    // A function that allows the owner to withdraw the USDC, DAI and USDT balance of the contract
    function withdrawTokens() external onlyOwner {
        uint256 _usdcBalance = usdc.balanceOf(address(this));
        require(usdc.transfer(owner, _usdcBalance), "Transfer failed");
    }

}
