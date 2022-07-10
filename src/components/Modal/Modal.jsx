import { Backdrop, ModalStyled } from './Modal.styled';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  onEscape = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  render() {
    const { onCloseModal, largeImg } = this.props;
    return (
      <Backdrop>
        <ModalStyled>
          <button type="button" onClick={onCloseModal}>
            Close
          </button>
          <img src={largeImg} alt="collection" />
        </ModalStyled>
      </Backdrop>
    );
  }
}
