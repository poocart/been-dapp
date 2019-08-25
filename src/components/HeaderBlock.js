// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import { Storage, STORAGE_KEYS } from '../services/storage';

import myProfileIcon from '../assets/images/profile.svg';
import closeIcon from '../assets/images/close.svg';
import { fetchBalanceAction } from '../actions/walletActions';

const HeaderWrapper = styled.div`
  padding: 10px 14px;
  border: 2px solid #000000;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: #000000;
  margin-right: 40px;
`;

const MyProfileButton = styled(Link)`
  position: absolute;
  top: 50%;
  margin-top: -18px;
  right: 10px;
`;

const ExitButton = styled(Link)`
  position: absolute;
  height: 60%;
  top: 20%;
  right: 0px;
  display: flex;
  padding: 0px 10px;
  border-left: 2px solid #000;
`;

const MainLink = styled(Link)`
  text-decoration: none;
`;

type Props = {
  showExitButton?: boolean,
};

class HeaderBlock extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchBalance();
  }

  render() {
    const existingPk = Storage.get(STORAGE_KEYS.PRIVATE_KEY);
    if (!existingPk) return <Loading />;
    return (
      <HeaderWrapper>
        <MainLink to="/">
          <Title>
            ETHBerlin
          </Title>
        </MainLink>
        {!this.props.showExitButton &&
        <MyProfileButton to="/profile">
          <img src={myProfileIcon}/>
        </MyProfileButton>
        }
        {!!this.props.showExitButton &&
        <ExitButton to="/">
          <img src={closeIcon}/>
        </ExitButton>
        }
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

