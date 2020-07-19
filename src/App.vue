<template>
  <div id="app">
    <input v-model="inputs.title" type="text">
    <input v-model="inputs.date" type="date">
    <input v-model="inputs.time" type="time">
    <button @click="addDeadline">Add Deadline</button>
    <button @click="deleteU">Remove</button>

    <div v-for="d in deadlines" :key="d.id">
      <clock 
        style="margin-top: 40px;"
        :deadline="d.date + ' ' + d.time " :title="d.title"></clock>
    </div>
  </div>
</template>

<script>
import clock from './components/clock'
import store from './storeapi'
export default {
  name: 'App',
  components: {clock},
  data () {
    return {
      deadlines: [],
      inputs: {
        title: '',
        date: '',
        time: ''
      }
    }
  },
  mounted() {
    this.deadlines = store.get('deadlines')
  },
  methods: {
    addDeadline: function () {
      this.deadlines = store.add('deadlines', this.inputs)
    },
    get: function () {
      this.deadlines = store.get('deadlines')
    },
    deleteU: function () {
      this.deadlines = store.remove('deadlines')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
