<template>
    <div>
        {{childTest}}
    </div>
</template>
<script>
    export default {
        props: {
          test: {
              default: '',
              type:String
          }
        },
        watch: {
            test(newVal,oldVal){
                console.log(newVal)
                console.log(oldVal)
                this.childTest = newVal
            }
        },
        data() {
            return {
                childTest: this.test
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {}
    }
</script>
<style scoped>

</style>