const port = process.env.PORT
const Discord = require("discord.js")
const client = new Discord.Client()
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const btoa = require('btoa');
var i = 0;

const app = express();

import LocalStorageParser from 'local-storage-parser';

const lsParser = new LocalStorageParser('xp');

lsParser.set({
    timestamp: Date.now(),
    active: false
});

console.info(lsParser.get());

lsParser.set({
    active: true
});

console.info(lsParser.get());

lsParser.remove();

console.info(lsParser.get());
app.set('view engine', 'ejs')

const CLIENT_ID = process.env.CLIENT_ID; // your bot's ID !
const CLIENT_SECRET = process.env. CLIENT_SECRET; // your bot's client secret   

const redirect = encodeURIComponent('http://agentx.gq:5000/server/callback');

app.get("/", (req, res) => {
// res.sendFile(path.join(__dirname, "home.html"));
  res.render("home")
})

app.get("/manage/:gld/:user", async (req, res) => {
  let guild = req.params.gld;
  let user = req.params.user;
  let vguild = client.guilds.get(guild);
  // let vuser = client.users.get(user)
  
  if(!vguild) {
   res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot`);
  } else {
  let ug = vguild.members.get(user)

  if(ug.hasPermission("MANAGE_GUILD") || ug.hasPermission("ADMINISTRATOR")) {
 res.render('manage', {user: ug, guild: vguild, client: client});
 } else {
   res.redirect("/")

}

  }
  
  });
app.get("/manage/:gld/:user/colors", (req, res) => {
let guild = req.query.gld;
  let user = req.query.user;
    let vguild = client.guilds.get(guild);
 if(!vguild) {
  res.redirect("/")
  } else {
  let ug = vguild.members.get(user)

  if(ug.hasPermission("MANAGE_GUILD") || ug.hasPermission("ADMINISTRATOR")) {
 res.send("done")
 } else {
   res.redirect("/")

}

  }

})
app.listen(port)
async function getUser(token) {
  const myRes = await fetch("https://discordapp.com/api/users/@me",
         {
           method: 'GET',
           'content-Type': 'x-www-form-urlencoded',
           headers: {
             Authorization: "Bearer "+token,
           },
         });
  return myRes.json();
  }
  
  
  async function getGuilds(token) {
    const myGuildsRes = await fetch(`https://discordapp.com/api/users/@me/guilds`,
    {
      method: 'GET',
      'content-Type': 'x-www-form-urlencoded',
      headers: {
        Authorization: "Bearer "+token,
      },
    });
    return myGuildsRes.json()
  }

client.login(process.env.BOT_TOKEN)
