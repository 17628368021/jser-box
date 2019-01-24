<template>
  <remote-js :src="this.jsUrl"></remote-js>
</template>

<script>
  export default {
    components: {
      'remote-js': {
        render (createElement) {
          var self = this
          return createElement('script', {
            attrs: { type: 'text/javascript', src: this.src },
          })
        },
        props: {
          src: { type: String, required: true }
        }
      }
    },
    props: {
      jsUrl: { type: String, required: true },// 需要加载的外部url
    }
  }
</script>