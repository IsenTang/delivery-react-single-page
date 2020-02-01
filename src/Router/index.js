import Loadable from 'react-loadable';
import login from './Login';
import restaurant from './Restaurant';
import menu from './Menu';
import order from './Order';

/* router config */
const config = [
   ...(login(Loadable)),
   ...(restaurant(Loadable)),
   ...(menu(Loadable)),
   ...(order(Loadable))
];

export default config;