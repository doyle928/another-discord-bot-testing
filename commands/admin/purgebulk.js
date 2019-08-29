exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send("You don't have the permissions to use this command!");
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
    if (!args[1]) {
      message.channel.send("You didn't enter the amount of messages!!!");
      message.channel.send("<a:02upset:538273249306345476>");
    } else {
      let limit = parseInt(args[1], 10);
      message.channel
        .bulkDelete(limit)
        .then(messages => {
          message.channel.send(`Deleted ${messages.size} messages`);
          message.channel.send("<:SataniaThumbsUp:575052610063695873>");
        })
        .catch(() => {
          message.channel.send("I wasnt able to");
          message.channel.send("<:deadinside:606350795881054216>");
        });
    }
  }
};
