import { useState, useEffect, useContext } from "react"
import { Card, Form, Button, InputGroup } from "react-bootstrap"
import api from "../api";
import { useHistory } from "react-router-dom";
/* import { BiShow, BiHide } from "react-icons/bi";
import { UserContext } from '../context/UserContext'
import Overlay from 'react-bootstrap/Overlay'

const SingleUser = () => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );


  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={}
  )
}

export default SingleUser */