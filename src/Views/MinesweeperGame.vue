<script>
import {defineComponent} from "vue";
import NavBar from "@/components/NavBar/NavBarAbout.vue";
import GameField from "@/components/Game/GameField.vue";

export default defineComponent({
  components: {NavBar, GameField}
})
</script>

<template>
  <NavBar prop1="easy" prop1a="Easy" prop2a="Hard" prop2="hard" prop3a="Extreme" prop3="extreme"/>
  <GameField :difficulty="this.$route.params.difficulty"/>
</template>

<style>

</style>