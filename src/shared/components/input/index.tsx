import "./index.scss";
import type { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      className={`custom-input ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
