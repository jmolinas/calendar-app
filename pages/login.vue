<template>
  <div class="wrapper d-flex justify-content-center align-items-center flex-column">
    <h1>CALENDAR API</h1>
    <section id="LoginPage" class="d-flex justify-content-center align-items-center">
      <div class="LoginWrap">
        <Alertbox />
        <div class="fields d-flex flex-column justify-content-center align-items-start">
          <span class="label">Email</span>
          <input type="text" name="email" v-model="credentials.email" />
        </div>
        <div class="fields d-flex flex-column justify-content-center align-items-start">
          <span class="label">Password</span>
          <input type="password" name="password" v-model="credentials.password" />
        </div>
        <div class="fields">
          <a
            href=""
            @click.prevent="doLogin"
            class="login d-flex justify-content-center align-items-center"
          >
          Login
          &nbsp;<b-spinner small v-if="isLoading"></b-spinner>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
a:hover{
  text-decoration: none
}
</style>
<script>
import Alertbox from '~/components/Alertbox'
import User from '~/models/User'
export default {
  components: {
    Alertbox
  },
  data() {
    return {
      isLoading : false,
      remember: false,
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  head: {
    bodyAttrs: {
      id: 'LoginPage'
    }
  },
  methods: {
    async doLogin() {
      try {
        await this.$auth.loginWith('local',{ data: this.credentials });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style lang="scss">
@function rem($size) {
  @return (($size * 0.625) / 10) + rem;
}

@mixin font-size($font) {
  font-size: $font + px;
}

body#LoginPage {
  background-color: #585fa6;
  height: 100%;
  #__nuxt,
  #__layout,
  .wrapper {
    height: 100%;
  }
  h1 {
    color: #fff;
    @include font-size(24);
  }
  section#LoginPage {
    margin: rem(25) 0 0;
    width: 100%;
    .LoginWrap {
      flex: 0 0 348px;
      background-color: #fff;
      min-height: 298px;
      padding: rem(25);
      width: 100%;
      .fields {
        margin: rem(15) 0 0;
        input[type='text'],
        input[type='password'] {
          width: 100%;
          height: 34px;
          border: 1px solid #eae8e7;
          margin: rem(12) 0 0;
          padding: 0 0 0 rem(15);
          outline: 0;
        }
        span.label {
          @include font-size(13);
          color: #343030;
        }
        input[type='submit'],a.login {
          background-color: #2aa835;
          color: #fff;
          @include font-size(13);
          outline: 0;
          border: 0;
          width: 100%;
          height: 35px;
          cursor: pointer;
        }

        .remember {
          flex: 0 0 110px;
          span.util {
            @include font-size(13);
            color: #c9c4c1;
          }
          input[type='checkbox'] {
            width: 12px;
            height: 12px;
            outline: 0;
            border: 1px solid #eae8e7;
          }
        }
        .forgot {
          flex: 1;
          a {
            @include font-size(13);
            color: #c9c4c1;
          }
        }
      }
    }
  }
}
</style>