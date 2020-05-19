import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

const CheckboxGroup = ({ name, id, type, onChange, label, checked, value }) => {
  return (
    <FormGroup>
      <Label>&nbsp;</Label>
      <div className="mt-2">
        <label>
          <Input
            type={type}
            name={name}
            id={id}
            onChange={onChange}
            checked={checked}
            value={value}
          />{" "}
          {label}
        </label>
      </div>
    </FormGroup>
  );
};

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CheckboxGroup;
