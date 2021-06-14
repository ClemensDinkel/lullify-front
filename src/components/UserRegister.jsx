import { Card, Col, Form, FormControl, Button } from 'react-bootstrap'
import { register } from './AuthFunctions';


const UserRegister = () => {
    return (
        <>
        <p>User Registraion</p>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First name" name="first_name"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last name" name="last_name"/>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="Enter User name" name="user_name" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form.Row>
            </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default UserRegister