<template>
  <div id="app">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',  
  activated(){
    this.$setgoindex()
    console.log('判断');
    
  },
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
