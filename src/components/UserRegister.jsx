import { Card, Col, Form, FormControl, Button } from 'react-bootstrap'
import { register } from './AuthFunctions';
import { useState } from 'react';


const UserRegister = () => {

    const [newRegister, setNewRegister] = usetState({
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: ""
    })

    const onChange = (e) => {
        let keyName = e.target.name;
        let value = e.target.value;
        setNewRegister((previous) => {
          return {
            ...previous,
            [keyName]: value,
          };
        });
      }



    return (
        <>
        <p>User Registraion</p>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First name" name="first_name" value={newRegister.first_name} onChange={onChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last name" name="last_name" value={newRegister.last_name} onChange={onChange} />
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="Enter User name" name="user_name"  value={newRegister.user_name} onChange={onChange} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={newRegister.email} onChange={onChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={newRegister.password} onChange={onChange} />
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