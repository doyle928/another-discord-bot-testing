const defaults = require("../../data/defaults");

exports.run = async (client, message, args) => {
  if (message.author.id == "157673412561469440") {
    let channelID = client.guilds
      .get(defaults.guild)
      .channels.get(defaults.channel);
    let messageToSend = "";
    for (let k = 1; k < args.length; k++) {
      messageToSend += args[k] + " ";
    }
    if (channelID) {
      channelID.send(messageToSend);
      setTimeout(() => {
        message.delete();
      }, 200);
    }
  }
};
