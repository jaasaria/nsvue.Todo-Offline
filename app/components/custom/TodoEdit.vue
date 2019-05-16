
<template>
  <Page class="page">

    <ActionBar
      title="Edit Todo"
      class="actionbar"
    >
      <NavigationButton
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
      <ActionItem
        android.position="actionBar"
        ios.position="right"
      />
    </ActionBar>

    <StackLayout
      class="content"
      height="100%"
    >

      <TextField
        hint="Enter Todo Here"
        :text="todo"
        class="center-v m-t-20"
      />

      <Button
        text="Update"
        class="btnupdate m-t-20 center-v"
        @tap="$navigateBack()"
      />

    </StackLayout>

  </Page>
</template>


<script>
export default {
  props: ['todo'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    login () {
    }
  },
}
</script>

<style scoped>
.btnupdate {
  color: white;
  background-color: #20a8d8;
  padding: 5;
  vertical-align: center;
  height: 50;
}
</style>