import { useState, useEffect, useContext } from "react"
import { Card, Form, Button, InputGroup } from "react-bootstrap"
import api from "../api";
import { useHistory } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { UserContext } from '../context/UserContext'

const Profile = () => {
  const [editMode, setEditMode] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false);
  const { dTk, sUI } = useContext(UserContext)
  const [decToken] = dTk
  const [singleUserInfo] = sUI
  const [profile, setProfile] = useState({})
  let history = useHistory();
  
  useEffect(() => {
    if (decToken && decToken.id) {
      setProfile({
        first_name: singleUserInfo.first_name,
        last_name: singleUserInfo.last_name,
        user_name: singleUserInfo.user_name,
        email: singleUserInfo.email,
        role: singleUserInfo.role,
        password: "",
        phone: singleUserInfo.phone,
        street: singleUserInfo.street,
        house_nr: singleUserInfo.house_nr,
        city_code: singleUserInfo.city_code,
        city_name: singleUserInfo.city_name,
        country: singleUserInfo.country,
        company: singleUserInfo.company,
        errors: {},
      })
    }
  }, [singleUserInfo])

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
    api.updateUser(decToken.id, profile)
      .then(() => {
        alert("Your profile has been successfully updated")
        history.push(`/`)})
      .catch(err => console.log(err))
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ flexGrow: "1", maxWidth: "30rem", textAlign: "left" }}>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group controlId="formBasicUserName">
                <Form.Label><b>User Name:</b></Form.Label>
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
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicEmail">
                <Form.Label><b>Email Address:</b></Form.Label>
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
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicCurrentPassword">
                <Form.Label><b>Current Password:</b></Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    type={passwordShow ? "text" : "password"}
                    placeholder="Current Password"
                    name="currentPassword"
                    value={profile ? profile.currentPassword : ""}
                    onChange={onChange}
                    required
                    disabled={editMode ? false : true}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      {!passwordShow ? (
                        <span
                          className="password-icon"
                          onClick={() => setPasswordShow(!passwordShow)}
                        >
                          <BiShow />
                        </span>
                      ) : (
                        <span
                          className="password-icon"
                          onClick={() => setPasswordShow(!passwordShow)}
                        >
                          <BiHide />
                        </span>
                      )}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicPassword">
                <Form.Label><b>New Password:</b></Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    type={passwordShow ? "text" : "password"}
                    placeholder="New Password"
                    name="password"
                    value={profile ? profile.password : ""}
                    onChange={onChange}
                    disabled={editMode ? false : true}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      {!passwordShow ? (
                        <span
                          className="password-icon"
                          onClick={() => setPasswordShow(!passwordShow)}
                        >
                          <BiShow />
                        </span>
                      ) : (
                        <span
                          className="password-icon"
                          onClick={() => setPasswordShow(!passwordShow)}
                        >
                          <BiHide />
                        </span>
                      )}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label><b>First Name:</b></Form.Label>
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
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicLastName">
                <Form.Label><b>Last Name</b></Form.Label>
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
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label><b>Phone Number:</b></Form.Label>
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
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicStreet">
                <Form.Label><b>Street:</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street"
                  name="street"
                  value={profile ? profile.street : ""}
                  onChange={onChange}
                  required={profile && profile.role === "content_creator" ? true : false}
                  disabled={editMode ? false : true}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicHouseNr">
                <Form.Label><b>House Number:</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="House Nr"
                  name="house_nr"
                  value={profile ? profile.house_nr : ""}
                  onChange={onChange}
                  required={profile && profile.role === "content_creator" ? true : false}
                  disabled={editMode ? false : true}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicCityCode">
                <Form.Label><b>Postal Code:</b></Form.Label>
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
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicCity">
                <Form.Label><b>City:</b></Form.Label>
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
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formBasicCountry">
                <Form.Label><b>Country</b></Form.Label>
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
            </Form.Row>
            {profile && profile.role === "content_creator" &&
              <Form.Row>
                <Form.Group controlId="formBasicCountry">
                  <Form.Label><b>Company</b></Form.Label>
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
              </Form.Row>
            }
            <Form.Row style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
              {!editMode ?
                <Button variant="primary" type="button" onClick={() => { setEditMode(!editMode) }}>
                  Edit
                </Button>
                :
                <Button variant="primary" type="submit">
                  Submit Changes
                </Button>}
              <Button variant="primary" type="button" onClick={() => { history.push('/') }}>
                Cancel
              </Button>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Profile