import Loadable from 'react-loadable';
import login from './Login';

/* router config */
const config = [
    ...(login(Loadable))
]


export default config;