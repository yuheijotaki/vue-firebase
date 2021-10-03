<template>
  <h1>会員登録ページ</h1>
  <p><input type="text" placeholder="ユーザー名" v-model="displayName" /></p>
  <p><input type="mail" placeholder="メールアドレス" v-model="email" /></p>
  <p><input type="password" placeholder="パスワード" v-model="password" /></p>
  <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  <button @click="register">会員登録をする</button>
</template>

<script setup>
import { ref } from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
const displayName = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref();
const router = useRouter();
const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const currentUser = auth.currentUser;
      updateProfile(currentUser, {
        displayName: displayName.value,
      }).then(() => {
        router.push('/contents');
      });
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = '不正なメールアドレスです。';
          break;
        default:
          errorMessage.value =
            'メールアドレスもしくはパスワード（最低6文字）を入力してください。';
          break;
      }
    });
};
</script>
