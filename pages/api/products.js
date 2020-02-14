// import products from "../../static/products.json";
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const { page, size } = req.query;
  // convert the querystring values to numbers
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products;
  const totalProductCount = await Product.countDocuments();
  const totalPages = Math.ceil(totalProductCount / pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = (pageNum - 1) * pageSize;
    products = await Product.find()
      .skip(skips)
      .limit(pageSize);
  }
  // const products = await Product.find();
  res.status(200).json({ products, totalPages });
};
