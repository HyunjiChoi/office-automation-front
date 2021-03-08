<template>
  <div class="custom-wrapper">
    <div class="custom-outer">
      <div class="custom-inner">
        <main class="custom-main">
          <div class="custom-header">
            <div class="ui statistic">
              <div class="value">
                <i class="address book icon"></i>
              </div>
              <div class="label">
                로그인 정보를 입력해 주세요.
              </div>
            </div>
          </div>
          <div class="custom-input">
            <div class="ui fluid large left icon input">
              <input type="text" placeholder="Username" v-model="id">
              <i class="user icon"></i>
            </div>
          </div>
          <div class="custom-input">
            <div class="ui fluid large left icon input">
              <input type="password" placeholder="Password" v-model="pwd">
              <i class="lock icon"></i>
            </div>
          </div>
          <div class="custom-login">
            <div class="ui fluid huge primary button" @click="login">
              LOGIN
            </div>
          </div>
          <div class="custom-forget">
            <div class="ui fluid basic button">
              Forget Username / Password
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api';

export default {
  name: "Login",
  data(){
    return {
      id: '',
      pwd: ''
    }
  },
  methods: {
    login() {
      loginApi.login(this.id, this.pwd)
    }
  }
}
</script>
