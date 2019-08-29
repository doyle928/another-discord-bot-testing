module.exports = client => {
  console.log("started");

  client.user.setStatus("idle");

  client.user.setActivity("my son pls no touch");
};
