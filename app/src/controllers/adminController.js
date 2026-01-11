import bcrypt from 'bcrypt';
import { findAdminByUsername, createAdmin } from '../models/adminModel.js';

export function showLogin(req, res) {
  res.render('admin/login', { error: null });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const admin = await findAdminByUsername(username);
  if (!admin) return res.status(401).render('admin/login', { error: 'Username atau password salah' });

  const ok = await bcrypt.compare(password, admin.Password);
  if (!ok) return res.status(401).render('admin/login', { error: 'Username atau password salah' });

  req.session.user = { ID_Admin: admin.ID_Admin, Nama_Admin: admin.Nama_Admin, Username: admin.Username };
  res.redirect('/admin/dashboard');
}

export function logout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}

export async function showDashboard(req, res) {
  res.render('admin/dashboard', { user: req.session.user });
}
