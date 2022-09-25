// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

error UserAlreadyExists();
error UserDoesNotExist();

contract App {
    event UserCreated(address indexed userAddress, string fullname);

    struct User {
        string fullname;
        string bio;
        string avatar;
        bool flag;
    }

    mapping(address => User) users;

    string[] documents;

    function register(
        string memory fullname,
        string memory bio,
        string memory avatar
    ) public {
        if (users[msg.sender].flag) {
            revert UserAlreadyExists();
        }
        users[msg.sender] = User(fullname, bio, avatar, true);
        emit UserCreated(msg.sender, fullname);
    }

    function getMyData()
        public
        view
        returns (
            string memory fullname,
            string memory bio,
            string memory avatar
        )
    {
        User memory user = users[msg.sender];
        if (!user.flag) {
            revert UserDoesNotExist();
        }
        return (user.fullname, user.bio, user.avatar);
    }

    function getSomeonesData(address _address)
        public
        view
        returns (
            string memory fullname,
            string memory bio,
            string memory avatar
        )
    {
        User memory user = users[_address];
        if (!user.flag) {
            revert UserDoesNotExist();
        }
        return (user.fullname, user.bio, user.avatar);
    }
}
