// @flow
import React from 'react';
import QRCodeGenerator from 'qrcode';
import { Storage, STORAGE_KEYS } from '../services/storage';

import type { Profile } from '../models/Profile';

type State = {
  profile: Profile,
  qrCode?: Object,
  receive?: boolean,
}

class ProfileContainer extends React.Component<*, State> {
  constructor(props){
    super(props);
    const profileData = Storage.get(STORAGE_KEYS.PROFILE, {});
    this.state = {
      profile: profileData,
    };
  }

  onPayWithDataClick = async () => {
    const { profile } = this.state;
    if (!Object.keys(profile).length) return;
    const qrCode = await QRCodeGenerator.toDataURL(JSON.stringify(profile), { margin: 0 });
    this.setState({ qrCode });
  };

  onReceiveContactClick = () => {

  };

  render() {
    const { qrCode } = this.state;
    return (
      <div>
        {!!qrCode && <img src={qrCode} />}
        <button onClick={this.onPayWithDataClick}>Pay with your data</button>
        <button onClick={this.onReceiveContactClick}>Receive contact information</button>

      </div>
    )
  }
}

export default ProfileContainer;
