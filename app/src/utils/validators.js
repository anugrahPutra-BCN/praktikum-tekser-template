export function validateProduct(payload) {
  const errors = [];
  const { Nama_Produk, Harga, Deskripsi, Stok, ID_Kategori } = payload;

  if (!Nama_Produk || Nama_Produk.trim().length < 2) errors.push('Nama produk minimal 2 karakter');
  if (Harga === undefined || isNaN(Number(Harga)) || Number(Harga) < 0) errors.push('Harga harus angka >= 0');
  if (Stok === undefined || isNaN(Number(Stok)) || Number(Stok) < 0) errors.push('Stok harus angka >= 0');
  if (ID_Kategori && isNaN(Number(ID_Kategori))) errors.push('Kategori tidak valid');

  return errors;
}
