<template>
  <div>

    <button class="information-button" v-on:click="open()" v-if="!isOpened"> ? </button>
    <button class="information-button" v-on:click="open()" v-if="isOpened"> X </button>

    <div class="information" v-show="isOpened">
      <div class="content">
        <h3>What is Tododoro?</h3>
        <p>Tododoro is an application that serves as a platform to help manage your time efficiently, using the Pomodoro Technique.</p>
        <p>The Pomodoro Technique, developed by Francesco Cirillo, is a well-known effective method used for maximising time. </p>
        <br>
        <h3>How it works:</h3> 
        <ol>
          <li>Note down your task(s) for the day with the to-do list</li>
          <li>Set the timer to your preferred duration for each focus session (ranging from 25 to 50 minutes)</li>
          <li>After the timer rings, take a short 5 minutes break</li>
          <li>Strikethrough the task(s) that you have completed during each focus session</li>
          <li>Repeat steps 2 to 4 until four focus sessions are completed</li>
          <li>Reward yourself with a longer break (ranging from 15 to 30 minutes)</li>
        </ol>
        <br>
        <p>This technique aids in staying focus on tasks and avoid potential burnout. </p>
        <br>
        <p>Give it a try! &#9969; </p>
        <div class="close-container">
          <p class="close-text" v-on:click="open()">x close</p>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "pop-up",
  data() {
    return {
      isOpened: false
    }
  }, 
  methods: {
    open: function() {
      this.isOpened = !this.isOpened;
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Nunito);

.information-button {
  height: 30px;
  width: 30px;
  font-size: 20px;
  font-family: 'Nunito';
  border: none;
  border-radius: 50px;
  cursor: pointer;
  color: #f6f5f7;
  background: #161617;
  box-shadow: inset -2px -2px 2px #0d0d0d,
              inset 2px 2px 2px #1f1f21;
}

/** overlay */
.information {
  position: fixed;
  top: 8vh;
  bottom: 0;
  left: 0;
  right: 0;
  background:rgba(0,0,0,0.9);
  overflow: auto;
}

/** what is tododoro */
.content {
  padding: 5vw;
  text-align: justify;
  line-height: 1.6;
  font-family: 'Nunito';
  color: #4c5257;
}

/** what is tododoro - headings */
h3 {
  color: #b3bcc4;
}

/** what is tododoro - list */
ol {
  padding-left: 5vw;
}

li {
  display: list-item;
  list-style-position: outside;
}

/** what is tododoro - close container */
.close-container {
  display: flex; 
  justify-content: center; 
  margin-top: 1vw;
}

.close-text {
  cursor: pointer; 
  color: #b3bcc4;
  width: max-content; 
}
</style>