import Loadable from 'react-loadable';
import login from './Login';
import restaurant from './Restaurant';
import menu from './Menu';

/* router config */
const config = [
   ...(login(Loadable)),
   ...(restaurant(Loadable)),
   ...(menu(Loadable))
];

export default config;