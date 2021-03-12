const Button = ({children, type = 'button', className = '', onClick}) =>
  <button type={type} onClick={onClick} className={className}>{children}</button>;
export default Button;