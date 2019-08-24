import React from 'react';
import styled from 'styled-components';
import QRScanner from 'react-qr-reader'
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

const CameraCloseButtonWrapper = styled.div`
  position: fixed;
  bottom: 50px;
  left: 0px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CameraCloseButton = styled.button`
  border: none;
  padding: 25px;
  color: #ff7f00;
  background: none;
  font-size: 18px;
  font-weight: 700;
`;

type State = {
  agenda: [],
  cameraActive: boolean,
}

export default class LoggedIn extends React.Component<*, State> {;

  constructor(props){
    super(props);
    this.state = {
      agenda: [],
      cameraActive: false,
      cameraRef: null,
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

  handleCameraScan = (result) => {
    if (!result) return;
    this.setState({ cameraActive: false });
    console.log('result: ', result);
  };

  handleCameraClose = (err?) => {
    this.setState({ cameraActive: false });
  };

  render() {
    const { agenda, cameraActive } = this.state;
    return (
      <Container>
        <ContentWrapper>
          <HeaderBlock />
          <button onClick={this.onScannerClick}>SCAN</button>
          <Agenda agenda={agenda} showMore />
        </ContentWrapper>
        <FooterWrapper>
          <ScannerButton onClick={() => this.setState({ cameraActive: true })}>
            <img src={scanIcon} />
          </ScannerButton>
        </FooterWrapper>
        {cameraActive &&
          <div>
            <QRScanner
              onError={this.handleCameraClose}
              onScan={this.handleCameraScan}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000'
              }}
            />
            <CameraCloseButtonWrapper>
              <CameraCloseButton onClick={this.handleCameraClose}>
                Close
              </CameraCloseButton>
            </CameraCloseButtonWrapper>
          </div>
        }
        <PayModal />
      </Container>
    )
  }
}
