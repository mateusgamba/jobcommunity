import React from "react";

const ProfileSocial = ({ title, url, icon }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="text-white mr-3"
      rel="noopener noreferrer"
      title={title}
    >
      <i className={`${icon} fa-lg`} />
    </a>
  );
};

export default ProfileSocial;
