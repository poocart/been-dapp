import React from 'react';
import styled from 'styled-components';
import QRScanner from 'react-qr-reader'
import { Agenda } from '../components/Agenda';
import { ApiService, ENDPOINTS } from '../services/api';
import { Storage, STORAGE_KEYS } from "../services/storage";
import HeaderBlock from "../components/HeaderBlock";
import PayModal from "../components/PayModal";

import scanIcon from '../assets/images/scan.svg';
import Modal from "react-responsive-modal";

const Container = styled.div`
  min-height: calc(100vh - 40px);
  position: relative;
  flex-direction: column;
  justify-content: space-between;
`;

const AssetsWrapper = styled.div`
  flex-direction: row;
  margin: 10px -5px 0;
  clear: both;
`;

const PointsWrapper = styled.div`
  width: 50%;
  display: inline-block;
  font-size: 0;
  padding: 0 5px;
  box-sizing: border-box;
  float: left;
  position: relative;
`;

const InnerWrapper = styled.div`
  border: 2px solid black;
  font-size: 20px;
  padding-bottom: 100%;
  height: 130px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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

const TopTitle = styled.h1`
  font-size: 60px;
  line-height: 50px;
  text-align: center;
  color: #000000;
`;

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  color: #000000;
  font-weight: 600;
`;

const Circle = styled.div`
  width: calc(100% - 10px);
  padding-bottom: calc(100% - 10px);
  border-radius: 100%;
  background-color: #FED200;
  position: absolute;
  top: 2px;
  right: 5px;
  z-index: -1;
`;

const Placer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const GetMoreBadgesButton = styled.a`
  border: 2px solid black;
  padding: 20px;
  text-styling: none;
  font-size: 16px;
  margin-top: 10px;
  position: relative;
`;

const Line = styled.div`
  width: 80px;
  height: 12px;
  background-color: red;
  position: absolute;
  right: 0;
  top: 5px;
  transform: rotate(-45deg);
`;

const Description = styled.p`
  font-size: 25px;
  word-break: break-all;
  margin-top: 5px;
`;

const ConfirmButton = styled.button`
  margin-top: 35px;
  text-align: center;
  background: #0ad604;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  padding: 15px 0px;
  border: 4px solid #000;
`;

type State = {
  agenda: [],
  cameraActive: boolean,
  payModalVisible: boolean,
  hidePayWithData: boolean,
  hidePayWithBeans: boolean,
  payWithPointsModalVisible: boolean,
  payWithDataModalVisible: boolean,
  scanResult: Object,
};


export default class LoggedIn extends React.Component<*, State> {;

  constructor(props){
    super(props);
    this.state = {
      agenda: [],
      cameraActive: false,
      payModalVisible: false,
      hidePayWithData: false,
      hidePayWithBeans: false,
      payWithPointsModalVisible: false,
      payWithDataModalVisible: false,
      scanResult: {},
    };
  }

  componentDidMount() {
    const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    ApiService
      .get(ENDPOINTS.GET_QUIZZES, { pubkey: publicKey })
      .then(quizzes => this.setState({ quizzes: quizzes || [] }));

    fetch(ENDPOINTS.GET_AGENDA)
      .then(response => response.json())
      .then(json => {
        const threeFirstEvents = json.slice(0, 3);
        this.setState({ agenda: threeFirstEvents })
      })
      .catch(() => {})
  }

  handleCameraScan = (rawResult) => {
    if (!rawResult) return;
    this.setState({ cameraActive: false });
    try {
      const result = JSON.parse(rawResult) || {};
      switch (result.type) {
        case 'points':
          this.setState({
            payModalVisible: true,
            hidePayWithData: true,
            scanResult: result,
          });
          break;
        case 'data':
          this.setState({
            payModalVisible: true,
            hidePayWithBeans: true,
            scanResult: result,
          });
          break;
        case 'both':
          this.setState({
            payModalVisible: true,
            scanResult: result,
          });
          break;
        default:
      }
    } catch {
      // no result
    }
  };

  handleCameraClose = () => {
    this.setState({ cameraActive: false });
  };

  handlePayModalClose = () => {
    this.setState({
      payModalVisible: false,
      hidePayWithBeans: false,
      hidePayWithData: false,
    });
  };

  onPayWithData = () => {
    this.setState({
      payModalVisible: false,
      hidePayWithBeans: false,
      hidePayWithData: false,
      payWithDataModalVisible: true,
    });
  };

  onPayWithPoints = () => {
    this.setState({
      payModalVisible: false,
      hidePayWithBeans: false,
      hidePayWithData: false,
      payWithPointsModalVisible: true,
    });
  };

  handlePayWithPointsConfirm = () => {
    this.setState({
      payWithPointsModalVisible: false,
    });
  };

  handlePayWithDataConfirm = () => {
    this.setState({
      payWithDataModalVisible: false,
    });
  };

  render() {
    const {
      agenda,
      cameraActive,
      payModalVisible,
      hidePayWithBeans,
      hidePayWithData,
      payWithPointsModalVisible,
      payWithDataModalVisible,
      scanResult,
    } = this.state;
    return (
      <Container>
        <ContentWrapper>
          <HeaderBlock />
          <AssetsWrapper>
            <PointsWrapper>
              <InnerWrapper>
                <Placer>
                  <TopTitle style={{ color: '#0000FF' }}>
                    20
                  </TopTitle>
                  <Title>
                    BEANS
                  </Title>
                </Placer>
              </InnerWrapper>
            </PointsWrapper>
            <PointsWrapper>
              <InnerWrapper>
                <Circle />
                <Placer>
                  <TopTitle>
                    3
                  </TopTitle>
                  <Title>
                    BADGES
                  </Title>
                </Placer>
              </InnerWrapper>
            </PointsWrapper>
          </AssetsWrapper>
          <GetMoreBadgesButton>
            Get more badges
            <Line />
          </GetMoreBadgesButton>
          <Agenda agenda={agenda} showMore style={{ marginTop: 10 }} />
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
        <PayModal
          visible={payModalVisible}
          hidePayWithBeans={hidePayWithBeans}
          hidePayWithData={hidePayWithData}
          onPayWithPoints={this.onPayWithPoints}
          onPayWithData={this.onPayWithData}
          onDismiss={this.handlePayModalClose}
        />
        <Modal open={!!payWithPointsModalVisible} onClose={() => this.setState({ payWithPointsModalVisible: false })} center>
          <Description style={{ marginTop: 35 }}>Amount: <strong>{parseFloat(scanResult.amount || 0).toFixed(2)} BEEN's</strong></Description>
          <Description>Receiver: <strong>{scanResult.address}</strong></Description>
          <ConfirmButton onClick={() => this.handlePayWithPointsConfirm(scanResult.amount, scanResult.address)}>Confirm</ConfirmButton>
        </Modal>
        <Modal open={!!payWithDataModalVisible} onClose={() => this.setState({ payWithDataModalVisible: false })} center>
          <p>pay with data</p>
        </Modal>
      </Container>
    )
  }
}
