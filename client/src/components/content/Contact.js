import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import { Button, Alert } from "reactstrap";
import InputGroup from "../common/InputGroup";
import { sendMessage } from "../../actions/contact";
import isEmpty from "../../utils/isEmpty";

const Contact = ({ sendMessage, history, errors }) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const onChange = e =>
    setContactData({ ...contactData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    sendMessage(contactData, history);
  };

  useEffect(() => {
    if (isEmpty(errors)) {
      setContactData({
        name: "",
        email: "",
        message: ""
      });
    }
  }, [errors]);

  const { name, email, message } = contactData;

  return (
    <Container>
      <h2 className="my-3 title">Contact Us</h2>

      <div className="card mb-4">
        <div className="card-body text-content">
          <p>Fill in the form below to send us a message:</p>
          {!isEmpty(errors) && <Alert color="danger">{errors.message}</Alert>}
          <form className="form" onSubmit={e => onSubmit(e)}>
            <InputGroup
              type="text"
              name="name"
              label="Your full name"
              id="name"
              value={name}
              onChange={e => onChange(e)}
              error={errors}
              placeholder="Enter your full name"
            />
            <InputGroup
              type="email"
              name="email"
              label="Your Email"
              id="email"
              value={email}
              onChange={e => onChange(e)}
              error={errors}
              placeholder="Enter your email address"
            />
            <InputGroup
              type="textarea"
              name="message"
              label="Message"
              placeholder="Your message here"
              id="message"
              onChange={e => onChange(e)}
              style={{ height: "100px" }}
              error={errors}
              value={message}
            />
            <Button color="primary" type="submit" size="lg" className="px-5">
              Send
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

Contact.propTypes = {
  sendMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.contact.errors
});

export default connect(mapStateToProps, { sendMessage })(withRouter(Contact));
