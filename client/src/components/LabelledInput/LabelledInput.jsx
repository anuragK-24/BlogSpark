import React from "react";
import PropTypes from "prop-types";
import "./LabelledInput.scss";

export default function LabelledInput({
  label,
  placeholder,
  value,
  type,
  onChange,
  errorMsg,
  id,
  name,
}) {
  return (
    <div className="LabelledInput">
    {label && <div className="LabelledInput__Label">{label}</div>}
    <input
      className={`LabelledInput__Input ${errorMsg && errorMsg.length > 0 ? 'LabelledInput__Input--Error' : ''}`}
      type={type}
      placeholder={errorMsg || placeholder}
      onChange={onChange}
      title={errorMsg}
      value={value}
      id = {id}
      name = {name}
      required
    />
  </div>
  );
}

LabelledInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

LabelledInput.defaultProps = {
  label: "",
  placeholder: "",
  type: "text",
  value: "",
  error: "",  
};