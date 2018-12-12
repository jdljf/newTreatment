<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    mounted: function () {
      axios.post('/api/first')
        .then(function (res) {
          console.log(res)
        })
    }
  },
  components: {

  }
}
</script>

<style>
	
</style>
