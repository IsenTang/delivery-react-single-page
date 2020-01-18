import React from 'react';
import Modal from 'react-modal';
import classnames from 'classnames';
import { useSelector,shallowEqual,useDispatch } from 'react-redux';

/* actions */
import { closeErrorModal } from './state/actions';

/* style */
import './style.scss';

const customStyles = {
   content : {
      /* stylelint-disable */
      top  : '50%',
      right  : 'auto',
      bottom  : 'auto',
      left  : '50%',
      marginRight  : '-50%',
      transform  : 'translate(-50%, -50%)'
   },
   overlay: { zIndex : 90 }
};

function ErrorModal (){

   const dispatch = useDispatch();
   const isShow = useSelector(state => state.error.showError,shallowEqual);
   const message = useSelector(state => state.error.message,shallowEqual);
   const closeFunc = useSelector(state => state.error.closeFunc,shallowEqual);

   /* 关闭modal */
   function closeModal (){

      dispatch(closeErrorModal(closeFunc));
   }

   return (

      <Modal
         isOpen = { isShow }
         style={ customStyles }
         onRequestClose = { closeModal }
      >
         <div className={ classnames('error-modal-box','containerCol','vertical','space-between') }>
            <div>{message}</div>
            <button onClick={ closeModal } className={ classnames('normal-btn','error-btn') }>关闭</button>
         </div>
      </Modal>
   );
}

export default ErrorModal;