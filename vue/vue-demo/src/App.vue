<template>
  <div id="app">
    <img alt="Vue logo" :src="logo">

    <div>
      {{msg}}
      <br/>
      {{reversedMsg}}
      {{now()}}
      <Wat :test="'watch'"/>
      <input v-model="value">
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import  Wat from './components/Watch'

export default {
  name: 'App',
  components: {
    // HelloWorld
      Wat
  },
  data() {
      return{
          logo: require('./assets/logo.png'),
          msg: 'hello vue',
          value: ''
      }
  },
  computed: {
      // 计算属性的 getter
      reversedMsg() {
          // `this` 指向 vm 实例
          return this.msg.split('').reverse().join('')
      }
  },
  methods:{
      now() {
          return new Date().getTime()
      },
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
