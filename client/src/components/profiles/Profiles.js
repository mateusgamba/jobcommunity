import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";
import { Container } from "reactstrap";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Container>
      <h2 className="my-3 title">Developers</h2>
      {loading ? (
        <Spinner />
      ) : profiles.length > 0 ? (
        profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      ) : (
        <div className="card mb-4">
          <div className="card-body text-content">
            <p>No profiles found.</p>
          </div>
        </div>
      )}
    </Container>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
