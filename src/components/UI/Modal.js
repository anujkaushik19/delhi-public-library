import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide} />;
};

const ModalOverlay = (props) => {
  console.log(props.didSubmit)

  return (
    <div className={`${classes.modal} ${props.didSubmit ? classes.submit : ""}`} >
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onHide = {props.onHide}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay didSubmit = {props.didSubmit}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;