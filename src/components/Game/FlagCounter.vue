<script>
export default {
  name: "FlagCounter",
  props:{
    flags: Number
  }

}
</script>

<template>
  <div class="flagcount-container">
    <div id="flagsLeft" class="flagcount">Flags left: {{ this.flags }}</div>
  </div>
</template>

<style scoped>
.flagcount-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.flagcount {
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;
  display: inline-block;
}
</style>