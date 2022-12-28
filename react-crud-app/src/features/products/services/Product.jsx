import 'assets/App.scss'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import ProductService from 'services/Product'
import TrashIcon from 'components/elements/Icon/TrashCan'
import PenIcon from 'components/elements/Icon/Pen'

const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    const deleteProduct = (product) => {
        const response = window.confirm(`Remove product ${product.productName} ?`)
    
        if (response === true) {
        ProductService.remove(product.productId)
        .then(res => {
            if (res.status === 200) {
            setMessage(`Successfully removed product ${product.productName}.`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
    
            setTimeout(() => {setShowMessage(false)}, 5000)
            reloadNow(!reload)
            }            
                }
            )
            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000)
        
                setTimeout(() => {setShowMessage(false)}, 6000)
              })
    
        }
        else {
        setMessage('Product deletion cancelled successfully.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)
    
            setTimeout(() => {setShowMessage(false)}, 5000)
        }
    }

  return (
    <>   
            <tr>
                <td>{product.productName}</td>
                <td>{product.supplierId}</td>
                <td>{product.categoryId}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.unitsOnOrder}</td>
                <td>{product.reorderLevel}</td>
                <td>{product.discontinued.toString()}</td>
                <td>            
                    <Button clickHandler={() => editProduct(product)} startIcon={<PenIcon/>}/>
                </td>
                <td>
                    <Button clickHandler={() => deleteProduct(product)} startIcon={<TrashIcon/>}/>
                </td>
            </tr> 
    </>
  )
}

export default Product