const Discord = require("discord.js");
const _ = require("lodash");
const timeConverter = require("../../data/timeConverter");
const timeDifference = require("../../data/timeDifference");
const randomColor = require("../../data/randomColor");

exports.run = async (client, message, args) => {
  let member = null;
  if (!args[1]) {
    try {
      member = await message.guild.fetchMember(message.author.id);
    } catch {
      message.channel.send("I don't think this member exists in the guild");
      message.channel.send("<:kanna_confused:607077674099277828>");
    }
  } else {
    if (!message.mentions.members.first()) {
      const id = args[1].replace(/([<>@,#!&])/g, "");
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
  }

  let rolesArray = [];
  member.roles.map(r => rolesArray.push(r));
  rolesArray.shift();
  let formattedRoles = _.orderBy(rolesArray, "position", "desc");
  let rolesString = _.join(formattedRoles, " | ");
  let messageEmbed = new Discord.RichEmbed()
    .setColor(randomColor())
    .setTitle(`${member.user.username}#${member.user.discriminator}`)
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(member)
    .addField("ID", member.user.id, true)
    .addField("Presence", member.presence.status, true)
    .addField(
      "Account Creation",
      `${timeConverter(member.user.createdTimestamp)}\n${timeDifference(
        member.user.createdTimestamp
      )}`,
      true
    )
    .addField(
      "Server Join Date",
      `${timeConverter(member.joinedTimestamp)}\n${timeDifference(
        member.joinedTimestamp
      )}`,
      true
    )
    .addField(
      "Nickname on Server",
      member.nickname ? member.nickname : "No nickname set",
      true
    )
    .addField(
      "Last Seen",
      `${member.user.lastMessage.channel}\n${timeConverter(
        member.user.lastMessage.createdTimestamp
      )}`,
      true
    )
    .addField("Roles", rolesString);
  message.channel.send(messageEmbed);
  setTimeout(() => {
    message
      .delete()
      .catch(() =>
        message.channel.send(
          "I dont have the permission to delete the command message!"
        )
      );
  }, 200);
};
