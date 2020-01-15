import _ from 'lodash';
// import intl from 'react-intl-universal';

/**
 * custom error
 */
export default function CustomError(err) {

   /* First save the extra info */
   this.details = _.get(err, 'response.data.details');

   /* Get default code from err object */
   this.code = _.get(err, 'response.data.code');

   /* request timeout */
   if (/timeout of/.test(err.message)) { this.code = 'timeout'; }

   /* Net work error for google api */
   if (/Network Error/.test(err.message)) { this.code = 'network'; }

   this.message = _.get(err, 'response.data.message') || err.message;

   /* Decide error message to show */
   /* First find translation */

   //   const trans = intl.get(`error.${this.code}`);

   //   /* if translate exist, use it as error message */
   //   if (trans) {

   //     this.message = intl.get(`error.${this.code}`, { ...this.details });
   //   } else {

   //     /* If no translation, get the message from error or use universal message */
   //     this.message =
   //       _.get(err, 'response.data.message') ||
   //       err.message ||
   //       intl.get('error.unknown');
   //   }

}

