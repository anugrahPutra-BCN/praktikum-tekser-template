import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { apiLimiter } from './middleware/rateLimit.js';
import productsRouter from './routes/products.js';
import adminRouter from './routes/admin.js';
import categoriesRouter from './routes/categories.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiLimiter);
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/public', express.static('./src/public'));

app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/categories', categoriesRouter);

app.get('/', (req, res) => res.redirect('/products'));

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
