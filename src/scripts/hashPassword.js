const bcrypt = require("bcrypt");

async function hashPassword() {
  const hashed = await bcrypt.hash("password123", 10);
  console.log("Hashed password:");
  console.log(hashed);
}

hashPassword();
