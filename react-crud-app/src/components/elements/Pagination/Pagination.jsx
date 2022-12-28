import 'assets/App.scss'
import Pagination from 'react-bootstrap/Pagination'

const PaginationComponent = ({totalPosts, postsPerPage, paginate, currentlyActive}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
    <Pagination>
                {pageNumbers.map(number => (
                <Pagination.Item onClick={() => paginate(number)} key={number} active={currentlyActive}>
                    {number}
                </Pagination.Item>
                    ))}
      </Pagination>
  
    )
}

export default PaginationComponent