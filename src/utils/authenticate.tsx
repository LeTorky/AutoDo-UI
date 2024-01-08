import axios from 'axios';

const Authenticate = ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const savedToken = localStorage.getItem('token');
    const code = urlParams.get('code');
     if (savedToken) 
        axios.defaults.headers.common['Authorization'] = `AccessToken ${savedToken}`;
    else if(code){
        const AUTH_URL = process.env.REACT_APP_AUTH_URL
        axios.post(`${AUTH_URL}`, {
            code: code
        }).then(
            response=>localStorage.setItem('token', response.data['token'])
        ).catch(
            error=>console.log(error)
        );
    } else {
        const ORIGIN = process.env.REACT_APP_ORIGIN;
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const SCOPE = process.env.REACT_APP_SCOPE;
        const OAUTH_PROVIDER = process.env.REACT_APP_OAUTH_PROVIDER_DOMAIN;
        window.location.href = `${OAUTH_PROVIDER}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${ORIGIN}`
    }
}

export default Authenticate;