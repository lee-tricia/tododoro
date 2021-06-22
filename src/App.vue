<template>
  <div class="container">
    <h1>Tododoro</h1>
    <pop-Up class="popup"></pop-Up>

    <div class="features">
      <set-Timer class="timer"></set-Timer>
      <to-do-List></to-do-List>
    </div>

    <div class="footer">
      <a href="https://github.com/lee-tricia" target="_blank">
        <img src="./assets/github-mark.svg" alt="GitHub mark" style="vertical-align: middle;"/>
        <span style="vertical-align: middle;"> lee-tricia</span>
      </a>
    </div>
  </div>
</template>

<script>
import popUp from "./components/pop-up.vue";
import setTimer from "./components/set-timer.vue";
import toDoList from "./components/to-do-list.vue";

export default {
  name: "Homepage",
  data() {
    return {};
  },
  components: {
    "pop-Up": popUp,
    "set-Timer": setTimer,
    "to-do-List": toDoList,
  },
  created() {
    this.vueInsomnia().on();
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Nunito);

* {
  margin: 0;
  padding: 0;
  background: #161617;
}

.container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

h1 {
  font-family: "Nunito";
  color: #cdd0d7;
  padding: 10px;
}

.popup {
  position: absolute;
  top: 2vh;
  right: 2vw;
  z-index: 999;
}

/** features: timer and todo list */
.features {
  margin-bottom: 24px;
}

.timer {
  padding-top: 20px;
  z-index: 10;
}

/** footer */
.footer {
  text-align: center;
  padding: 24px;
}

a, a:link, a:visited, a:active {
  font-family: "Nunito";
  color: #cdd0d7;
  text-decoration: none;
}

/** screen size above 768px */
@media only screen and (min-width: 768px) {
  .features {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
