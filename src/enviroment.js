let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1' : 
    APIURL = 'http://localhost:3586';
        break;
    case 'nicksfinalserver2021.herokuapp.com/':
    APIURL = 'https://nicksfinalserver2021.herokuapp.com'
}

export default APIURL;