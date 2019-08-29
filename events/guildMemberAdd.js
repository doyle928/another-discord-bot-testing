module.exports = (client, message) => {
  let channelId = client.guilds
    .get("559560674246787087")
    .channels.get("561372938474094603");
  if (member.id === "272514428849750016") {
    member
      .kick()
      .then(() => {
        channelId.send("I did something bad");
        channelId.send("<:oh_my:606353903558066176>");
      })
      .catch(() => {
        channelId.send("I failed");
        channelId.send("<:deadinside:606350795881054216>");
      });
  }
};
