import { useState, useEffect } from "react"
import { Card, Form, Button } from "react-bootstrap"
import queryString from "query-string";
import axios from "axios";
import api from "../api";
import { axiosConfig } from './AuthFunctions';
const root = "https://tranquil-reaches-12289.herokuapp.com"

const Profile = ({ user }) => {
    const [editMode, setEditMode] = useState(false)
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        phone: "",
        city_code: "",
        city_name: "",
        country: "",
        company: "",
        errors: {},
    })

    useEffect(() => {
        if (user && user.id) {
            axios.get(`${root}/users/${user.id}`, axiosConfig)
                .then(res => {
                    console.log(res.data)
                    const data = res.data[0];
                    setProfile({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        user_name: data.user_name,
                        email: data.email,
                        password: "",
                        phone: data.phone || "",
                        city_code: data.city_code || "",
                        city_name: data.city_name || "",
                        country: data.country || "",
                        company: data.company || "",
                        errors: {},
                    })
                })
                .catch(err => console.error(err))
        }
        setProfile(user)
        console.log(user)
    }, [user])

    useEffect(() => {
        if (profile) console.log(profile)
    }, [profile])

    const onChange = (e) => {
        let keyName = e.target.name;
        let value = e.target.value;
        setProfile((previous) => {
            return {
                ...previous,
                [keyName]: value,
            };
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userProfile = {
            email: profile.email,
            password: profile.password,
        };
        console.log(userProfile)
        /* login(queryString.stringify(loginUser)).then((res) => {
          console.log(res)
          setToken(res.accessToken)
          history.push(`/`);
        }); */
    };

    return (
        <>
            <Card style={{ width: "30rem" }}>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={profile ? profile.email : ""}
                                onChange={onChange}
                                required
                                disabled={editMode ? false : true}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={profile ? profile.password : ""}
                                onChange={onChange}
                                required
                                disabled={editMode ? false : true}
                            />
                        </Form.Group>
                        {!editMode ?
                            <Button variant="primary" type="button" onClick={() => { setEditMode(!editMode) }}>
                                Edit
                            </Button>
                            :
                            <Button variant="primary" type="submit">
                                Submit Changes
                            </Button>}
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Profile