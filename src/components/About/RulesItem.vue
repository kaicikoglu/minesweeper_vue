<script setup>

</script>

<template>
  <section id="rules-item" class="container mt-5">
    <h2 class="text-center mb-4">Rules of Minesweeper</h2>
    <p>
      The rules of Minesweeper are straightforward:
    </p>
    <ul>
      <li>The game is played on a grid of squares, some of which contain hidden mines.</li>
      <li>Players click on squares to reveal what is underneath. If a mine is revealed, the game ends.</li>
      <li>Numbers on revealed squares indicate how many mines are adjacent to that square.</li>
      <li>Using the numbers as clues, players must deduce the locations of mines and flag them to avoid detonation.</li>
      <li>The game is won when all non-mine squares are revealed.</li>
    </ul>
  </section>
</template>

<style scoped>
li{
  list-style-type: none;
}
</style>