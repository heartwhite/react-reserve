import { useState, useEffect } from 'react';
import { Button, Input, TextArea, Image, Icon, Header, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: '',
  price: '0',
  media: '',
  description: '',
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // const { name, price, media, description } = product;
    // if (!name || !price || !media || !description) {
    //   return;
    // } else {
    //   setSubmitDisabled(false);
    // }

    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [product]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === 'media') {
      setProduct({ ...product, media: files[0] });
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct({ ...product, [name]: value });
    }
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const payload = { ...product, mediaUrl };
      const response = await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'reactReserve');
    data.append('cloud_name', 'djyqatccv');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  return (
    <>
      <Header as='h2' block>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message success icon='check' header='Success' content='Your product has been posted' />
        <Message error header='Ooops!' content={error} />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='name'
            label='Name'
            placeholder='Name'
            type='text'
            onChange={handleChange}
            value={product.name}
          />
          <Form.Field
            control={Input}
            name='price'
            label='price'
            placeholder='price'
            type='text'
            min='0.00'
            step='0.01'
            type='number'
            onChange={handleChange}
            value={product.price}
          />
          <Form.Field
            control={Input}
            name='media'
            label='Media'
            content='Select Image'
            accept='image/*'
            type='file'
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small' />
        <Form.Field
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Description'
          type='text'
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          disabled={loading || submitDisabled}
          color='blue'
          icon='pencil alternate'
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  );
}

export default CreateProduct;
