import React from 'react';
import axios from 'axios';

function Home({ products }) {
  console.log('props', products);
  React.useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const url = 'http://localhost:3000/api/products';
    const response = await axios.get(url);
    console.log('response', response.data);
  }
  return <>home</>;
}

Home.getInitialProps = async () => {
  const url = 'http://localhost:3000/api/products';
  const response = await axios.get(url);
  return { products: response.data };
  //this object will be merged with existing props
};

export default Home;
