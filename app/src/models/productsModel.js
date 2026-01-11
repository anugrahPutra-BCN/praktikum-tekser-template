import pool from '../db.js';

export async function getAllProducts({ q, categoryId }) {
  let sql = `
    SELECT p.*, k.Nama_Kategori
    FROM Produk p
    LEFT JOIN Kategori k ON p.ID_Kategori = k.ID
    WHERE 1=1
  `;
  const params = [];
  if (q) {
    sql += ` AND p.Nama_Produk LIKE ?`;
    params.push(`%${q}%`);
  }
  if (categoryId) {
    sql += ` AND p.ID_Kategori = ?`;
    params.push(Number(categoryId));
  }
  sql += ` ORDER BY p.ID_Produk DESC`;
  const [rows] = await pool.query(sql, params);
  return rows;
}

export async function getProductById(id) {
  const [rows] = await pool.query(
    `SELECT p.*, k.Nama_Kategori FROM Produk p LEFT JOIN Kategori k ON p.ID_Kategori=k.ID WHERE p.ID_Produk=?`,
    [id]
  );
  return rows[0] || null;
}

export async function createProduct(data, adminId) {
  const { Nama_Produk, Harga, Deskripsi, Stok, ID_Kategori } = data;
  const [res] = await pool.query(
    `INSERT INTO Produk (Nama_Produk, Harga, Deskripsi, Stok, ID_Admin, ID_Kategori)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [Nama_Produk, Number(Harga), Deskripsi || null, Number(Stok), adminId, ID_Kategori || null]
  );
  return res.insertId;
}

export async function updateProduct(id, data) {
  const { Nama_Produk, Harga, Deskripsi, Stok, ID_Kategori } = data;
  await pool.query(
    `UPDATE Produk SET Nama_Produk=?, Harga=?, Deskripsi=?, Stok=?, ID_Kategori=? WHERE ID_Produk=?`,
    [Nama_Produk, Number(Harga), Deskripsi || null, Number(Stok), ID_Kategori || null, id]
  );
}

export async function deleteProduct(id) {
  await pool.query(`DELETE FROM Produk WHERE ID_Produk=?`, [id]);
}
