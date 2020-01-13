import products from '../../static/products.json';
import connectDb from '../../utils/connectDb';

connectDb();

export default (req, res) => {
  res.status(200).json(products);
  // console.log('req.method', req.method, res.statusCode);
};
