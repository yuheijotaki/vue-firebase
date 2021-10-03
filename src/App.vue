<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/">トップページ</router-link>
          </li>
          <li>
            <router-link to="/contents">コンテンツ</router-link>
          </li>
        </ul>
      </nav>
      <nav>
        <template v-if="!isLoggedIn">
          <router-link to="/sign-in">
            <button>ログイン</button>
          </router-link>
          <router-link to="/register">
            <button>会員登録</button>
          </router-link>
        </template>
        <template v-if="isLoggedIn">
          <router-link to="/mypage">
            <button>マイページ</button>
          </router-link>
          <button @click="Logout">ログアウト</button>
        </template>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoggedIn = ref(true);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});
const Logout = () => {
  const result = window.confirm('ログアウトしますか？');
  if (result) {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {});
  }
};
</script>

<style>
*,
body {
  margin: 0;
  padding: 0;
}
body {
  font-size: 100%;
}
#app {
  margin: 2rem auto;
  max-width: 800px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
ul {
  list-style-type: none;
}
nav ul {
  display: flex;
}
nav ul li + li {
  margin-left: 1rem;
}
nav a + a,
nav button {
  margin-right: 1rem;
}
main {
  margin-top: 2rem;
}
h1 {
  font-size: 2rem;
}
h1 + p,
h1 + ul {
  margin-top: 1rem;
}
p,
ul,
input,
button {
  font-size: 1.2rem;
}
p + p {
  margin-top: 0.5rem;
}
p + button {
  margin-top: 1rem;
}
input,
button {
  padding: 0.25rem 0.5rem;
}
.error {
  color: red;
}
</style>
