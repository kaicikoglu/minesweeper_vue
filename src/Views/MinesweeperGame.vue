<script>
import {defineComponent} from "vue";
import NavBar from "@/components/NavBar/NavBarAbout.vue";
import GameField from "@/components/Game/GameField.vue";

export default defineComponent({
  components: {NavBar, GameField}
})
</script>

<template>
  <NavBar prop1="/game/easy" prop1a="Easy" prop2a="Medium" prop2="/game/medium" prop3a="Hard" prop3="/game/hard"/>
  <GameField :difficulty="this.$route.params.difficulty"/>
</template>

<style>

</style>