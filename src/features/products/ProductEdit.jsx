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

const ProductEdit = ({
    setEditMode,
    setIsPositive,
    setMessage,
    setShowMessage,
    productForEdit,
}) => {
    const [newProductId] = useState(productForEdit.productId);
    const [newProductName, setNewProductName] = useState(productForEdit.productName);
    const [newProductSupplierId, setNewProductSupplierId] = useState(productForEdit.supplierId);
    const [newProductCategoryId, setNewProductCategoryId] = useState(productForEdit.categoryId);
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(productForEdit.quantityPerUnit);
    const [newProductUnitPrice, setNewProductUnitPrice] = useState(productForEdit.unitPrice);
    const [newProductUnitsInStock, setNewProductUnitsInStock] = useState(
        productForEdit.unitsInStock
    );
    const [newProductUnitsOnOrder, setNewProductUnitsOnOrder] = useState(
        productForEdit.unitsOnOrder
    );
    const [newProductReorderLevel, setNewProductReorderLevel] = useState(
        productForEdit.reorderLevel
    );
    const [newProductDiscontinued, setNewProductDiscontinued] = useState(
        productForEdit.discontinued
    );
    const [radioButtonValue, setRadioButtonValue] = useState(productForEdit.discontinued ? 1 : 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            productId: newProductId,
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

        ProductService.update(newProduct)
            .then((response) => {
                if (response.status === 200) {
                    setMessage('Edited Product: ' + newProduct.productName);
                    setIsPositive(true);
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 5000);
                    setEditMode(false);
                }
            })
            .catch((error) => {
                setMessage(error);
                setIsPositive(false);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 6000);
            });
    };

    return (
        <Container className="mt-4">
            <h2 className="text-white mb-3">Edit Product</h2>
            <Button
                btnVariant="outline-primary"
                btnType={'button'}
                buttonText="Go Back"
                clickHandler={() => setEditMode(false)}
                startIcon={<ArrowLeft />}
            />
            <Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
                <Row>
                    <Col className="mx-0 mx-lg-5 px-0 px-lg-5">
                        {/* <FormGroup formLabelText={"Product ID"} inputType="text" inputValue={newProductId} inputPlaceholder="Product ID" disabled /> */}
                        <FormGroup
                            formLabelText={'Product Name'}
                            inputType="text"
                            inputValue={newProductName}
                            inputPlaceholder="Product Name"
                            onChangeHandler={({ target }) => setNewProductName(target.value)}
                        />
                        <FormGroup
                            formLabelText={'Supplier ID'}
                            inputType="number"
                            inputValue={newProductSupplierId}
                            inputPlaceholder="Supplier ID"
                            onChangeHandler={({ target }) => setNewProductSupplierId(target.value)}
                        />
                        <FormGroup
                            formLabelText={'Category ID'}
                            inputType="number"
                            inputValue={newProductCategoryId}
                            inputPlaceholder="Category ID"
                            onChangeHandler={({ target }) => setNewProductCategoryId(target.value)}
                        />
                        <FormGroup
                            formLabelText={'Quantity Per Unit'}
                            inputType="text"
                            inputValue={newQuantityPerUnit}
                            inputPlaceholder="Quantity Per Unit"
                            onChangeHandler={({ target }) => setNewQuantityPerUnit(target.value)}
                        />
                        <FormGroup
                            formLabelText={'Unit Price'}
                            inputType="text"
                            inputValue={newProductUnitPrice}
                            inputPlaceholder="Unit Price"
                            onChangeHandler={({ target }) => setNewProductUnitPrice(target.value)}
                        />
                        <FormGroup
                            formLabelText={'Units In Stock'}
                            inputType="text"
                            inputValue={newProductUnitsInStock}
                            inputPlaceholder="Units In Stock"
                            onChangeHandler={({ target }) =>
                                setNewProductUnitsInStock(target.value)
                            }
                        />
                        <FormGroup
                            formLabelText={'Units On Order'}
                            inputType="text"
                            inputValue={newProductUnitsOnOrder}
                            inputPlaceholder="Units On Order"
                            onChangeHandler={({ target }) =>
                                setNewProductUnitsOnOrder(target.value)
                            }
                        />
                        <FormGroup
                            formLabelText={'Reorder Level'}
                            inputType="text"
                            inputValue={newProductReorderLevel}
                            inputPlaceholder="Reorder Level"
                            onChangeHandler={({ target }) =>
                                setNewProductReorderLevel(target.value)
                            }
                        />
                        <div>
                            <p className="mb-2">Discontinued</p>
                        </div>
                        <div
                            onChange={({ target }) =>
                                setNewProductDiscontinued(parseInt(target.value))
                            }
                        >
                            <div className="mb-2">
                                <input
                                    className="form-check-input me-2"
                                    id="radio1"
                                    type="radio"
                                    name={newProductDiscontinued.toString()}
                                    defaultValue={1}
                                    defaultChecked={radioButtonValue === 1}
                                    onChange={() => setRadioButtonValue(1)}
                                />
                                <label className="form-check-label" htmlFor="radio1">
                                    True
                                </label>
                            </div>
                            <div>
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    id="radio2"
                                    name={newProductDiscontinued.toString()}
                                    defaultValue={0}
                                    defaultChecked={radioButtonValue === 0}
                                    onChange={() => setRadioButtonValue(0)}
                                />
                                <label className="form-check-label" htmlFor="radio2">
                                    False
                                </label>
                            </div>
                        </div>
                        <div className="d-flex mt-1 me-0 pe-0 justify-content-end">
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

export default ProductEdit;
