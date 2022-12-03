// SPDX-License-Identifier: MIT License

pragma solidity ^0.8.14;


// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract App{
    uint256 public storageIdentifier; // content identifier for storage
    uint256 public storageHash; // hash of the storage

    // details for push notifications

    address public EPNS_COMM_ADDRESS = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;
    address public channel_address = 0xF8c15F397434Bd6ECE77499299b1408804B50422;

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

    function remind(address borrower, uint amount) public {
        // use push protocol for sending message to the borrower
        // message: "`{lender} has requested `{amount}` from you"

        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            channel_address,
            borrower,
            bytes(
                string(
                    abi.encodePacked(
                        "0", // notification identity
                        "+", // segregator
                        "3",
                        "+", // segregator
                        "Settle Up Reminder: ",
                        "+", // segregator
                        addressToString(msg.sender),
                        "has requested ", 
                        uint2str(amount), 
                        "from you"
                    )
                )
            )
        );
    }


    // Helper function to convert address to string
    function addressToString(address _address) internal pure returns(string memory) {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(42);
        _string[0] = '0';
        _string[1] = 'x';
        for(uint i = 0; i < 20; i++) {
            _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
    }

    // Helper function to convert uint to string
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
