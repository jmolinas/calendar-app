<template>
  <div>
    <b-alert :show="error !== null" variant="danger" class="questrial">
      <div v-if="code == 422 && Array.isArray(error)">
        <p
          v-for="(msg,key) in error"
          v-bind:key="key"
          :class="key === (error.length-1) ? 'mb-0' : 'mb-1'"
        >{{ msg }}</p>
      </div>
      <div v-else>
        <p class="mb-0">{{ error }}</p>
      </div>
    </b-alert>
    <b-alert :show="info !== null" variant="success" class="questrial">{{ info }}</b-alert>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  beforeDestroy() {
    this.SET_ERROR(null);
  },
  created() {
    this.SET_ERROR(null);
  },
  computed: {
    ...mapGetters({
      error: "alert/error",
      code: "alert/code",
      info: "alert/info",
    }),
  },
  methods: {
    ...mapMutations({
      SET_ERROR: "alert/SET_ERROR",
    }),
  },
};
</script>
