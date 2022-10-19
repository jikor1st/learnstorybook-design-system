import PropTypes from "prop-types";
import styled from "styled-components";

export function TestComponent({ test, ...props }) {
  return <Container {...props}>{test}</Container>;
}

const Container = styled.button`
  background: ${(props) => (props.testBoolean ? "blue" : "red")};
  color: #ffffff;
  border: 0;
  padding: 10px 16px;
  border-radius: 32px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  /* border: 2px solid #ff0000; delete border */
`;

// TestComponent.propTypes = {
//   test: PropTypes.string.isRequired,
//   testBoolean: PropTypes.bool,
//   onClick() {},
// };

// TestComponent.defaultProps = {
//   testBoolean: false,
// };
