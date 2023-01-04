import 'assets/App.scss';
import { useState } from 'react';
import ProductService from 'api/Product';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowLeft from 'assets/Icon/ArrowLeft';

const ProductAdd = ({ setAddNewMode, setIsPositive, setMessage, setShowMessage }) => {
  const [newProductName, setNewProductName] = useState('');
  const [newProductSupplierId, setNewProductSupplierId] = useState('');
  const [newProductCategoryId, setNewProductCategoryId] = useState('');
  const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('');
  const [newProductUnitPrice, setNewProductUnitPrice] = useState('');
  const [newProductUnitsInStock, setNewProductUnitsInStock] = useState('');
  const [newProductUnitsOnOrder, setNewProductUnitsOnOrder] = useState('');
  const [newProductReorderLevel, setNewProductReorderLevel] = useState('');
  const [newProductDiscontinued, setNewProductDiscontinued] = useState(0);
  const [radioButtonValue, setRadioButtonValue] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      productName: newProductName,
      supplierId: parseInt(newProductSupplierId),
      categoryId: parseInt(newProductCategoryId),
      quantityPerUnit: newQuantityPerUnit,
      unitPrice: newProductUnitPrice,
      unitsInStock: newProductUnitsInStock,
      unitsOnOrder: newProductUnitsOnOrder,
      reorderLevel: newProductReorderLevel,
      discontinued: Boolean(newProductDiscontinued),
    };

    ProductService.create(newProduct)
      .then((response) => {
        if (response.status === 200 && newProduct.productName !== null) {
          setMessage(`Added new Product: ${newProduct.productName}`);
          setIsPositive(true);
          setShowMessage(true);
          window.scrollBy(0, -10000);
          setTimeout(() => {
            setShowMessage(false);
          }, 5000);
          setAddNewMode(false);
        }
      })

      .catch((error) => {
        setMessage(error);
        setIsPositive(false);
        setShowMessage(true);
        window.scrollBy(0, -10000);
        setTimeout(() => {
          setShowMessage(false);
        }, 6000);
      });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-white mb-3">Add New Product</h2>
      <Button
        btnVariant="outline-primary"
        btnType="button"
        buttonText="Go Back"
        clickHandler={() => setAddNewMode(false)}
        startIcon={<ArrowLeft />}
      />
      <Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
        <Row>
          <Col className="mx-0 mx-lg-5 px-0 px-lg-5">
            <FormGroup
              formLabelText={'Product Name'}
              inputType="text"
              inputValue={newProductName}
              inputPlaceholder="Product Name"
              onChangeHandler={({ target }) => setNewProductName(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText={'Supplier ID'}
              inputType="text"
              inputValue={newProductSupplierId}
              inputPlaceholder="Supplier ID"
              onChangeHandler={({ target }) => setNewProductSupplierId(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText={'Category ID'}
              inputType="text"
              inputValue={newProductCategoryId}
              inputPlaceholder="Category ID"
              onChangeHandler={({ target }) => setNewProductCategoryId(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText={'Quantity Per Unit'}
              inputType="text"
              inputValue={newQuantityPerUnit}
              inputPlaceholder="Quantity Per Unit"
              onChangeHandler={({ target }) => setNewQuantityPerUnit(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText={'Unit Price'}
              inputType="text"
              inputValue={newProductUnitPrice}
              inputPlaceholder="Unit Price"
              onChangeHandler={({ target }) => setNewProductUnitPrice(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText={'Units In Stock'}
              inputType="text"
              inputValue={newProductUnitsInStock}
              inputPlaceholder="Units In Stock"
              onChangeHandler={({ target }) => setNewProductUnitsInStock(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText={'Units On Order'}
              inputType="text"
              inputValue={newProductUnitsOnOrder}
              inputPlaceholder="Units On Order"
              onChangeHandler={({ target }) => setNewProductUnitsOnOrder(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText={'Reorder Level'}
              inputType="text"
              inputValue={newProductReorderLevel}
              inputPlaceholder="Reorder Level"
              onChangeHandler={({ target }) => setNewProductReorderLevel(target.value)}
              requiredOrNot={true}
            />
            <div>
              <p className="mb-2">Discontinued</p>
            </div>
            <div onChange={({ target }) => setNewProductDiscontinued(parseInt(target.value))}>
              <div className="mb-2">
                <input
                  className="form-check-input me-2"
                  id="radio01"
                  type="radio"
                  name={newProductDiscontinued.toString()}
                  defaultValue={1}
                  checked={radioButtonValue === 1}
                  onChange={() => setRadioButtonValue(1)}
                />
                <label className="form-check-label" htmlFor="radio01">
                  True
                </label>
              </div>
              <div>
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name={newProductDiscontinued.toString()}
                  defaultValue={0}
                  checked={radioButtonValue === 0}
                  onChange={() => setRadioButtonValue(0)}
                />
                <label className="form-check-label" htmlFor="radio02">
                  False
                </label>
              </div>
            </div>
            <div className="d-flex mt-5 justify-content-end">
              <Button btnVariant="primary" btnType="submit" buttonText="Confirm and Save" />
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProductAdd;
