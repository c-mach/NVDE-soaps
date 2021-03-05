import firebase from 'firebase/app';

import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDpBg7ATrMXEID--fdwhm67Zz_LWbMbBwU",
    authDomain: "nvde-soap-shop.firebaseapp.com",
    projectId: "nvde-soap-shop",
    storageBucket: "nvde-soap-shop.appspot.com",
    messagingSenderId: "854248418831",
    appId: "1:854248418831:web:da428754099ffd2382bd7a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
