import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { FormGroup, Label, FormFeedback } from "reactstrap";

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  id,
  label,
}) => {
  const selectOptions = options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.label}
    </option>
  ));
  const errorInput = !error
    ? false
    : !error.data
    ? false
    : !error.data[id]
    ? false
    : error.data[id];
  const valueDefault = value ? value : "";
  return (
    <FormGroup>
      <Label
        for={id}
        className={classnames({
          "text-danger": errorInput,
        })}
      >
        {label}
      </Label>

      <select
        className={classnames("form-control ", {
          "is-invalid": errorInput,
        })}
        name={name}
        id={id}
        value={valueDefault}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {errorInput !== "" && <FormFeedback>{errorInput}</FormFeedback>}
    </FormGroup>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
