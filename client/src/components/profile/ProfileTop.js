import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Jumbotron, Container } from "reactstrap";
import ProfileSocial from "./ProfileSocial";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    githubusername,
    user: { name, avatar }
  },
  auth
}) => {
  return (
    <Jumbotron className="jumbotron-profile mb-2">
      <div className="overlay"></div>
      <Container>
        <div className="row text-inner">
          <div className="col-12 col-sm-2 text-center">
            <img src={avatar} alt="" className="img-fluid rounded-circle" />
          </div>
          <div className="col-12 col-sm-8 align-self-center">
            <h3 className="m-0">{name}</h3>
            <p className="lead m-0">
              {status} {company && <span> at {company}</span>}
            </p>
            {location && <p className="lead m-0">{location}</p>}

            {social && (
              <p className="m-0 pl-1 mt-2">
                {website && (
                  <ProfileSocial
                    url={website}
                    icon="fas fa-globe"
                    title="Website"
                  />
                )}
                {githubusername && (
                  <ProfileSocial
                    url={githubusername}
                    icon="fab fa-github"
                    title="Github"
                  />
                )}
                {social.twitter && (
                  <ProfileSocial
                    url={social.twitter}
                    icon="fab fa-twitter"
                    title="Twitter"
                  />
                )}
                {social.facebook && (
                  <ProfileSocial
                    url={social.facebook}
                    icon="fab fa-facebook"
                    title="Facebook"
                  />
                )}
                {social.linkedin && (
                  <ProfileSocial
                    url={social.linkedin}
                    icon="fab fa-linkedin"
                    title="Linkedin"
                  />
                )}
                {social.youtube && (
                  <ProfileSocial
                    url={social.youtube}
                    icon="fab fa-youtube"
                    title="Youtube"
                  />
                )}
                {social.instagram && (
                  <ProfileSocial
                    url={social.instagram}
                    icon="fab fa-instagram"
                    title="Instagram"
                  />
                )}
              </p>
            )}
          </div>
          {auth && (
            <div className="col-12 col-sm-2 my-2">
              <Link to="/edit-profile" className="btn btn-dark btn-block">
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Jumbotron>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
