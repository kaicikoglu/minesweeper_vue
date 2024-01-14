<template>
  <li class="nav-item">
    <a :href="link" class="nav-link">{{ txt }}</a>
  </li>
</template>

<script>
export default {
  name: "NavBarItem",
  props: {
    txt: String,
    link: String
  }
}
</script>

<style scoped>
</style>
