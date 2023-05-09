import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyAND3kQcfnJO6u9yvB3zSrVaLelTDWyfrI",
  authDomain: "bibliotech-imersao.firebaseapp.com",
  projectId: "bibliotech-imersao",
  storageBucket: "bibliotech-imersao.appspot.com",
  messagingSenderId: "353973947261",
  appId: "1:353973947261:web:485a9f5fd442655d925a14"
};
// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);