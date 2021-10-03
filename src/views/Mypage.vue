<template>
  <h1>マイページ</h1>
  <ul v-if="isLoggedIn">
    <li>ユーザーID：{{ uidText }}</li>
    <li>ユーザー名：{{ displayNameText }}</li>
    <li>メールアドレス：{{ emailText }}</li>
    <li>メール認証：{{ emailVerifiedText }}</li>
  </ul>
  <p>
    <button @click="resetPassword">パスワードのリセットメールを送信</button>
  </p>
  <p>
    <button @click="deleteAccount">アカウントを削除する</button>
  </p>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import { onBeforeUnmount } from 'vue';
const router = useRouter();
const auth = getAuth();
const isLoggedIn = ref(true);
const uidText = ref();
const displayNameText = ref();
const emailText = ref();
const emailVerifiedText = ref();
const authListener = onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true;
    uidText.value = user.uid;
    displayNameText.value = user.displayName;
    emailText.value = user.email;
    emailVerifiedText.value = user.emailVerified;
  } else {
    isLoggedIn.value = false;
    router.push('/');
  }
});
onBeforeUnmount(() => {
  authListener();
});

const resetPassword = () => {
  const user = auth.currentUser;
  sendPasswordResetEmail(auth, user.email)
    .then(() => {
      alert('パスワードのリセットメールが送信されました。');
    })
    .catch((error) => {});
};

const deleteAccount = () => {
  const user = auth.currentUser;
  const result = window.confirm('アカウントを削除しますか？');
  if (result) {
    deleteUser(user)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {});
  }
};
</script>

<style>
p {
  margin-top: 1rem;
}
</style>
