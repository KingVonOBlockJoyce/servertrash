const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("BOT_TOKEN length:", process.env.BOT_TOKEN?.length);
console.log("BOT_TOKEN preview:", process.env.BOT_TOKEN?.slice(0, 4) + "...");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(process.env.BOT_TOKEN);

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

app.get("/", async (req, res) => {
  const userId = req.query.userid;
  if (!userId) return res.status(400).json({ error: "No userid provided" });

  try {
    const user = await client.users.fetch(userId);
    res.json({
      username: user.username,
      avatar: user.displayAvatarURL({ dynamic: true })
    });
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

