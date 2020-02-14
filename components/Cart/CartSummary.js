import { Button, Segment, Divider } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ products, handleCheckout, success }) {
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    if (products.length === 0) {
      setCartEmpty(true);
    }
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size='large'>
        <strong>Sub total:</strong> ${cartAmount}
        <StripeCheckout
          name='React Reserve'
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ' '}
          currency='USD'
          shippingAddress
          billingAddress
          zipCode
          stripeKey='pk_test_fXMqpcA6hDDIxCIxWtFcNyLq00LUPUvRUe'
          token={handleCheckout}
          triggerEvent='onClick'
        >
          <Button
            disabled={isCartEmpty || success}
            icon='cart'
            color='teal'
            floated='right'
            content='Checkout'
          />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
