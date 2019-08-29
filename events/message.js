const active = new Map();
const talkedRecently = new Set();

module.exports = (client, message) => {
  let ops = {
    active: active
  };

  // Our standard argument/command name definition.
  const args = message.content
    //.slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args
    .shift()
    .toLowerCase()
    .replace(/([.])/g, "");
  args.unshift(command);
  if (message.author.id == "157673412561469440") {
    if (message.channel.id == "542945080495833121") {
      args[0] = ".good";
    }
  }

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  if (talkedRecently.has(message.author.id)) {
    message.channel.send("So fast! Wait a moment please!");
  } else {
    // Run the command
    cmd.run(client, message, args, ops);

    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 1500);
  }
};
