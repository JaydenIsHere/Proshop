import React from 'react'
import {Row,Col,Container} from'react-bootstrap'
const FormConstainer = ({ children}) => {
    return (
        <Container>
            <Row className="justify-content-md-center">
<Col xs={12} md={6}>
    {children}
    {/* all the form is going here as the children */}
</Col>
            </Row>
        </Container>
    )
}

export default FormConstainer
