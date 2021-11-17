import React, { useEffect }from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import{ Button, Table,Row,Col} from 'react-bootstrap'
import { listProduct,listproductDelete, listproductCreate  } from '../actions/productAction'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'
const ProdctListScreen = ({history,match}) => {
    const pageNumber = match.params.pageNumber
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { products,loading,error ,page,pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { success:successDelete ,loading:loadingDelete,error:errorDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { success:successCreate ,error:errorCreate,product:createProduct} = productCreate

    useEffect(() =>{
        dispatch({type:PRODUCT_CREATE_RESET})//prevent duplicate create
        if(!userInfo.isAdmin)
        {
           history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createProduct._id}/edit`)
        }else{
            dispatch(listProduct('',pageNumber))//admin don't need keyword
        }
        
    },[dispatch,history,userInfo,successDelete,successCreate,createProduct,pageNumber])

    const deleteHandler = (id) =>{
        if(window.confirm('Are You Sure To Delete ?'))
        {
            dispatch(listproductDelete(id))
        }
    }
    const createProductHandler = () =>{
dispatch(listproductCreate())
    }
    return (
        <>

        <Row>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-end'>
           <Button className='my-3' onClick={createProductHandler}>
             <i className='fas fa-plus'></i>  Create Product
           </Button>
            </Col>
        </Row>
    
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>NAME</th>
                         <th>PRICE</th>
                         <th>CATEGORY</th>
                         <th>BRAND</th>
                         <th></th> 
                        </tr>
                   </thead>
                        <tbody>
                            {products.map((product) =>(
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                    
                                    <Button variant='danger' classNmae='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>     
                                    </Button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}/>
                </>
            )} 
        </>
    )
}

export default ProdctListScreen
