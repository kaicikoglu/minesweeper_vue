<template>
  <h1>Create Minesweeper Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p>
    <button @click="register" class="button">Register</button>
  </p>
</template>

<script setup>
import {ref} from "vue";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(() => {
        console.log("success");
        router.push('/home')
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      })
};

</script>

<style scoped>

</style>