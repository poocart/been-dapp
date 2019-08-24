import React from 'react';
import styled from 'styled-components';
import { Agenda } from '../components/Agenda';
import { ApiService, ENDPOINTS } from '../services/api';
import { Storage, STORAGE_KEYS } from "../services/storage";
import HeaderBlock from "../components/HeaderBlock";
import PayModal from "../components/PayModal";

import scanIcon from '../assets/images/scan.svg';

const Container = styled.div`
  min-height: calc(100vh - 40px);
  position: relative;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
`;

const ScannerButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0px;
  background-color: #000000;
  font-size: 0;
`;

export default class LoggedIn extends React.Component<*, State> {
  constructor(props){
    super(props);
    const profileData = Storage.get(STORAGE_KEYS.PROFILE, {});
    this.state = {
      profile: profileData,
      agenda: [],
    };
  }

  componentDidMount() {
    const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    ApiService
      .get(ENDPOINTS.GET_QUIZZES, { pubkey: publicKey })
      .then(quizzes => this.setState({ quizzes: quizzes || [] }));

    fetch('http://www.mocky.io/v2/5d618e563200005d008e6126')
      .then(response => response.json())
      .then(json => {
        const threeFirstEvents = json.slice(0, 3);
        this.setState({ agenda: threeFirstEvents })
      })
      .catch(() => {})
  }

  onScannerClick = () => {

  };

  render() {
    const { agenda } = this.state;
    return (
      <Container>
        <ContentWrapper>
          <HeaderBlock />
          <button onClick={this.onScannerClick}>SCAN</button>
          <Agenda agenda={agenda} showMore />
        </ContentWrapper>
        <FooterWrapper>
          <ScannerButton onPress={() =>{}}>
            <img src={scanIcon} />
          </ScannerButton>
        </FooterWrapper>
        <PayModal />
      </Container>
    )
  }
}
