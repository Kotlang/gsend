const json2csv = require("@json2csv/node");
const fs = require("fs");
const { promisify } = require("util");

const parser = new json2csv.AsyncParser({}, {}, {});

async function listMembers(client, config) {
  const groupIds = [];

  if (config.all) {
    const allGroupIds = (await client.getAllGroups()).map(
      (group) => group.id._serialized
    );

    groupIds.push.apply(groupIds, allGroupIds);
  }

  if (config.group !== null) {
    groupIds.push(config.group);
  }

  if (groupIds.length === 0) {
    console.error("No group group specified");
    return;
  }

  const result = [];

  for (let i = 0; i < groupIds.length; i++) {
    const groupId = groupIds[i];
    const members = await client.getGroupMembers(groupId);

    result.push.apply(
      result,
      config.excludeGid || groupIds.length === 1
        ? members.map(toExternalModel)
        : members.map((member) => {
            return {
              groupId: groupId,
              ...toExternalModel(member),
            };
          })
    );
  }

  const csv = await parser.parse(result).promise();

  if (config.output !== null) {
    await promisify(fs.writeFile)(config.output, csv, "utf-8");
  } else {
    console.log(csv);
  }
}

function toExternalModel(member) {
  return {
    phone: member.id.user,
    name: member.pushname
  };
}

module.exports = listMembers;
