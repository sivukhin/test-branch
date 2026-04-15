import { connect } from "@tursodatabase/serverless";

const conn = connect({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function init() {
  await conn.exec(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)"
  );
  await conn.exec(
    "INSERT INTO users(name, email) VALUES ('c', 'd')"
  );
}

export default async function handler(req, res) {
    console.info(process.env.TURSO_DATABASE_URL);
    console.info(process.env.TURSO_AUTH_TOKEN);
  try {
    await init();
    const result = await conn.execute("SELECT * FROM users LIMIT 100");
    res.status(200).json({ rows: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
