import React from "react";
import styles from "./checkbox.module.scss";

export interface CheckboxProps {
  name?: string;
  value: string;
  checked?: boolean;
  onChangeValue?: (value: string) => void;
}

const Checkbox: React.SFC<CheckboxProps> = ({ name, value, checked, onChangeValue }) => {
  const handleChange = () => {
    if (onChangeValue) {
      onChangeValue(value);
    }
  };

  return (
    <div
      className={`${styles.checkbox} ${checked ? styles.selected : ""}`}
      onClick={handleChange}
    ></div>
  );
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
