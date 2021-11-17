import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
const Product = (props) => {//index card defination
    const {product_card} = props;
    return (
       <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product_card._id}`}>
            <Card.Img src ={product_card.image} variant='top'/>
            <Card.Body>
                <Link to={`/product/${product_card._id}`}>
                <Card.Title as ="div"><strong>{product_card.name}</strong>
                </Card.Title>
                </Link>
            <Card.Text as ="div">
        <Rating 
        value={product_card.rating} 
        text={`${product_card.numReviews} reviews`}
        />
            </Card.Text>

            <Card.Text as="h3">${product_card.price}</Card.Text>
            </Card.Body>
        </Link>
       </Card>
    )
}
export default Product
