<script setup>

</script>

<template>
  <div>
    <header>
      <h1 style="text-align: center; margin-top: 300px;">Minesweeper</h1>
    </header>

    <div class="button">
      <button @click="$router.push('/register')">Register</button>
      <button @click="$router.push('/sign-in')">Sign In</button>
    </div>
  </div>
</template>

<style scoped>
.button {
  color: #4f4a45;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px;
}
</style>