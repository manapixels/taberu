// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./LoyaltyProgram.sol"; // The LoyaltyProgram contract from above

contract LoyaltyProgramFactory {
    // A mapping of shop addresses to their deployed LoyaltyProgram contracts
    mapping(address => LoyaltyProgram) public loyaltyPrograms;

    // An event to notify when a new LoyaltyProgram contract is deployed
    event LoyaltyProgramCreated(address indexed shop, address indexed loyaltyProgram);

    // A function that allows anyone to deploy a new LoyaltyProgram contract for their shop
    function createLoyaltyProgram(uint256 _stampPrice) external {
        require(_stampPrice > 0, "Stamp price must be positive");
        require(loyaltyPrograms[msg.sender] == LoyaltyProgram(address(0)), "Loyalty program already exists for this shop");
        LoyaltyProgram _loyaltyProgram = new LoyaltyProgram(_stampPrice);
        loyaltyPrograms[msg.sender] = _loyaltyProgram;
        emit LoyaltyProgramCreated(msg.sender, address(_loyaltyProgram));
    }

}
