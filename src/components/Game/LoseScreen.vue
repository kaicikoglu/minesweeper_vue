<script setup>

import NavBar from "@/components/NavBar/NavBarAbout.vue";
</script>

<template>
  <NavBar prop1="easy" prop1a="Easy" prop2a="Hard" prop2="hard" prop3a="Extreme" prop3="extreme"/>
  <div id="lostScreen" class="text-center">
    <h2 class="text-center">Try again!</h2>
    <div class="restartButton">
      <button @click="$router.push('game/easy')">Easy</button>
      <button @click="$router.push('game/medium')">Medium</button>
      <button @click="$router.push('game/hard')">Hard</button>
    </div>

  </div>
</template>

<style scoped>
#lostScreen {
  position: fixed;
  color: #ed7d31;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
</style>