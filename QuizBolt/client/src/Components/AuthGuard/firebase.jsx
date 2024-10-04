import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Config } from "../../Config/Config";


const firebaseConfig = {
    apiKey: Config.API_KEY,
    authDomain: Config.AUTH_DOMAIN,
    projectId: Config.PROJECT_ID,
    storageBucket: Config.STORAGE_BUCKET ,
    messagingSenderId: Config.SENDERID,
    appId: Config.APPID,
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};

export default app;