<script>

import NavBarItem from "@/components/NavBar/NavBarItem.vue";

export default {
  name: 'NavBar',
  components: {NavBarItem},
  props: {
    prop1: String,
    prop1a: String,
    prop2: String,
    prop2a: String,
    prop3: String,
    prop3a: String,
    prop4: String,
    prop4a: String,
    prop5: String,
    prop5a: String
  }
}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Minesweeper Web App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <NavBarItem :txt="prop1a" :link="prop1"/>
          <NavBarItem :txt="prop2a" :link="prop2"/>
          <NavBarItem :txt="prop3a" :link="prop3"/>
          <NavBarItem :txt="prop4a" :link="prop4"/>
          <NavBarItem :txt="prop5a" :link="prop5"/>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>