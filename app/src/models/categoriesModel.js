import pool from '../db.js';

export async function getAllCategories() {
  const [rows] = await pool.query(`SELECT * FROM Kategori ORDER BY Nama_Kategori ASC`);
  return rows;
}
