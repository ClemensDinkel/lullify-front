import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

const Login = () => {
    const [userInput, setUserInput] = useState("")
    const [password, setPassword] = useState("")
    const root = "https://tranquil-reaches-12289.herokuapp.com/"

    return (
        <>
        <Card style={{ width: "30rem" }}>
        <Card.Body>
            <Form method="POST" action="https://tranquil-reaches-12289.herokuapp.com/login">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            </Card.Body>
            </Card>
        </>
    )
}

export default Login