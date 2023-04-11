const fs = require("fs");

const groups = [
  {
    id: {
      server: "g.us",
      user: "000000000000-0123456789",
      _serialized: "000000000000-0123456789@g.us",
    },
    name: "Group 1",
  },

  {
    id: {
      server: "g.us",
      user: "111111111111-5678901234",
      _serialized: "111111111111-5678901234@g.us",
    },
    name: "Group 2",
  },

  {
    id: {
      server: "g.us",
      user: "22222222222-5555555555",
      _serialized: "222222222222-5555555555@g.us",
    },
    name: "Group 3",
  },
];

const members = {
  "000000000000-0123456789@g.us": [
    {
      id: {
        server: "c.us",
        user: "000000000001",
        _serialized: "000000000001@c.us",
      },
      isAdmin: true,
      isSuperAdmin: true,
    },
    {
      id: {
        server: "c.us",
        user: "000000000002",
        _serialized: "000000000002@c.us",
      },
      isAdmin: false,
      isSuperAdmin: false,
    },
    {
      id: {
        server: "c.us",
        user: "000000000003",
        _serialized: "000000000003@c.us",
      },
      isAdmin: false,
      isSuperAdmin: false,
    },
    {
      id: {
        server: "c.us",
        user: "000000000004",
        _serialized: "000000000004@c.us",
      },
      isAdmin: false,
      isSuperAdmin: false,
    },
  ],
  "111111111111-5678901234@g.us": [
    {
      id: {
        server: "c.us",
        user: "000000000001",
        _serialized: "000000000001@c.us",
      },
      isAdmin: true,
      isSuperAdmin: true,
    },
    {
      id: {
        server: "c.us",
        user: "000000000002",
        _serialized: "000000000002@c.us",
      },
      isAdmin: false,
      isSuperAdmin: false,
    },
  ],
  "222222222222-5555555555@g.us": [
    {
      id: {
        server: "c.us",
        user: "000000000001",
        _serialized: "000000000001@c.us",
      },
      isAdmin: false,
      isSuperAdmin: false,
    },
    {
      id: {
        server: "c.us",
        user: "000000000009",
        _serialized: "000000000009@c.us",
      },
      isAdmin: true,
      isSuperAdmin: true,
    },
  ],
};

class MockClient {
  constructor() {
    this.groups = groups;
    this.members = members;
    this.sentMessages = [];
  }

  async getAllGroups() {
    return this.groups;
  }

  async getGroupMembers(groupId) {
    return this.members[groupId];
  }

  async sendText(chatId, message) {
    this.sentMessages.push({ chatId, message });
  }

  async close() {}
}

module.exports = MockClient;
