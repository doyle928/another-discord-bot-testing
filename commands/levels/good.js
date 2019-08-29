const Discord = require("discord.js");
const _ = require("lodash");
const randomColor = require("../../data/randomColor");
const defaults = require("../../data/defaults");
const levelRoles = require("../../data/levelRoles");

exports.run = async (client, message, args) => {
  console.log("good command called");
  let member = null;

  let level = parseInt(args[7]);

  let memberRolesIdArray = [],
    memberRolesArray = [],
    memberUpdatedRolesArray = null,
    memberRolesArrayNew = [];

  function changeLevelArray(memberRolesLevelsRemovedArray, levelInt) {
    console.log("changeLevelArray()");
    return _.concat(memberRolesLevelsRemovedArray, levelRoles[levelInt + 1]);
  }

  function checkLevelChange() {
    console.log("checkLevelChange()");

    member.roles.map(r => memberRolesIdArray.push(r.id));

    let memberHasLevelRole = () => {
      for (let i = 0; i <= levelRoles.length; i++) {
        if (memberRolesIdArray.indexOf(levelRoles[i]) != -1) {
          //lodash _.findIndex works funky had to remove
          return i;
        }
      }
    };
    let calledMemberHasLevelRole = memberHasLevelRole();

    //remove id from array
    let memberRolesLevelsRemovedArray = _.pull(
      memberRolesIdArray,
      levelRoles[calledMemberHasLevelRole]
    );

    // switch (level) { switch slower than if
    if (level >= 50 && member.roles.has(levelRoles[6])) {
      memberUpdatedRolesArray = changeLevelArray(
        memberRolesLevelsRemovedArray,
        calledMemberHasLevelRole
      );
    } else if (level >= 40 && member.roles.has(levelRoles[5])) {
      memberUpdatedRolesArray = changeLevelArray(
        memberRolesLevelsRemovedArray,
        calledMemberHasLevelRole
      );
    } else if (level >= 30 && member.roles.has(levelRoles[4])) {
      memberUpdatedRolesArray = changeLevelArray(
        memberRolesLevelsRemovedArray,
        calledMemberHasLevelRole
      );
    } else if (level >= 20 && member.roles.has(levelRoles[3])) {
      memberUpdatedRolesArray = changeLevelArray(
        memberRolesLevelsRemovedArray,
        calledMemberHasLevelRole
      );
    } else if (level >= 15 && member.roles.has(levelRoles[2])) {
      memberUpdatedRolesArray = changeLevelArray(
        memberRolesLevelsRemovedArray,
        calledMemberHasLevelRole
      );
    } else if (level >= 10 && member.roles.has(levelRoles[1])) {
      memberUpdatedRolesArray = changeLevelArray(
        memberRolesLevelsRemovedArray,
        calledMemberHasLevelRole
      );
    } else if (level >= 3 && member.roles.has(levelRoles[0])) {
      memberUpdatedRolesArray = changeLevelArray(
        memberRolesLevelsRemovedArray,
        calledMemberHasLevelRole
      );
    }
  }

  async function changeLevel(member) {
    console.log("changeLevel()");
    if (member) {
      let channelID = message.guild.channels.get(defaults.mod);

      member.roles.map(r => memberRolesArray.push(r));
      memberRolesArray.shift(); //remove everyone role

      let formattedOldRoles = _.orderBy(memberRolesArray, "position", "desc");
      let rolesOldString = _.join(formattedOldRoles, " | ");

      checkLevelChange();

      if (memberUpdatedRolesArray) {
        let mem = null;

        await member.setRoles(memberUpdatedRolesArray);

        try {
          mem = await message.guild.fetchMember(member.id);
          mem.roles.map(r => memberRolesArrayNew.push(r));
          memberRolesArrayNew.shift(); //remove everyone role again

          let formattedNewRoles = _.orderBy(
            memberRolesArrayNew,
            "position",
            "desc"
          );

          let rolesNewString = _.join(formattedNewRoles, " | ");

          let messageEmbed = new Discord.RichEmbed()
            .setColor(randomColor())
            .setTitle(
              `Changed level role for ${mem.user.username}#${mem.user.discriminator}`
            )
            .setThumbnail(mem.user.displayAvatarURL)
            .addField("Old Roles", rolesOldString)
            .addField("New Roles", rolesNewString);

          channelID.send(messageEmbed);
        } catch {
          channelID.send("I failed changing roles for a user");
          channelID.send("<:deadinside:606350795881054216>");
        }
      }
    }
  }

  if (message.author.id == "157673412561469440") {
    if (message.channel.id == "574945031455244306") {
      member =
        message.mentions.members.first() || message.guild.members.get(args[2]);
      changeLevel(member);
    }
  }
};
