<template>
  <div id="app">
    <img style="margin: 0px auto 40px auto" width="50" height="50" src="./assets/whiterose-logo.svg">
    {{inputs.datetime}}
    <b-field style="margin: 12px auto">
      <b-input v-model="inputs.title" placeholder="Enter Task"></b-input>
      <b-datetimepicker
          v-model="inputs.datetime"
          :min-datetime="minDateTime"
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
        @delete="deleteClock(...arguments)"
        style="margin-top: 40px;"
        :index="i"
        :deadline="d.datetime" :title="d.title"></clock>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import clock from './components/clock'
import store from 'storerestapi'
export default {
  name: 'App',
  components: {clock},
  data () {
    const min = new Date()
    min.setDate(min.getDate())
    min.setHours(min.getHours())
    min.setMinutes(min.getMinutes())
    min.setSeconds(min.getSeconds())
    return {
      minDateTime: min,
      showWeekNumber: true,
      deadlines: [],
      inputs: {
        title: '',
        datetime: new Date()
      }
    }
  },
  mounted() {
    this.deadlines = store.get('deadlines')
  },
  computed: {
    updatedInputs: function () {
      return {
        title: this.inputs.title,
        datetime: moment(this.inputs.datetime).unix()
      }
    }
  },
  methods: {
    addDeadline: function () {
      moment(this.inputs.datetime).unix()
      this.deadlines = store.post('deadlines', this.updatedInputs)
      this.inputs.title = '';
    },
    get: function () {
      this.deadlines = store.get('deadlines')
    },
    deleteU: function () {
      this.deadlines = store.delete('deadlines')
    },
    deleteClock: function (index) {
      let did = this.deadlines[index].id
      this.deadlines = store.delete(`deadlines/${did}`)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
$primary: #777;
$blue: #ccc;
$info: #eee;
$family-sans-serif: Rajdhani, sans-serif;
body, html {
  height: 100%;
}
body, html, #app {
  background: #333;
  min-height: 100%;
}
#app {
  padding-top: 40px;
  padding-bottom: 100px;
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
