// @flow
import React from 'react';
import { Storage, STORAGE_KEYS } from '../services/storage';

import type { Profile } from '../models/Profile';

type State = {
  profile: Profile,
}

class ProfileContainer extends React.Component<*, State> {
  constructor(props){
    super(props);
    const profileData = Storage.get(STORAGE_KEYS.PROFILE, {});
    this.state = {
      profile: profileData,
    };
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        {JSON.stringify(profile)}
      </div>
    )
  }
}

export default ProfileContainer;
