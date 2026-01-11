import { getAllCategories } from '../models/categoriesModel.js';

export async function listCategories(req, res) {
  const categories = await getAllCategories();
  res.json(categories);
}
