import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDJyOYlMw2q26PPoBcwmMQEMRtp6vzF9OE',
  authDomain: 'vue-firebase-a501d.firebaseapp.com',
  projectId: 'vue-firebase-a501d',
  storageBucket: 'vue-firebase-a501d.appspot.com',
  messagingSenderId: '102856413514',
  appId: '1:102856413514:web:f19fbd512bd456393331b3',
};
initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount('#app');
