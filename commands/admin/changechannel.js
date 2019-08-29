const defaults = require("../../data/defaults");

exports.run = async (client, message, args) => {
  if (message.author.id == "157673412561469440") {
    if (args[1]) {
      //defaultChannelId = args[1]; // need to add database for this
    } else {
      message.channel.send("no channel given!!");
    }
    setTimeout(() => {
      message.delete();
    }, 200);
  }
};
