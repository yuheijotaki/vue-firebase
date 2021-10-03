<template>
  <h1>ログインページ</h1>
  <p><input type="mail" placeholder="メールアドレス" v-model="email" /></p>
  <p><input type="password" placeholder="パスワード" v-model="password" /></p>
  <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  <button @click="signIn">ログインする</button>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const errorMessage = ref();
const router = useRouter();
const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push('/contents');
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = '不正なメールアドレスです。';
          break;
        default:
          errorMessage.value = 'メールアドレスもしくはパスワードが違います。';
          break;
      }
    });
};
</script>
