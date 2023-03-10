import 'assets/App.scss';
import { useState } from 'react';
import ProductService from 'api/Product';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'components/elements/Form/FormGroup/FormGroup';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import RadioButton from 'components/elements/Button/RadioButton/RadioButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowLeft from 'assets/Icon/ArrowLeft';

const ProductAdd = ({ setAddNewMode, setPositiveMessage, setMessage, setShowMessage }) => {
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
                    setPositiveMessage(true);
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
                setPositiveMessage(false);
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
                            formGroupControlId="ProductName"
                        />
                        <FormGroup
                            formLabelText={'Supplier ID'}
                            inputType="text"
                            inputValue={newProductSupplierId}
                            inputPlaceholder="Supplier ID"
                            onChangeHandler={({ target }) => setNewProductSupplierId(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="SupplierId"
                        />
                        <FormGroup
                            formLabelText={'Category ID'}
                            inputType="text"
                            inputValue={newProductCategoryId}
                            inputPlaceholder="Category ID"
                            onChangeHandler={({ target }) => setNewProductCategoryId(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="CategoryId"
                        />
                        <FormGroup
                            formLabelText={'Quantity Per Unit'}
                            inputType="text"
                            inputValue={newQuantityPerUnit}
                            inputPlaceholder="Quantity Per Unit"
                            onChangeHandler={({ target }) => setNewQuantityPerUnit(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="QuantityPerUnit"
                        />
                        <FormGroup
                            formLabelText={'Unit Price'}
                            inputType="text"
                            inputValue={newProductUnitPrice}
                            inputPlaceholder="Unit Price"
                            onChangeHandler={({ target }) => setNewProductUnitPrice(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="UnitPrice"
                        />
                        <FormGroup
                            formLabelText={'Units In Stock'}
                            inputType="text"
                            inputValue={newProductUnitsInStock}
                            inputPlaceholder="Units In Stock"
                            onChangeHandler={({ target }) =>
                                setNewProductUnitsInStock(target.value)
                            }
                            requiredOrNot={true}
                            formGroupControlId="UnitsInStock"
                        />
                        <FormGroup
                            formLabelText={'Units On Order'}
                            inputType="text"
                            inputValue={newProductUnitsOnOrder}
                            inputPlaceholder="Units On Order"
                            onChangeHandler={({ target }) =>
                                setNewProductUnitsOnOrder(target.value)
                            }
                            requiredOrNot={true}
                            formGroupControlId="UnitsOnOrder"
                        />
                        <FormGroup
                            formLabelText={'Reorder Level'}
                            inputType="text"
                            inputValue={newProductReorderLevel}
                            inputPlaceholder="Reorder Level"
                            onChangeHandler={({ target }) =>
                                setNewProductReorderLevel(target.value)
                            }
                            requiredOrNot={true}
                            formGroupControlId="ReorderLevel"
                        />
                        <div
                            onChange={({ target }) =>
                                setNewProductDiscontinued(parseInt(target.value))
                            }
                        >
                            <div>
                                <p className="mb-2">Discontinued</p>
                            </div>
                            <div className="mb-2">
                                <RadioButton
                                    rBId={'radio01'}
                                    rBName={newProductDiscontinued.toString()}
                                    defaultValue={1}
                                    checkedOrNot={radioButtonValue === 1}
                                    onChangeHandler={() => setRadioButtonValue(1)}
                                    rBLabel={'True'}
                                />
                            </div>
                            <div>
                                <RadioButton
                                    rBId={'radio02'}
                                    rBName={newProductDiscontinued.toString()}
                                    defaultValue={0}
                                    checkedOrNot={radioButtonValue === 0}
                                    onChangeHandler={() => setRadioButtonValue(0)}
                                    rBLabel={'False'}
                                />
                            </div>
                        </div>
                        <div className="d-flex mt-5 justify-content-end">
                            <Button
                                btnVariant="primary"
                                btnType="submit"
                                buttonText="Confirm and Save"
                            />
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default ProductAdd;
