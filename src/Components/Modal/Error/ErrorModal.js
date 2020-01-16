import React from 'react';
import Modal from 'react-modal';
import { useSelector,shallowEqual,useDispatch } from 'react-redux';

/* actions */
import { closeErrorModal } from './state/actions';

const customStyles = {
   content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
   }
};

function ErrorModal(){

   const dispatch = useDispatch();
   const isShow = useSelector(state => state.error.showError,shallowEqual);
   const message = useSelector(state => state.error.message,shallowEqual);
   const closeFunc = useSelector(state => state.error.closeFunc,shallowEqual);

   /* 关闭modal */
   function closeModal(){
       
      dispatch(closeErrorModal(closeFunc));
   }
    
   return (

      <Modal
         isOpen = {isShow}
         style={customStyles}
         onRequestClose = {closeModal}
      >
         <div>{message}</div>
         <button onClick={closeModal}>关闭</button>
      </Modal>
   );
}

export default ErrorModal;