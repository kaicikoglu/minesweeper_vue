<script>
import TryIt from "@/components/About/TryIt.vue";
import HeritageItem from "@/components/About/HeritageItem.vue";
import HowTo from "@/components/About/HowTo.vue";
import NavBar from "@/components/NavBar/NavBarAbout.vue";
import PicturesItem from "@/components/About/PicturesItem.vue";
import RulesItem from "@/components/About/RulesItem.vue";

export default {
  name: 'App',
  components: {
    PicturesItem,
    HeritageItem,
    RulesItem,
    NavBar,
    HowTo,
    TryIt
  }
}
</script>

<template>
  <div class="container">
    <NavBar prop1="#" prop1a="Heritage" prop2="#rules-item" prop2a="Rules" prop3="#pictures-item"
            prop3a="Pictures" prop4="#how-to-item"
            prop4a="How to Play" prop5="#try-it-item" prop5a="Try it out!"/>
    <HeritageItem/>
    <RulesItem/>
    <PicturesItem/>
    <HowTo/>
    <TryIt/>
  </div>

</template>

<style scoped>
</style>