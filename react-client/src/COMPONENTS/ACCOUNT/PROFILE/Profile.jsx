import React from "react";

import "./Profile.scss";

const Profile = ({ setProfileUser, profileUser }) => {
  return (
    <div className="Profile">
      Profile
      <br />
      <pre>{JSON.stringify(profileUser, null, 2)}</pre>
    </div>
  );
};

export default Profile;
