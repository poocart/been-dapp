import React from 'react';
import QRCodeGenerator from 'qrcode';
import { Agenda } from '../components/Agenda';
import { ApiService, ENDPOINTS } from '../services/api';
import { Storage, STORAGE_KEYS } from "../services/storage";
import Modal from "react-responsive-modal";
import HeaderBlock from "../components/HeaderBlock";

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
    const { agenda, qrCode } = this.state;
    return (
      <div>
        <HeaderBlock />
        <button onClick={this.onScannerClick}>SCAN</button>
        <Agenda agenda={agenda} showMore />
        <Modal open={!!qrCode} onClose={() => this.setState({ qrCode: null })} center>
          <img src={qrCode} />
        </Modal>
      </div>
    )
  }
}
