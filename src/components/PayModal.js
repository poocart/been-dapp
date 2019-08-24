// @flow
import React from 'react';
import styled from 'styled-components';

import bigBeansImage from '../assets/images/big_beans.svg';

const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: #000;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 180px;
  left: 0px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.a`
  color: #ff7f00;
  margin-top: 25px;
  text-decoration: none;
`;

const PayButton = styled.a`
  border: 4px solid #000;
  background: #fff;
  width: 250px;
  padding: 15px 0px;
  margin-top: 5px;
`;

type Prop = {
  visible: boolean,
  onDismiss: Function,
  hidePayWithData?: boolean,
  hidePayWithBeans?: boolean,
};

type State = {
  hidden: boolean,
};

class PayModal extends React.Component<Prop, State> {
  state = {
    hidden: false,
  };

  render() {
    const {
      visible,
      hidePayWithData,
      hidePayWithBeans,
      onDismiss,
    } = this.props;
    const { hidden } = this.state;
    if (!visible && !hidden) return null;
    return (
      <Modal>
        <BackgroundImage src={bigBeansImage} />
        <ButtonsWrapper>
          {!hidePayWithBeans && <PayButton>Pay with beans</PayButton>}
          {!hidePayWithData && <PayButton>Pay with data</PayButton>}
          <CancelButton onClick={onDismiss}>Cancel</CancelButton>
        </ButtonsWrapper>
      </Modal>
    );
  }
}

export default PayModal;
