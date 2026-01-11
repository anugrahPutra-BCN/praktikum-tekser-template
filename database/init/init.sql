-- Admin
CREATE TABLE IF NOT EXISTS Admin (
  ID_Admin INT AUTO_INCREMENT PRIMARY KEY,
  Nama_Admin VARCHAR(100) NOT NULL,
  Username VARCHAR(100) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL
);

-- Kategori
CREATE TABLE IF NOT EXISTS Kategori (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Nama_Kategori VARCHAR(100) NOT NULL UNIQUE
);

-- Produk
CREATE TABLE IF NOT EXISTS Produk (
  ID_Produk INT AUTO_INCREMENT PRIMARY KEY,
  Nama_Produk VARCHAR(150) NOT NULL,
  Harga INT NOT NULL CHECK (Harga >= 0),
  Deskripsi TEXT,
  Tanggal_Input DATE NOT NULL DEFAULT (CURRENT_DATE),
  Stok INT NOT NULL DEFAULT 0 CHECK (Stok >= 0),
  ID_Admin INT NOT NULL,
  ID_Kategori INT,
  CONSTRAINT fk_produk_admin FOREIGN KEY (ID_Admin) REFERENCES Admin(ID_Admin) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_produk_kategori FOREIGN KEY (ID_Kategori) REFERENCES Kategori(ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Seed admin (hash bcrypt contoh; ganti via aplikasi)
INSERT INTO Admin (Nama_Admin, Username, Password)
VALUES ('Super Admin', 'admin', '$2b$10$Qf0kqkqkqkqkqkqkqkqkqO8o8o8o8o8o8o8o8o8o8o8o8o8o8o');

-- Seed kategori
INSERT INTO Kategori (Nama_Kategori) VALUES
('Elektronik'), ('Fashion'), ('Makanan'), ('Aksesoris')
ON DUPLICATE KEY UPDATE Nama_Kategori=VALUES(Nama_Kategori);

-- Seed produk
INSERT INTO Produk (Nama_Produk, Harga, Deskripsi, Stok, ID_Admin, ID_Kategori)
VALUES
('Earphone Bass', 150000, 'Earphone dengan bass mantap', 20, 1, 1),
('Kaos Polos', 75000, 'Kaos polos nyaman', 50, 1, 2),
('Keripik Pedas', 25000, 'Keripik pedas level 3', 100, 1, 3)
ON DUPLICATE KEY UPDATE Nama_Produk=VALUES(Nama_Produk);
