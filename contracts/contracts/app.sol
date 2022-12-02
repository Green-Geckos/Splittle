// SPDX-License-Identifier: MIT License

pragma solidity ^0.8.14;

contract App {
    uint256 public storageIdentifier; // content identifier for storage
    uint256 public storageHash; // hash of the storage

    constructor(uint256 _storageIdentifier, uint256 _storageHash) {
        storageIdentifier = _storageIdentifier;
        storageHash = _storageHash;
    }

    function setStorageIdentifier(uint256 _storageIdentifier) public {
        storageIdentifier = _storageIdentifier;
    }

    function setStorageHash(uint256 _storageHash) public {
        storageHash = _storageHash;
    }

    function remind(address lender, address borrower, uint amount) public view {
        // use push protocol for sending message to the borrower
        // message: "`{lender} has requested `{amount}` from you"

        // logic
    }
}