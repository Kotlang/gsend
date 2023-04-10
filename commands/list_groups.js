const json2csv = require("@json2csv/node");
const fs = require("fs");
const { promisify } = require("util");

const parser = new json2csv.AsyncParser({}, {}, {});

async function listGroups(client, config) {
  const groups = await client.getAllGroups();
  const result = groups.map(toExternalModel);

  const csv = await parser.parse(result).promise();

  if (config.output !== null) {
    await promisify(fs.writeFile)(config.output, csv, "utf-8");
  } else {
    console.log(csv);
  }
}

function toExternalModel(group) {
  return {
    id: group.id._serialized,
    name: group.name,
  };
}

module.exports = listGroups;
