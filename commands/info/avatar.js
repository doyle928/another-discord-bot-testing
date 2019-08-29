exports.run = async (client, message, args) => {
  if (!args[1]) {
    message.channel.send("there's no user specified!!!");
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
    let member = null;
    if (!message.mentions.members.first()) {
      let id = args[1].replace(/([<>@,#!&])/g, "");
      try {
        member = await message.guild.fetchMember(id);
      } catch {
        message.channel.send("I don't think this member exists in the guild");
        message.channel.send("<:kanna_confused:607077674099277828>");
      }
    } else {
      member =
        message.mentions.members.first() ||
        message.guild.members.get(args[1]) ||
        message.member;
    }
    message.channel.send(member.user.displayAvatarURL);
    setTimeout(() => {
      message
        .delete()
        .catch(() =>
          message.channel.send(
            "I dont have the permission to delete the command message!"
          )
        );
    }, 200);
  }
};
