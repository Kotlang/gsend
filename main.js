const venom = require("venom-bot");

const listGroups = require("./commands/list_groups");
const listMembers = require("./commands/list_members");
const sendMessage = require("./commands/send_message");

let _client = null;
async function singletonClientFactory() {
  if (_client === null) {
    _client = await venom.create({ session: "default" });
  }

  return _client;
}

async function executeCommandAndExit(command, clientFactory, config) {
  const client = await clientFactory();
  await command(client, config);
  await client.close();
  process.exit();
}

async function main(clientFactory = singletonClientFactory) {
  require("yargs")
    .scriptName("gsend")
    .command(
      "ls-group",
      "List groups.",
      (yargs) => {
        yargs.option("output", {
          alias: "o",
          describe: "Output file. Defaults to stdout if unspecified.",
          type: "string",
          default: null,
        });
      },

      async function (argv) {
        await executeCommandAndExit(listGroups, clientFactory, argv);
      }
    )
    .command(
      "ls-members",
      "List group members.",
      (yargs) => {
        yargs.option("group", {
          alias: "g",
          describe: "Group ID to list members from",
          type: "string",
          default: null,
        });

        yargs.option("all", {
          alias: "a",
          describe: "List members from all groups",
          boolean: true,
          default: false,
        });

        yargs.option("exclude-gid", {
          describe: "Exclude group IDs from output",
          boolean: true,
          default: false,
        });

        yargs.option("output", {
          alias: "o",
          describe: "Output file. Defaults to stdout if unspecified.",
          type: "string",
          default: null,
        });
      },

      async function (argv) {
        await executeCommandAndExit(listMembers, clientFactory, argv);
      }
    )
    .command(
      "send",
      "Send a message to a list of recipients.",
      (yargs) => {
        yargs.option("recipients", {
          alias: "to",
          describe: "List of recipients to deliver messages to",
          type: "array",
          default: [],
        });

        yargs.option("recipients-file", {
          alias: "r",
          describe:
            "A file containing list of new line separated phone numbers to deliver messages to",
          type: "string",
          default: null,
        });

        yargs.option("text", {
          alias: "t",
          describe: "A message to send",
          type: "string",
          default: null,
        });

        yargs.option("message-file", {
          alias: "m",
          describe: "A list of text files containing messages to be sent",
          type: "string",
          default: null,
        });
      },

      async function (argv) {
        if (argv.text === null && argv.messageFile === null) {
          console.error(
            "One of the options `--text` or `--message-file` must be specified"
          );
          return;
        }

        if (argv.recipients.length == 0 && !argv.recipientsFile) {
          console.error(
            "One of the options `--recipients` or `--recipients-file` must be specified"
          );
          return;
        }

        await executeCommandAndExit(sendMessage, clientFactory, argv);
      }
    )
    .help().argv;
}

module.exports = main;
