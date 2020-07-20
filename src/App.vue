<template>
  <div id="app">
    <b-field style="margin: auto">
      <b-input v-model="inputs.title" placeholder="Enter Task"></b-input>
      <b-datetimepicker
          v-model="inputs.datetime"
          :minDateTime="minDateTime"
          :show-week-number="showWeekNumber"
          placeholder="Select Deadline Date"
          icon="calendar-today"
          trap-focus>
      </b-datetimepicker>
      <p class="control">
        <b-button @click="addDeadline" type="is-primary">Add Deadline</b-button>
      </p>
    </b-field>
    <div v-for="(d, i) in deadlines" :key="d.id">
      <clock 
        style="margin-top: 40px;"
        :index="i"
        :deadline="d.datetime" :title="d.title"></clock>
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
    const min = new Date()
            min.setDate(min.getDate() - 7)
            min.setHours(9)
            min.setMinutes(0)
            min.setSeconds(0)
    return {
      minDateTime: min,
      showWeekNumber: true,
      deadlines: [],
      inputs: {
        title: '',
        datetime: ''
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
$primary: #777;
$blue: #ccc;
$family-sans-serif: Rajdhani, sans-serif;
body, html {
  background: #333;
  height: 100%;
}
#app {
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  font-family: 'Rajdhani', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input {
  color: white !important;
  background-color: transparent !important;
  &::placeholder {
    color: #aaa;
    opacity: 1;
  }
}
::placeholder {
  color: #aaa !important;
  opacity: 1 !important; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: #aaa !important;
}

::-ms-input-placeholder { /* Microsoft Edge */
 color: #aaa !important;
}
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
