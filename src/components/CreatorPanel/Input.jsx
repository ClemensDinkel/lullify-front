import {
  Form,
  Col,
  OverlayTrigger,
  Tooltip,
  InputGroup
} from "react-bootstrap";
import { BsQuestionOctagonFill } from "react-icons/bs";

const Input = props => {

  return (
    <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>
          <b>{props.description}</b>
          {props.required ? <span style={{ color: "red" }}>*</span> : null}
        </Form.Label>
        <InputGroup className="mb-2">
          {props.tooltip ?
            <OverlayTrigger
              key="top"
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="tooltip-top">
                  {props.tooltip}
                </Tooltip>
              }
            >
              <Form.Control
                {...props}
              />
            </OverlayTrigger> :
            
            <Form.Control
              {...props}
            />

          }
          {props.hint && <InputGroup.Prepend>
            <InputGroup.Text>
              <a
                href={props.hint}
                target="_blank"
                rel="noreferrer"
                style={{ color: "black" }}
              >
                <BsQuestionOctagonFill />
              </a>
            </InputGroup.Text>
          </InputGroup.Prepend>}
        </InputGroup>
      </Form.Group>
    </Form.Row>
  )
}

export default Input