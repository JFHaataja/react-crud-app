import 'assets/App.scss'
import {useState} from 'react'
import ProductService from 'services/Product'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArrowLeft from 'components/elements/Icon/ArrowLeft'

const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys
const [newProductName, setNewProductName] = useState('')
const [newProductSupplierId, setNewProductSupplierId] = useState(1)
const [newProductCategoryId, setNewProductCategoryId] = useState(1)
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState()
const [newProductUnitPrice, setNewProductUnitPrice] = useState(0)
const [newProductUnitsInStock, setNewProductUnitsInStock] = useState(0)
const [newProductUnitsOnOrder, setNewProductUnitsOnOrder] = useState(0)
const [newProductReorderLevel, setNewProductReorderLevel] = useState(0)
const [newProductDiscontinued, setNewProductDiscontinued] = useState(false)
const [radioButtonValue, setRadioButtonValue] = useState(0)

const handleSubmit = (event) => {
      event.preventDefault()
      const newProduct = {
        // productId: newProductId,
        productName: newProductName,
        supplierId: parseInt(newProductSupplierId),
        categoryId: parseInt(newProductCategoryId),
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: newProductUnitPrice,
        unitsInStock: newProductUnitsInStock,
        unitsOnOrder: newProductUnitsOnOrder,
        reorderLevel: newProductReorderLevel,
        discontinued: Boolean(newProductDiscontinued)
    }
   
      ProductService.create(newProduct).then(response => {
        if (response.status === 200) {          
         setMessage(`Added new Product: ${newProduct.productName}`)
         setIsPositive(true)
         setShowMessage(true)
         window.scrollBy(0, -10000)
         setTimeout(() => {setShowMessage(false)}, 5000) 
         setLisäystila(false)}})
         
        .catch(error => {
          setMessage(error)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000)
          setTimeout(() => {setShowMessage(false)}, 6000)
        })
    }
  return (

<Container className='mt-4'>
<h2 className='text-white mb-3'>Add New Product</h2>
<Button btnVariant={"outline-primary"} btnType={'button'} buttonText='Go Back' clickHandler={() => setLisäystila(false)} startIcon={<ArrowLeft/>} />
<Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
 <Row>
   <Col className="mx-0 mx-lg-5 px-0 px-lg-5">
         <FormGroup formLabelText={"Product Name"} inputType="text" inputValue={newProductName} inputPlaceholder="Product Name" onChangeHandler={({ target }) => setNewProductName(target.value)} />
         <FormGroup formLabelText={"Supplier ID"} inputType="number" inputValue={newProductSupplierId} inputPlaceholder="Supplier ID" onChangeHandler={({ target }) => setNewProductSupplierId(target.value)} />
         <FormGroup formLabelText={"Category ID"} inputType="number" inputValue={newProductCategoryId} inputPlaceholder="Category ID" onChangeHandler={({ target }) => setNewProductCategoryId(target.value)} />
         <FormGroup formLabelText={"Quantity Per Unit"} inputType="text" inputValue={newQuantityPerUnit} inputPlaceholder="Quantity Per Unit" onChangeHandler={({ target }) => setNewQuantityPerUnit(target.value)} />
         <FormGroup formLabelText={"Unit Price"} inputType="text" inputValue={newProductUnitPrice} inputPlaceholder="Unit Price" onChangeHandler={({ target }) => setNewProductUnitPrice(target.value)} />
         <FormGroup formLabelText={"Units In Stock"} inputType="text" inputValue={newProductUnitsInStock} inputPlaceholder="Units In Stock" onChangeHandler={({ target }) => setNewProductUnitsInStock(target.value)} />
         <FormGroup formLabelText={"Units On Order"} inputType="text" inputValue={newProductUnitsOnOrder} inputPlaceholder="Units On Order" onChangeHandler={({ target }) => setNewProductUnitsOnOrder(target.value)} />
         <FormGroup formLabelText={"Reorder Level"} inputType="string" inputValue={newProductReorderLevel} inputPlaceholder="Reorder Level" onChangeHandler={({ target }) => setNewProductReorderLevel(target.value)} />
         {/* <FormGroup formLabelText={"Discontinued"} inputType="string" inputValue={newProductDiscontinued} inputPlaceholder="Discontinued" onChangeHandler={({ target }) => setNewProductDiscontinued(target.value)} /> */}
         <div>
            <p className="mb-2">Discontinued</p>
        </div>
         <div onChange={({ target }) => setNewProductDiscontinued(parseInt(target.value))}>
            <div className='mb-2'>
                <input className='form-check-input me-2' id="radio01" type="radio" name={newProductDiscontinued.toString()} defaultValue={1} checked={radioButtonValue === 1} onChange={() => setRadioButtonValue(1)}/>
                <label className="form-check-label" htmlFor='radio01'>True</label>
            </div>
            <div>
              <input className='form-check-input me-2' type="radio" id="radio02" name={newProductDiscontinued.toString()} defaultValue={0} checked={radioButtonValue === 0} onChange={() => setRadioButtonValue(0)}/>
              <label className="form-check-label" htmlFor='radio02'>False</label>
            </div>
          </div>
     <div className='d-flex mt-5 justify-content-end'>
       <Button btnVariant={"primary"} btnType='submit' buttonText={'Confirm and Save'}/>
     </div>
   </Col>
 </Row>
</Form>
</Container>
  )
}

export default ProductAdd