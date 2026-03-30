const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();
const userModel = require("./models/user-model");
const fs = require('fs');

async function checkUsers() {
  await mongoose.connect(process.env.MONGODB_URI);
  const users = await userModel.find({});
  fs.writeFileSync('output.json', JSON.stringify(users, null, 2));
  process.exit(0);
}

checkUsers().catch(console.error);
