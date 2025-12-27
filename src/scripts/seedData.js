const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});
const fs = require("fs");
const db = require("../db");

async function seed() {
  const filePath = path.join(__dirname, "coverage_data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const row of data) {
    await db.query(
      `
      INSERT INTO coverage_data
      (region, age_group, gender, date, doses_administered, coverage_percentage)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        row.region,
        row.age_group,
        row.gender,
        row.date,
        row.doses_administered,
        row.coverage_percentage
      ]
    );
  }

  console.log("✅ Coverage data seeded successfully");
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
