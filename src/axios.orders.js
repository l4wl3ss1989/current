import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://react-my-burger-21def.firebaseio.com'
});

export default instance;