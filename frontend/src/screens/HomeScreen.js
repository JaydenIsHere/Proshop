import React ,{ useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import { listProduct } from '../actions/productAction'//fire off this action(function)
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

const HomeScreen = ({match}) => {//index page
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1 //it always be 1 if none
const dispatch = useDispatch()

const productList = useSelector(state => state.productList)

const {loading, error ,products, page,pages} = productList//access the payload here



useEffect(() =>{
 dispatch(listProduct(keyword,pageNumber))

},[dispatch,keyword, pageNumber])

    return (
        <>
        <Meta/>
        {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-3'>Go Back</Link>}
            <h1>Latest products</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :(
               <>
            <Row>
            {products.map( (product) => 
            (
                <Col key ={product._id}sm={12} md={6} lg={4} xl={3}>
           <Product product_card={product}/>
                </Col>
            ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </>
             )}
          
       </>
    )
}

export default HomeScreen
