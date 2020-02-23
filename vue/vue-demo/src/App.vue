<template>
  <div id="app">
    <img alt="Vue logo" :src="logo">

    <div>
      <!--数据绑定-->
      {{msg}}
      <br/>
      <!--computed计算属性-->
      {{reversedMsg}}
      {{now()}}
      <br/>
      <!--watch监听器-->
      <Wat :test="'watch'"/>
      <br/>
      <!--:class-->
      <div  class="static"
            :class="{ active: isActive, 'text-danger': hasError }"
      >
        class属性
      </div>
      <!--:style-->
      <div :style="[baseStyles,fontStyle]">
        内联样式
      </div>
      <!--v-if-->
      <div v-if="show">v-if:true</div>
      <div v-else>v-else</div>
      <!--v-show-->
      <div v-show="!show">show</div>
      <!--v-for,遍历对象属性-->
      <div v-for="(value, name, index) in object" :key="name">
        {{ index }}. {{ name }}: {{ value }}
      </div>
      <button @click="addAttr">添加object属性</button>
      <!--v-for:遍历数组-->
      <div v-for="(item,index) in arrs" :key="item">
        {{index}}：{{item}}
      </div>
      <!--@click-->
      <button @click.once="addCount">点击加1:{{count}}</button>
      <!--v-model--->
      文本：<input v-model.lazy="value">
      多行文本：<textarea v-model="value" placeholder="add multiple lines"></textarea>
      <p>value:{{value}}</p>
      复选框：
      <div>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
      </div>
      单选框：
      <div>
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>
      选择框：
      <select v-model="selected">
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.text }}
        </option>
      </select>
      <span>Selected: {{ selected }}</span>
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
          value: '',
          isActive: true,
          hasError: false,
          activeColor: 'yellow',
          fontSize: 20,
          styleObject: {
              color: 'yellow',
              fontSize: '20px'
          },
          baseStyles: {
              color: 'yellow',
          },
          fontStyle: {
              fontSize: '20px'
          },
          show:true,
          object: {
              title: 'hello vue',
              author: 'aaron',
              publishedAt: '2020'
          },
          arrs: ['aaron','steve','daniel'],
          count: 1,
          checkedNames:[],
          picked: '',
          selected: 'A',
          options: [
              { text: 'One', value: 'A' },
              { text: 'Two', value: 'B' },
              { text: 'Three', value: 'C' }
          ]
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
      addCount() {
          this.count +=1
      },
      addAttr(){
          this.$set(this.object,'updateTime',new Date().getDate())
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
.active{
  font-size:16px;
  color:red;
}
</style>
