import { Button, Segment, Divider } from 'semantic-ui-react';

function CartSummary() {
  return (
    <>
      <Divider />
      <Segment clearing size='large'>
        <strong>Sub Total:</strong> $0.00
        <Button floated='right' icon='cart' color='teal' content='Checkout' />
      </Segment>
    </>
  );
}

export default CartSummary;
