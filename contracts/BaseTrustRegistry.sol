// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BaseTrustRegistry {
    event WalletChecked(address indexed checker, address indexed subject, uint256 score, uint8 riskLevel);
    event WalletReported(address indexed reporter, address indexed subject, string reasonHash);

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() { owner = msg.sender; }

    function setOwner(address _owner) external onlyOwner {
        owner = _owner;
    }

    function logWalletCheck(address subject, uint256 score, uint8 riskLevel) external {
        emit WalletChecked(msg.sender, subject, score, riskLevel);
    }

    function reportSuspicious(address subject, string calldata reasonHash) external {
        emit WalletReported(msg.sender, subject, reasonHash);
    }
}
