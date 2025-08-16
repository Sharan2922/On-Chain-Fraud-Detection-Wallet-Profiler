// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BaseTrustRegistry {
    event Reported(address indexed wallet, uint256 riskScore, string riskLevel, string reason);

    mapping(address => uint256) public lastScore;

    function report(address wallet, uint256 riskScore, string calldata riskLevel, string calldata reason) external {
        lastScore[wallet] = riskScore;
        emit Reported(wallet, riskScore, riskLevel, reason);
    }
}
