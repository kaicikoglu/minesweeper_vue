<script setup>

</script>

<template>
  <section id="try-it-item">
    <h2 class="text-center mb-4">Try it out!</h2>
    <div class="button">
      <button @click="$router.push('game/easy')">Easy</button>
      <button @click="$router.push('game/medium')">Medium</button>
      <button @click="$router.push('game/hard')">Hard</button>
    </div>
  </section>
</template>

<style scoped>
#try-it-item{
  margin-bottom: 20px;
}

router-link{
  color: #4f4a45;
}

.button{
  color: #4f4a45;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px;
}
</style>