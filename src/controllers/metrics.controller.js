const db = require("../db");

exports.getOverview = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        COALESCE(SUM(doses_administered), 0) AS total_doses,
        COUNT(*) AS total_records,
        COUNT(DISTINCT region) AS regions_covered,
        MIN(date_recorded) AS from_date,
        MAX(date_recorded) AS to_date
      FROM vaccination_data
    `);

    const stats = result.rows[0];

    res.json({
      totalDoses: Number(stats.total_doses),
      totalRecords: Number(stats.total_records),
      regionsCovered: Number(stats.regions_covered),
      from: stats.from_date,
      to: stats.to_date
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load overview stats" });
  }
};

exports.getByRegion = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        region,
        SUM(doses_administered) AS total_doses,
        COUNT(*) AS records
      FROM vaccination_data
      GROUP BY region
      ORDER BY region
    `);

    res.json(
      result.rows.map(row => ({
        region: row.region,
        totalDoses: Number(row.total_doses),
        records: Number(row.records)
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load region stats" });
  }
};

exports.getByAgeGroup = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        age_group,
        SUM(doses_administered) AS total_doses,
        COUNT(*) AS records
      FROM vaccination_data
      GROUP BY age_group
      ORDER BY age_group
    `);

    res.json(
      result.rows.map(row => ({
        ageGroup: row.age_group,
        totalDoses: Number(row.total_doses),
        records: Number(row.records)
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load age group stats" });
  }
};

exports.getTimeSeries = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        date_recorded AS date,
        SUM(doses_administered) AS total_doses
      FROM vaccination_data
      GROUP BY date_recorded
      ORDER BY date_recorded
    `);

    res.json(
      result.rows.map(row => ({
        date: row.date.toISOString().split("T")[0],
        totalDoses: Number(row.total_doses)
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load time series data" });
  }
};

exports.getByGender = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        gender,
        SUM(doses_administered) AS total_doses,
        COUNT(*) AS records
      FROM vaccination_data
      GROUP BY gender
      ORDER BY gender
    `);

    res.json(
      result.rows.map(row => ({
        gender: row.gender,
        totalDoses: Number(row.total_doses),
        records: Number(row.records)
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load gender stats" });
  }
};
