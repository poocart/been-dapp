// @flow
import React from 'react';
import styled from 'styled-components';
import { Storage, STORAGE_KEYS } from '../services/storage';

import type { Profile } from '../models/Profile';
import QRCodeGenerator from "qrcode";
import HeaderBlock from "../components/HeaderBlock";

const ProfileWrapper = styled.div`
  margin-top: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const ProfileSettings = styled.div`
  margin-top: 15px;
  border-top: 1px solid #000;
`;

const ProfileRow = styled.div`
  border-bottom: 1px solid #000;
`;

const ProfileLabel = styled.label`
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const ProfileInput = styled.input`
  background: transparent;
  border: none;
  height: 30px;
  flex: 1;
  margin: 12px 0px 15px 12px;
  font-style: oblique;
  text-align: right;
  font-size: 16px;
`;

const QRCodeImage = styled.img`
  margin-top: 15px;
`;

const BlackButton = styled.button`
  background: #000;
  border: none;
  padding: 15px;
  color: #fff;
  font-size: 16px;
  margin-top: 20px;
  align-self: center;
  width: 200px;
  &:disabled {
    background: #909090;
  }
`;

const SmallText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  width: 120px;
  align-self: center;
`;

type State = {
  profile: Profile,
  qrCode?: string,
}

class ProfileContainer extends React.Component<*, State> {
  constructor(props){
    super(props);
    const profileData = Storage.get(STORAGE_KEYS.PROFILE, '{}');
    this.state = {
      profile: JSON.parse(profileData),
    };
  }

  componentDidMount() {
    const { profile } = this.state;
    this.generateProfileQRCode(profile);
  }

  isEmptyProfile(profile) {
    return !Object.keys(profile).length
      || Object.values(profile).filter(val => val === '').length === Object.keys(profile).length;
  };

  generateProfileQRCode(profile) {
    const { qrCode } = this.state;
    if (this.isEmptyProfile(profile)){
      if (qrCode) this.setState({ qrCode: null });
      return;
    }
    QRCodeGenerator
      .toDataURL(JSON.stringify(profile), { margin: 0 })
      .then(qrCode => this.setState({ qrCode }));
  }

  onProfileSettingChange = (name, value) => {
    const { profile: oldProfile } = this.state;
    const profile = {
      ...oldProfile,
      [name]: value,
    };
    Storage.set(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    this.setState({ profile });
    this.generateProfileQRCode(profile);
  };

  renderProfileSetting = (title, name) => {
    const { profile } = this.state;
    return (
      <ProfileRow>
        <ProfileLabel htmlFor={name}>
          <span>{title}</span>
          <ProfileInput
            id={name}
            type="text"
            onChange={({ target: { value }}) => this.onProfileSettingChange(name, value)}
            value={profile[name]}
          />
        </ProfileLabel>
      </ProfileRow>
    );
  };

  render() {
    const { qrCode } = this.state;
    return (
      <div>
        <HeaderBlock />
        <ProfileWrapper>
          {!!qrCode && <QRCodeImage src={qrCode} />}
          <ProfileSettings>
            {this.renderProfileSetting('First name', 'firstName')}
            {this.renderProfileSetting('Last name', 'lastName')}
            {this.renderProfileSetting('Email', 'email')}
            {this.renderProfileSetting('Telegram', 'telegram')}
          </ProfileSettings>
          <BlackButton disabled>Transfer badges</BlackButton>
          <SmallText>Save badges in your main wallet</SmallText>
        </ProfileWrapper>
      </div>
    )
  }
}

export default ProfileContainer;
