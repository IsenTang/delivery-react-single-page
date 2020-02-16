import React from 'react';
import Modal from 'react-modal';
import intl from 'react-intl-universal';
import { useSelector,shallowEqual,useDispatch } from 'react-redux';

/* actions */
import { closeAlert } from './state/actions';

const customStyles = {
   /* stylelint-disable */
   content : {
      top  : '50%',
      right  : 'auto',
      bottom  : 'auto',
      left  : '50%',
      marginRight  : '-50%',
      transform  : 'translate(-50%, -50%)'
   },
   overlay: { zIndex : 80 }
};

function Alert (){

   const dispatch = useDispatch();
   const isShow = useSelector(state => state.alert.isShow,shallowEqual);
   const message = useSelector(state => state.alert.message,shallowEqual);
   const closeFunc = useSelector(state => state.alert.closeFunc,shallowEqual);

   /* 关闭modal */
   function closeModal (){

      dispatch(closeAlert(closeFunc));
   }

   return (

      <Modal
         isOpen = { isShow }
         style={ customStyles }
         onRequestClose = { closeModal }
      >
         <div>{message}</div>
         <button onClick={ closeModal }>{intl.get('close')}</button>
      </Modal>
   );
}

export default Alert;