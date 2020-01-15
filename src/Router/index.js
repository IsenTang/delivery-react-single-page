import Loadable from 'react-loadable';
import login from './Login';
import restaurant from './Restaurant'

/* router config */
const config = [
    ...(login(Loadable)),
    ...(restaurant(Loadable))
]


export default config;