import pool from '../db.js';

export async function findAdminByUsername(username) {
  const [rows] = await pool.query(`SELECT * FROM Admin WHERE Username=?`, [username]);
  return rows[0] || null;
}

export async function createAdmin({ Nama_Admin, Username, PasswordHash }) {
  const [res] = await pool.query(
    `INSERT INTO Admin (Nama_Admin, Username, Password) VALUES (?, ?, ?)`,
    [Nama_Admin, Username, PasswordHash]
  );
  return res.insertId;
}
