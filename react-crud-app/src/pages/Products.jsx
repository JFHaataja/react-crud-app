import {useState, useEffect} from 'react'
import ProductService from 'services/Product'
import Product from 'features/products/services/Product'
import ProductAdd from 'features/products/services/ProductAdd'
import ProductEdit from 'features/products/services/ProductEdit'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import SearchBar from 'components/elements/Search/SearchBar'
import Spinner from 'components/elements/Spinner/Spinner'
import PlusIcon from 'components/elements/Icon/Plus'
import Pagination from 'components/elements/Pagination/Pagination'

const Products = ({setIsPositive, setShowMessage, setMessage}) => {

    const [products, setProducts] = useState([])
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaProduct, setMuokattavaProduct] = useState(false)
    const [search, setSearch] = useState("")
    const [spinnerContent, setSpinnerContent] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    useEffect(() => {       
        const token = localStorage.getItem('token')
        ProductService.setToken(token)
        
        setSpinnerContent(<Spinner spinnerVariant="primary"/>)
           
        ProductService.getAll()
        .then(data => {
            setProducts(data)
            setSpinnerContent('')
        })
    },[lisäystila, reload, muokkaustila]
    )

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }

    const editProducts = (product) => {
        setMuokattavaProduct(product)
        setMuokkaustila(true)
    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


  return (
    <>
    <Container fluid className='bg-CustomersHeroCard h-25 py-2'>
        <div className='pt-5'>
            <h1 className='display-3 mb-3 text-white'>Products <span>&#x1f6d2;</span></h1>
            {!lisäystila && <Button btnVariant={'outline-secondary'} buttonText={"Add new Product"} clickHandler={() => setLisäystila(true)} startIcon={<PlusIcon className='fs-4 me-2'/>}/>}
        </div>
        <div className='m-auto w-50 my-5'>
            {!lisäystila && !muokkaustila && <SearchBar placeHolder={"Search by product name"} searchValue={search} onChangeHandler={handleSearchInputChange} />}    
        </div>
    </Container>

    <Container className='mt-5'>

        {!lisäystila && !muokkaustila &&
            <div>
                {spinnerContent}
            </div>} 
        
        {lisäystila && <ProductAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}

        {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} muokattavaProduct={muokattavaProduct}/>}

        <div>
            <Table responsive hover variant="dark" className='text-start'>

                {!lisäystila && !muokkaustila &&
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
                }
                <tbody>
            {
                !lisäystila && !muokkaustila && products && currentPosts.map(p => 
                    {           
                        const lowerCaseProductName = p.productName.toLowerCase()
                                if(lowerCaseProductName.indexOf(search) > -1){
                                return (                                   
                                    <Product key={p.productId} product={p} reloadNow={reloadNow} reload={reload}
                                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                                    editProduct={editProducts}/>
                                )}
                        else {
                            return (null)
                        }
                    
                    })
            }
                </tbody>
                </Table>
                {!lisäystila && !muokkaustila &&
                    <Pagination postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate} />
                }
        </div>
    </Container>
    </>
  )}

export default Products