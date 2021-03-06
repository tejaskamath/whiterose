<template>
  <div id="app">
    <watch></watch>
    <p class="timeSaved">
      Saved {{timeSaved}} minutes 
    </p>
    <img style="margin: 0px auto 40px auto" width="50" height="50" src="./assets/whiterose-logo.svg">
    <b-field style="margin: 12px auto">
      <b-input v-model="inputs.title" placeholder="Enter Task"></b-input>
      <b-datetimepicker
          v-if="!showMinutes"
          v-model="inputs.datetime"
          :min-datetime="minDateTime"
          placeholder="Select Deadline Date"
          icon="calendar-today"
          trap-focus>
      </b-datetimepicker>
      <b-numberinput v-else v-model="minutes" controlsPosition="compact" placeholder="Enter minutes"/>
      <p class="control">
        <b-button @click="addDeadline" type="is-primary">Add Deadline</b-button>
      </p>
    </b-field>
    <b-field>
      <b-checkbox class="is-small" v-model="showMinutes">Enter Minutes</b-checkbox>
    </b-field>
    <div v-for="(d, i) in deadlines" :key="d.id">
      <clock 
        @complete="completeTask(...arguments)"
        @delete="deleteClock(...arguments)"
        style="margin-top: 40px;"
        :index="i"
        :deadline="d.datetime" :title="d.title"></clock>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import watch from './components/watch'
import clock from './components/clock'
import store from 'storerestapi'
export default {
  name: 'App',
  components: {clock, watch},
  data () {
    const min = new Date()
    min.setDate(min.getDate())
    min.setHours(min.getHours())
    min.setMinutes(min.getMinutes())
    min.setSeconds(min.getSeconds())
    return {
      minDateTime: min,
      showWeekNumber: true,
      showMinutes: false,
      deadlines: [],
      minutes: '',
      inputs: {
        title: '',
        datetime: new Date()
      },
      completed: []
    }
  },
  mounted() {
    this.deadlines = store.get('deadlines')
    this.completed = store.get('completed')
  },
  computed: {
    updatedInputs: function () {
      if (this.showMinutes) {
        return {
          title: this.inputs.title,
          datetime: moment().add(this.minutes, 'minutes').unix()
        }
      }
      return {
        title: this.inputs.title,
        datetime: moment(this.inputs.datetime).unix()
      }
    },
    timeSaved: function () {
      let value = this.completed
        .map(c => c.saved)
        .reduce((s, v) => s + v, 0)
      return Math.floor(value / 60)
    }
  },
  methods: {
    addDeadline: function () {
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
    },
    completeTask: function (index) {
      let did = this.deadlines[index].id
      let d = store.get(`deadlines/${did}`)
      let saved = moment.unix(d.datetime).diff(moment(), 'seconds')
      d.saved = saved
      this.completed.push(d)
      store.post('completed', d)
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
h1, h2, h3, h4, h5, h6, p, .control-label {
  color: white;
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

.timeSaved {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 16px;
}
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
