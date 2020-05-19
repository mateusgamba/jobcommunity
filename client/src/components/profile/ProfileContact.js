import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

const ProfileContact = ({ name, whatsapp, email, handle }) => {
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    const contactSubject = process.env.REACT_APP_MESSAGE_SUBJECT;
    let contactMessage = process.env.REACT_APP_MESSAGE_BODY;
    contactMessage = contactMessage.replace("[NAME]", name);
    contactMessage = contactMessage.replace("[HANDLE]", handle);
    setContactMessage(contactMessage);
    setContactSubject(contactSubject);
  }, [name, handle]);

  return (
    <div className="mb-4">
      <h2 className="mb-3 title d-none d-sm-none d-md-block">&nbsp;</h2>
      <h2 className="mb-3 title d-xs-block d-sm-block d-md-none">
        Send me a Message
      </h2>
      <div className="card">
        <div className="card-body">
          <h4 className="d-none d-sm-none d-md-block">Send me a Message</h4>
          <p className="mt-3 mb-0">E-mail</p>
          <p>
            <a
              href={`mailto:${email}?subject=${contactSubject}&body=${contactMessage}`}
              rel="noopener noreferrer"
            >
              {email}
            </a>
          </p>
          {whatsapp && (
            <Fragment>
              <p className="mt-3 mb-0">Whatsapp</p>
              <p>
                <a
                  href={`https://api.whatsapp.com/send?phone=${whatsapp}&text=${contactMessage}`}
                  title="Whatsapp"
                  rel="noopener noreferrer"
                >
                  {whatsapp}
                </a>
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileContact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default ProfileContact;
