
<template>
  <Page class="page" actionBarHidden="true">
    <StackLayout class="bg" width="100%" height="100%">

      <GridLayout rows="35*, 65* , auto">

        <GridLayout row="0" class="logo-container">
          <GridLayout class="image-container">
            <Image src="~/assets/images/logo@3x.png"></Image>
          </GridLayout>
        </GridLayout>

        <StackLayout row="1" class="content">
          <Label class="lbl m-t-20" text="Email"/>
          <TextField class="login-input-field"/>
          <Label class="lbl m-t-20" text="Password"/>
          <TextField class="login-input-field"/>

          <Button class="btn-primary m-t-30 m-b-20" text="Login" @tap="login"/>

          <GridLayout class="m-t-30" rows="auto,auto" @tap="register">
            <Label row="0" class="lbl-register center-all" text="Dont have a account?"/>
            <Label row="1" class="lbl-register center-all" text="Register Here"/>
          </GridLayout>
        </StackLayout>

        <GridLayout class="m-b-20" row="2" rows="auto,auto">
          <Label class="lbl center-all" row="0" text="Created by: Jaasaria" textWrap="true"/>
          <Label class="lbl center-all" row="1" text="@ Copyright 2019" textWrap="true"/>
        </GridLayout>
      </GridLayout>

    </StackLayout>
  </Page>
</template>

<script>
import Home from "./Home";

export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$navigateTo(Home, {
        clearHistory: true
      });
      console.log("login");
    },
    register() {
      console.log("register");
    }
  }
};
</script>

<style scoped>
.content {
  margin-left: 10%;
  margin-right: 10%;
}
.image-container {
  width: 33%;
}
.bg {
  background-color: #20a8d8;
}
.lbl {
  color: white;
}

.btn-primary {
  color: white;
  background-color: #084e68;
  padding: 5;
  vertical-align: center;
  height: 50;
}

.lbl-register {
  color: white;
  background-color: #20a8d8;
  text-align: center;
  width: 100%;
}

.login-input-field {
  color: #527796;
  border-width: 1;
  border-radius: 4;
  border-color: #ffffff;
  background-color: #ffffff;
  placeholder-color: rgba(16, 50, 65, 0.45);
  vertical-align: middle;
}

.logo-container {
  clip-path: ellipse(70% 32% at 50% 20%);
  background-color: #1e90b9;
}
</style>