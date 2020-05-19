import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const InputGroup = ({
  name,
  placeholder,
  error,
  type,
  onChange,
  label,
  id,
  disabled
}) => {
  const errorInput = !error
    ? false
    : !error.data
    ? false
    : !error.data[id]
    ? false
    : error.data[id];
  return (
    <FormGroup>
      <Label
        for={id}
        className={classnames({
          "text-danger": errorInput
        })}
      >
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        invalid={Boolean(errorInput)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {errorInput !== "" && <FormFeedback>{errorInput}</FormFeedback>}
    </FormGroup>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputGroup;
