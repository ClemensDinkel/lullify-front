import { Spinner } from "react-bootstrap"

const LoadingSpinner = () => (
  <div>
    <Spinner animation="border" role="status" variant="light" style={{ height: "60px", width: "60px" }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
)

export default LoadingSpinner