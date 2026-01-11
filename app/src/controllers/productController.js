import { validateProduct } from '../utils/validators.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../models/productsModel.js';
import { getAllCategories } from '../models/categoriesModel.js';

export async function listProducts(req, res) {
  const { q, category } = req.query;
  const [products, categories] = await Promise.all([
    getAllProducts({ q, categoryId: category }),
    getAllCategories()
  ]);
  res.render('products/list', { products, categories, q: q || '', category: category || '' });
}

export async function showCreate(req, res) {
  const categories = await getAllCategories();
  res.render('products/create', { categories, errors: [], payload: {} });
}

export async function create(req, res) {
  const payload = req.body;
  const errors = validateProduct(payload);
  if (errors.length) {
    const categories = await getAllCategories();
    return res.status(400).render('products/create', { categories, errors, payload });
  }
  const adminId = req.session.user.ID_Admin;
  await createProduct(payload, adminId);
  res.redirect('/products');
}

export async function showEdit(req, res) {
  const id = req.params.id;
  const product = await getProductById(id);
  if (!product) return res.status(404).send('Produk tidak ditemukan');
  const categories = await getAllCategories();
  res.render('products/edit', { product, categories, errors: [] });
}

export async function edit(req, res) {
  const id = req.params.id;
  const payload = req.body;
  const errors = validateProduct(payload);
  if (errors.length) {
    const product = await getProductById(id);
    const categories = await getAllCategories();
    return res.status(400).render('products/edit', { product, categories, errors });
  }
  await updateProduct(id, payload);
  res.redirect('/products');
}

export async function remove(req, res) {
  const id = req.params.id;
  await deleteProduct(id);
  res.redirect('/products');
}

export async function detail(req, res) {
  const id = req.params.id;
  const product = await getProductById(id);
  if (!product) return res.status(404).send('Produk tidak ditemukan');
  res.render('products/detail', { product });
}
