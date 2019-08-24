// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Storage, STORAGE_KEYS } from '../services/storage';

import myProfileIcon from '../assets/images/profile.svg';
import beansImage from '../assets/images/beens.svg';
import closeIcon from '../assets/images/close.svg';
import { fetchBalanceAction } from '../actions/walletActions';

const HeaderWrapper = styled.div`
  padding: 10px 14px;
  border: 2px solid #000000;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #000000;
  margin: 0 40px;
`;

const MyProfileButton = styled.a`
  position: absolute;
  top: 50%;
  margin-top: -18px;
  right: 10px;
`;

const ExitButton = styled.a`
  position: absolute;
  height: 60%;
  top: 20%;
  right: 0px;
  display: flex;
  padding: 0px 10px;
  border-left: 2px solid #000;
`;

const MainLink = styled.a`
  text-decoration: none;
`;

const BeansImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

type Props = {
  showExitButton?: boolean,
  balance: string,
  fetchBalance: Function,
};

class HeaderBlock extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchBalance();
  }

  render() {
    const existingPk = Storage.get(STORAGE_KEYS.PRIVATE_KEY);
    if (!existingPk) return <p>Not logged in</p>;
    console.log(this.props.location);
    return (
      <HeaderWrapper>
        <MainLink href="/">
          <Title>
            {this.props.balance || 0} <span style={{ color: '#ff00f2' }}>BEEN</span>
          </Title>
        </MainLink>
        {!this.props.showExitButton &&
        <MyProfileButton href="/profile">
          <img src={myProfileIcon}/>
        </MyProfileButton>
        }
        {!!this.props.showExitButton &&
        <ExitButton href="/">
          <img src={closeIcon}/>
        </ExitButton>
        }
        <BeansImage src={beansImage}/>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = ({
  wallet: { balance },
}) => ({
  balance,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBalance: () => dispatch(fetchBalanceAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBlock);

