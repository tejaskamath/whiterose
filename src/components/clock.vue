<template>
  <div @mouseover="mouseover = true" @mouseout="mouseover = false">
    <h3 class="clockHeader" :class="{zero: index === 0}">
      <span>{{title}}</span>
      <b-button 
              @click="$emit('delete', index)"
              @mouseover="mouseover = true" @mouseout="mouseover = false" 
              type="is-small is-info"
              style="border: none; transition: .2s; margin-left: 4px;"
              :style="{opacity: mouseover ? 1 : 0}"
              outlined
              icon-right="delete" />
    </h3>
    <h2 :class="{zero: index === 0}"> 
      <span class="clockPart">
        <p>{{clock.days}}</p>
        <p>days</p>
      </span> : 
      <span class="clockPart">
        <p>{{clock.hours}}</p>
        <p>hours</p>
      </span> : 
      <span class="clockPart">
        <p>{{clock.minutes}}</p>
        <p>minutes</p>
      </span> : 
      <span class="clockPart">
        <p>{{clock.seconds}}</p>
        <p>seconds</p>
      </span>
    </h2>
  </div>
</template>

<script>
import moment from 'moment'
import Date from 'datejs'
export default {
  name: 'clock',
  props: {
    title: {default: 'Deadline'},
    index: {default: ''},
    deadline: {default: moment().add(1, 'year').format('YYYY-MM-DD HH:mm:ss')}
  },
  data () {
    return {
      mouseover: false,
      time: moment(),
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  mounted () {
    setInterval(() => {
      this.time = moment()
    }, 1000)
  },
  computed: {
    clock: function () {
      return this.getRemTime(this.deadline, this.time.format('YYYY-MM-DD HH:mm:ss'))
    }
  },
  methods: {
    getRemTime: function (endtime, starttime = (new Date())) {
      const total = moment(endtime, this.format).diff(moment(starttime, this.format), 'seconds');
      const seconds = Math.floor((total) % 60 );
      const minutes = Math.floor((total/60) % 60 );
      const hours = Math.floor((total/(60*60)) % 24 );
      const days = Math.floor(total/(60*60*24));

      return {
        total,
        days,
        hours: ("0" + hours).slice(-2),
        minutes: ("0" + minutes).slice(-2),
        seconds: ("0" + seconds).slice(-2)
      }
    }
  }
}
</script>

<style lang="scss">
  .clockPart {
    display: inline-flex;
    flex-direction: column;
    p { margin: 0px;}
    p:nth-child(2) { 
      font-size: 14px; 
      margin-top: 8px;
      font-weight: 300;
    }
  }
  .clockHeader button:hover {
    background: #444 !important;
    color: white !important;
  }
  span:first-child { font-weight: 600; }
  span:nth-child(2) { font-weight: 500; }
  span:nth-child(3) { font-weight: 400; }
  span:nth-child(4) { font-weight: 300; }
  h2, h3 {
    color: white;
    font-family: Rajdhani, sans-serif;
    cursor: pointer;
  }
  h2.zero {
    font-size: 60px;
    p:nth-child(2) { 
      font-size: 16px; 
      margin-top: 8px;
      font-weight: 300;
    }
  }
  h2:not(.zero) {
    font-size: 30px;
  }
  h3.zero {
    font-size: 24px;
    font-weight: 200;
    letter-spacing: 0.5px;
    button {
      margin-left: 12px;
      font-size: 14px !important;
      color: white !important;
    }
  }
  h3:not(.zero) {
    button {
      margin-left: 8px;
      padding: 2px 8px;
      font-size: 10px !important;
      color: white !important;
    }
  }
</style>