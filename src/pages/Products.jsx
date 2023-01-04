import { useState, useEffect } from 'react';
import ProductService from 'api/Product';
import Product from 'features/products/Product';
import ProductAdd from 'features/products/ProductAdd';
import ProductEdit from 'features/products/ProductEdit';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import SearchBar from 'components/elements/Search/SearchBar';
import Spinner from 'components/elements/Spinner/Spinner';
import PlusIcon from 'assets/Icon/Plus';

const Products = ({ setPositiveMessage, setShowMessage, setMessage, showSpinner }) => {
    const [products, setProducts] = useState([]);
    const [addNewMode, setAddNewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [reload, reloadNow] = useState(false);
    const [productForEdit, setProductForEdit] = useState(false);
    const [search, setSearch] = useState('');
    const [spinnerContent, setSpinnerContent] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        ProductService.setToken(token);
        showSpinner(true);
        setSpinnerContent(<Spinner spinnerVariant="primary" />);

        ProductService.getAll().then((data) => {
            setProducts(data);
            showSpinner(false);
            setSpinnerContent('');
        });
    }, [addNewMode, reload, editMode]);

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    const editProducts = (product) => {
        setProductForEdit(product);
        setEditMode(true);
    };

    return (
        <>
            <Container fluid className="bg-drinks h-25 py-2">
                <div className="pt-5">
                    <h1 className="display-3 mb-3 text-white">
                        Products <span>&#x1f6d2;</span>
                    </h1>
                    {!addNewMode && (
                        <Button
                            btnVariant="outline-secondary"
                            buttonText="Add new Product"
                            clickHandler={() => setAddNewMode(true)}
                            startIcon={<PlusIcon className="fs-4 me-2" />}
                        />
                    )}
                </div>
                <div className="m-auto w-50 my-5">
                    {!addNewMode && !editMode && (
                        <SearchBar
                            placeHolder="Search by product name"
                            searchValue={search}
                            onChangeHandler={handleSearchInputChange}
                        />
                    )}
                </div>
            </Container>

            <Container className="mt-5">
                {!addNewMode && !editMode && <div>{spinnerContent}</div>}

                {addNewMode && (
                    <ProductAdd
                        setAddNewMode={setAddNewMode}
                        setPositiveMessage={setPositiveMessage}
                        setMessage={setMessage}
                        setShowMessage={setShowMessage}
                    />
                )}

                {editMode && (
                    <ProductEdit
                        setEditMode={setEditMode}
                        setPositiveMessage={setPositiveMessage}
                        setMessage={setMessage}
                        setShowMessage={setShowMessage}
                        productForEdit={productForEdit}
                    />
                )}

                <div>
                    <Table responsive hover variant="dark" className="text-start">
                        {!addNewMode && !editMode && (
                            <thead>
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Supplier ID</th>
                                    <th scope="col">Category ID</th>
                                    <th scope="col">Quantity / Unit</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Units in Stock</th>
                                    <th scope="col">Units On Order</th>
                                    <th scope="col">Reorder Level</th>
                                    <th scope="col">Discontinued</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {!addNewMode &&
                                !editMode &&
                                products &&
                                products.map((p) => {
                                    const lowerCaseProductName = p.productName.toLowerCase();
                                    if (lowerCaseProductName.indexOf(search) > -1) {
                                        return (
                                            <Product
                                                key={p.productId}
                                                product={p}
                                                reloadNow={reloadNow}
                                                reload={reload}
                                                setPositiveMessage={setPositiveMessage}
                                                setMessage={setMessage}
                                                setShowMessage={setShowMessage}
                                                editProduct={editProducts}
                                            />
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    );
};

export default Products;
