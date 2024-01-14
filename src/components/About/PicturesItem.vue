<script setup>

</script>

<template>
  <section id="pictures-item" class="container mt5">
    <h2 class="text-center mb-4">Pictures</h2>
    <div class="pictures">
      <img alt="" src="../../assets/Minesweeper_Field.png">
      <img alt="" src="../../assets/Minesweeper_Lost.png">
      <img alt="" src="../../assets/Minesweeper_Solved.png">
    </div>
  </section>
</template>

<style scoped>

@media (min-width: 600px){
  img {
    width: 250px;
    height: 250px;
    margin: 5px;
  }
}

@media (max-width: 600px){
  img {
    width: 100px;
    height: 100px;
    margin: 5px;
  }
}

@media (min-width: 992px){
  img {
    width: 300px;
    height: 300px;
    margin: 15px;
  }
}


.pictures{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>