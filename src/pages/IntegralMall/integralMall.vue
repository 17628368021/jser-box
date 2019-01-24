<template>
  <div id="integralMall">
    <v-header :state="headerState"></v-header>
    <div style="background:#fff;padding:30px 0 20px 0;">
      <img src="./integraMall.png" width="100%" style="min-width:1368px;max-width:1596px;" alt="">
    </div>
  </div>
</template>

<script>
import header from '@/components/herder/header';
export default {
  data () {
    return {
      headerState: 1,
    };
  },
  components: { 'v-header':header },

  computed: {},

  methods: {}
}
</script>

<style lang='less'>

</style>