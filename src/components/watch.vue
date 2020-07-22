<template>
  <div class="watch">
    <p>{{formattedTime}}</p>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'watch',
  data () {
    return {
      timezones: [],
      time: moment()
    }
  },
  computed: {
    formattedTime: function () {
      return this.time.format('HH:mm:ss')
    }
  },
  mounted () {
    console.log('Mounted')
    setInterval(() => {
      this.time = moment()
    }, 1000)
  }
}
</script>

<style lang="scss">
  .watch {
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 20px;
  }
</style>