const { parse } = require("csv-parse/sync");
const fs = require("fs/promises");

async function sendMessage(client, config) {
  const content = config.text || (await fs.readFile(config.messageFile));

  const fileRecipients =
    config.recipientsFile !== null
      ? parse(await fs.readFile(config.recipientsFile, "utf-8")).map(
          (record) => record[0]
        )
      : [];

  const recipients = [...config.recipients, ...fileRecipients];

  for (const recipient of recipients) {
    await client.sendText(`${recipient}@g.us`, content);
  }
}

module.exports = sendMessage;
