<template>
  <div class="hello">
    <clock style="margin-top: 40px;"></clock>
  </div>
</template>

<script>
import clock from './clock'
export default {
  name: 'HelloWorld',
  components: {clock},
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
