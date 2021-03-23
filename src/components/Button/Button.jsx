import PropTypes from 'prop-types';

const Button = ({children, type, className, onClick}) =>
  <button type={type} onClick={onClick} className={className}>{children}</button>;

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
Button.defaultProps = {
  type: 'button',
  className: '',
};
export default Button;