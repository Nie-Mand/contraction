// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract App {
    event UserCreated(address indexed userAddress, string fullname);

    struct User {
        string fullname;
        string bio;
        string avatar;
    }

    mapping(address => User) users;

    string[] documents;

    function register(
        string memory fullname,
        string memory bio,
        string memory avatar
    ) public {
        users[msg.sender] = User(fullname, bio, avatar);
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
        return (user.fullname, user.bio, user.avatar);
    }
}
