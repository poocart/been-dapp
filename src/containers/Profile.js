// @flow
import React from 'react';
import styled from 'styled-components';
import { Storage, STORAGE_KEYS } from '../services/storage';

import type { Profile } from '../models/Profile';

const ProfileRow = styled.div`
  border-bottom: 1px solid #000;
  padding: 15px 0px;
`;

type State = {
  profile: Profile,
}

const ProfileInput = (name, key, value, type? = 'text') => (
  <ProfileRow>
    <label htmlFor={key}>
      {name}: <input id={key} type={type} value={value}/>
    </label>
  </ProfileRow>
);

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
        {ProfileInput('First name', 'first-name', profile.firstName)}
        {ProfileInput('Last name', 'last-name', profile.lastName)}
        {ProfileInput('Email', 'email', profile.email)}
        {ProfileInput('Telegram', 'telegram', profile.telegram)}
      </div>
    )
  }
}

export default ProfileContainer;
