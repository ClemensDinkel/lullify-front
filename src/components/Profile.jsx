import { useState, useEffect } from "react"
import { Card, Form, Button } from "react-bootstrap"
import api from "../api";
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios'
import { axiosConfig } from './AuthFunctions';

const Profile = ({ user }) => {
  let history = useHistory();
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    role: "user",
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
    console.log(profile)
    if (user && user.id) {
      api.fetchSingleUser(user.id)
        .then(res => {
          console.log(res.data[0])
          const data = res.data[0];
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            user_name: data.user_name,
            email: data.email,
            role: data.role,
            password: "",
            phone: data.phone,
            city_code: data.city_code || "",
            city_name: data.city_name || "",
            country: data.country || "",
            company: data.company || "",
            errors: {},
          })
        })
        .catch(err => console.error(err))
    }
    /* setProfile(user) */
    console.log(user)
  }, [user])


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

  /* 
    const updateProfile = async (user_id, userData) => {
      await axios.put(`https://tranquil-reaches-12289.herokuapp.com/users/${user_id}`, userData, axiosConfig)
        .then(res => console.log(userData))
        .catch(err => console.log(err))
    } */

  const onSubmit = (e) => {
    e.preventDefault();
    api.updateUser(user.id, queryString.stringify(profile))
      .then(res => {
        console.log(user.id)
        console.log(profile)
        console.log(res)
        history.push(`/`);
      })
  };

  /* const updateDataUser = (e) => {
    e.preventDefault()
    console.log(profile)
    axios.put(`https://tranquil-reaches-12289.herokuapp.com/users/${user.id}`, queryString.stringify(profile), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .catch(err => console.log(console.error()))
      .then(x => {
        console.log(profile)
      })
  } */

  const updateDataUser = (e) => {
    e.preventDefault()
    console.log(profile)
    axios.put(`https://tranquil-reaches-12289.herokuapp.com/users/${user.id}`, queryString.stringify(profile), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'auth-token': localStorage.getItem('auth-token')
      }
    })
      .catch(err => console.log(console.error()))
      .then(x => {
        console.log(profile)
      })
  }

  /* /* const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(user.id, queryString.stringify(profile))
      .then(res => {
        console.log(user.id)
        console.log(profile)
        console.log(res)
        alert('updated succcessfully')
        history.push(`/home`);
      })
      .catch(error => {
        console.error(error)
      }) */

  /* login(queryString.stringify(loginUser)).then((res) => {
    console.log(res)
    setToken(res.accessToken)
    history.push(`/`);
  }); 
}; */

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ flexGrow: "1", maxWidth: "30rem" }}>
        <Card.Body>
          <Form onSubmit={updateDataUser}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                name="user_name"
                value={profile ? profile.user_name : ""}
                onChange={onChange}
                required
                disabled={editMode ? false : true}
              />
            </Form.Group>

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
            </Form.Group>

            <Form.Group controlId="formBasicCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current Password"
                name="currentPassword"
                value={profile ? profile.currentPassword : ""}
                onChange={onChange}
                required
                disabled={editMode ? false : true}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="password"
                value={profile ? profile.password : ""}
                onChange={onChange}
                required
                disabled={editMode ? false : true}
              />
            </Form.Group>



            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                value={profile ? profile.first_name : ""}
                onChange={onChange}
                required
                disabled={editMode ? false : true}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={profile ? profile.last_name : ""}
                onChange={onChange}
                required
                disabled={editMode ? false : true}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={profile ? profile.phone : ""}
                onChange={onChange}
                required={profile && profile.role === "content_creator" ? true : false}
                disabled={editMode ? false : true}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCityCode">
              <Form.Label>City Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="City Code"
                name="city_code"
                value={profile ? profile.city_code : ""}
                onChange={onChange}
                required={profile && profile.role === "content_creator" ? true : false}
                disabled={editMode ? false : true}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city_name"
                value={profile ? profile.city_name : ""}
                onChange={onChange}
                required={profile && profile.role === "content_creator" ? true : false}
                disabled={editMode ? false : true}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="country"
                value={profile ? profile.country : ""}
                onChange={onChange}
                required={profile && profile.role === "content_creator" ? true : false}
                disabled={editMode ? false : true}
              />
            </Form.Group>
            {profile && profile.role === "content_creator" &&
              <Form.Group controlId="formBasicCountry">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={profile ? profile.company : ""}
                  onChange={onChange}
                  required/* ={profile && profile.role === "content_creator" ? true : false} */ //not needed as long as it's only rendered for cc
                  disabled={editMode ? false : true}
                />
              </Form.Group>
            }
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
    </div>
  )
}

export default Profile