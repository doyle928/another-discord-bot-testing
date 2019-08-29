const Discord = require("discord.js");
const _ = require("lodash");
const timeConverter = require("../../data/timeConverter");
const timeDifference = require("../../data/timeDifference");
const randomColor = require("../../data/randomColor");

exports.run = async (client, message, args) => {
  let messageEmbed = new Discord.RichEmbed().setColor(randomColor());

  let embedFilled = false;

  let channelArray = [],
    emojiArray = [],
    roleArray = [],
    memberArray = [];

  if (!args[1]) {
    message.guild.channels.map(chan => channelArray.push(chan));
    let channelCategory = _.countBy(channelArray, "type");
    message.guild.emojis.map(emoji => emojiArray.push(emoji));
    message.guild.roles.map(role => roleArray.push(role));
    message.guild.members.map(member => memberArray.push(member));
    let memberUserOrBot = _.countBy(memberArray, "user.bot"); // false = user / true = bot

    messageEmbed.setTitle(message.guild.name);
    messageEmbed.setThumbnail(message.guild.iconURL);
    messageEmbed.addField("ID", message.guild.id, true);
    messageEmbed.addField("Owner", message.guild.owner, true);
    messageEmbed.addField(
      "Creation Date",
      `${timeConverter(message.guild.createdTimestamp)}\n${timeDifference(
        message.guild.createdTimestamp
      )}`,
      true
    );
    messageEmbed.addField("Region", message.guild.region, true);
    messageEmbed.addField(
      "Member Count",
      message.guild.memberCount - memberUserOrBot.true,
      true
    );
    messageEmbed.addField(
      "Bot Count",
      message.guild.memberCount - memberUserOrBot.false,
      true
    );
    messageEmbed.addField("Categories", channelCategory.category, true);
    messageEmbed.addField("Text Channels", channelCategory.text, true);
    messageEmbed.addField("Voice Channels", channelCategory.voice, true);
    messageEmbed.addField("Emojis", emojiArray.length, true);
    messageEmbed.addField("Roles", roleArray.length, true);
    embedFilled = true;
  } else {
    let guildId = client.guilds.get(args[1]);
    if (guildId) {
      guildId.channels.map(chan => channelArray.push(chan));
      let channelCategory = _.countBy(channelArray, "type");
      guildId.emojis.map(emoji => emojiArray.push(emoji));
      guildId.roles.map(role => roleArray.push(role));
      guildId.members.map(member => memberArray.push(member));
      let memberUserOrBot = _.countBy(memberArray, "user.bot"); // false = user / true = bot

      messageEmbed.setTitle(guildId.name);
      messageEmbed.setThumbnail(guildId.iconURL);
      messageEmbed.addField("ID", guildId.id, true);
      messageEmbed.addField("Owner", guildId.owner, true);
      messageEmbed.addField(
        "Creation Date",
        `${timeConverter(guildId.createdTimestamp)}\n${timeDifference(
          guildId.createdTimestamp
        )}`,
        true
      );
      messageEmbed.addField("Region", guildId.region, true);
      messageEmbed.addField(
        "Member Count",
        guildId.memberCount - memberUserOrBot.true,
        true
      );
      messageEmbed.addField(
        "Bot Count",
        guildId.memberCount - memberUserOrBot.false,
        true
      );
      messageEmbed.addField("Categories", channelCategory.category, true);
      messageEmbed.addField("Text Channels", channelCategory.text, true);
      messageEmbed.addField("Voice Channels", channelCategory.voice, true);
      messageEmbed.addField("Emojis", emojiArray.length, true);
      messageEmbed.addField("Roles", roleArray.length, true);
      embedFilled = true;
    } else {
      message.channel.send("I'm not a member of this server");
      message.channel.send("<:deadinside:606350795881054216>");
    }
  }

  if (embedFilled) {
    message.channel.send(messageEmbed);
  }

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
