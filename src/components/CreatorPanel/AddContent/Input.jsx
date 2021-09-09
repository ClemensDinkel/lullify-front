import {
  Form,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const Input = (/* props */ { name, description, type, tooltip, placeholder, required, value, maxlength, as, pattern, rows, onChange }) => {
  return (
    <Form.Row>
       <Form.Group as={Col}>
        <Form.Label>
          <b>{description}</b>
          {required ? <span style={{ color: "red" }}>*</span> : null}
        </Form.Label>
        {tooltip ?
          <OverlayTrigger
            key="top"
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip-top">
                {tooltip}
              </Tooltip>
            }
          >
            <Form.Control
              as={as}
              pattern={pattern}
              rows={rows}
              type={type}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              maxlength={maxlength}
              required
            />
          </OverlayTrigger> :
          <Form.Control
            as={as}
            pattern={pattern}
            rows={rows}
            type={type}
            placeholder={placeholder}
            description={description}
            name={name}
            value={value}
            onChange={onChange}
            maxlength={maxlength}
            required
          />
        }
      </Form.Group>
    </Form.Row>
  )
}

export default Input