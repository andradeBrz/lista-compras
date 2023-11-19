<template>
    <div>
      <b-sidebar v-model="isVisible" id="sidebar-border" sidebar-class="border-right" no-header>
        <div class="links">
            <div class="link">
                <div @click="goTo('ShoppingList')">ShoppingList</div>
            </div>
            <div class="link">
                <div @click="goTo('Historic')">Historic</div>
            </div>
            <div class="link">
                <div @click="goTo('Graphs')">Graphs</div>
            </div>
        </div>
      </b-sidebar>
    </div>
  </template>

  <script>
  export default {
    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        goTo: function(routeName){
            this.$router.push({name: routeName});
        }
    },
    computed: {
        isVisible: {
            get(){
                return this.visible
            },
            set(newValue){
                this.$emit('input', newValue)
            }
        }
    }
  }
  </script>

<style>
    .b-sidebar-body{
        background-color: #404075;
        width: 300px;
    }
    .links{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }

    .link{
        color: rgb(190, 189, 189);
        cursor: pointer;
        padding-inline: 30px;
        padding-top: 10px;
        display: flex;
        font-size: larger;
        margin-bottom: 10px;
    }

    .link:hover{
        color: white;
    }

    #sidebar-border{
        height: calc(100vh - 60px);
        width: 300px;
        top: 60px
    }
</style>