const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.channel.send("You don't have the permissions to use this command!");
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
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
          message.guild.members.get(args[1]);
      }

      if (!member.bannable)
        return message.channel.send(
          "I cannot ban this user! Do they have a higher role? Do I have ban permissions?"
        );
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason provided";
      member
        .ban(reason)
        .then(() => {
          let messageEmbed = new Discord.RichEmbed()
            .setColor("#fe6860")
            .setTitle(
              `${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`
            )
            .addField("Reason", reason);
          message.channel.send(messageEmbed);
        })
        .catch(error => {
          message.channel.send(
            `Sorry ${message.author} I couldn't ban the user`
          );
          message.channel.send("<:deadinside:606350795881054216>");
        });
    }
  }
};
