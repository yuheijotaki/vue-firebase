<template>
  <h1>コンテンツページ</h1>
  <template v-if="displayNameText">
    <p>こんにちは、{{ displayNameText }}さん</p>
  </template>
  <p>{{ contentsText }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onBeforeUnmount } from 'vue';
const contentsText = ref();
const auth = getAuth();
const displayNameText = ref();
const authListener = onAuthStateChanged(auth, (user) => {
  if (user) {
    displayNameText.value = user.displayName;
    contentsText.value = 'ログイン済みユーザー用のコンテンツです。';
  } else {
    contentsText.value = 'コンテンツを見るためにはログインしてください。';
  }
});
onBeforeUnmount(() => {
  authListener();
});
</script>
