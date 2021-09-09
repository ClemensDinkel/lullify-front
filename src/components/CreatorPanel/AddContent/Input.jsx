const Input = ({ name, type, required, value, maxlength, as, pattern, rows }) => (
  <Form.Row>
    <Form.Group as={Col}>
      <Form.Label>
        <b>{name}</b>
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
            as={as}/* {...props} ??? */
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

export default Input