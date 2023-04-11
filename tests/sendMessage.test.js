const sendMessage = require("../commands/send_message");
const MockClient = require("./mock_client");

test("sends message to correct recipients", async () => {
  const client = new MockClient();

  const config = {
    recipients: ["5678", "1234"],
    text: "Hello world",
    recipientsFile: null,
    messageFile: null,
  };

  await sendMessage(client, config);

  const expectedMessages = [
    {
      chatId: "5678@g.us",
      message: "Hello world",
    },
    {
      chatId: "1234@g.us",
      message: "Hello world",
    },
  ];

  expect(client.sentMessages).toStrictEqual(expectedMessages);
});
