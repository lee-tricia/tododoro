<template>

  <div class="overall">

    <!-- illustration of digital clock --> 
    <div class="illustration">
      <div class="laptop">
        <div class="laptop-cover">
          <div class="laptop-screen">
            <p class="digitalNum" v-if="countdownHour > 0"> {{ countdownHour | leadingZero }} hr </p>
            <p class="digitalNum" v-if="countdownHour > 0"> : </p>
            <p class="digitalNum"> {{ countdownMinute | leadingZero }} min </p>
            <p class="digitalNum"> : </p>
            <p class="digitalNum"> {{ countdownSecond | leadingZero }} sec </p>
          </div>
        </div>
        <div class="laptop-base">
          <div class="laptop-notch"></div>
        </div>
      </div>
    </div>
    
    <!-- message --> 
    <div class="message">
      <p> " {{ message }} " </p>
    </div>

    <!-- set timer -->
    <div class="setTimer">
      <button class="setTimerBtn" v-on:click="decrement()"> - </button>
      <div class="setTimerText">
        <p v-if="hour > 0"> {{ hour | leadingZero }} hr </p>
        <p> {{ minute | leadingZero }} min </p>
      </div>
      <button class="setTimerBtn" v-on:click="increment()"> + </button>
    </div>

    <!-- buttons --> 
    <div class="buttons">
      <button class="btn" v-on:click="start()" v-show="!started"> START </button>
      <button class="btn" v-on:click="pause()" v-show="started && !paused"> PAUSE </button>
      <button class="btn" v-on:click="resume()" v-show="started && paused"> RESUME </button>
      <button class="btn" v-on:click="reset()" v-show="started"> RESET </button>
    </div>

  </div>
</template>

<script>
export default {
  name: "set-timer",
  data() {
    return {
      // set timer
      hour: 0,
      minute: 25,
      // timer countdown
      started: false, // to change start -> pause and reset
      paused: false, // to change pause -> resume
      totalDuration: 0,
      timerInterval: null,
      // message
      message: "All the best!",
      // sound
      sound: new Audio(require('../assets/mixkit-magic-notification-ring-2344.wav')),
    }
  },

  filters: {
    leadingZero: function(number) {
      if (number < 10) {
        return '0' + number;
      } else {
        return number;
      }
    },
  },

  methods: {
    increment: function() {
      if (this.minute != 55) {
        this.minute += 5;
      } else if (this.minute === 55) {
        // new hour
        this.hour += 1;
        this.minute = 0;
      }
    },
    decrement: function() {
      if (this.minute != 0) {
        this.minute -= 5;
      } else if (this.hour >= 1) {
        // new hour
        this.hour -= 1;
        this.minute = 55;
      }
    },
    computeTotalDuration: function() {
      return this.hour * 3600 + this.minute * 60;
    },
    // buttons to control the Timer
    start: function() {
      this.message = "Let's go!";
      this.started = true; // to change start -> pause and reset
      this.totalDuration = this.computeTotalDuration();
      this.resume();
    },
    pause: function() {
      this.message = "You can do it!";
      clearInterval(this.timerInterval);
      this.paused = true; // to change pause -> resume
    },
    resume: function() {
      this.message = "Let's go!";
      this.paused = false; // to change resume -> pause
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        if (this.totalDuration > 0) {
          this.totalDuration -= 1;
        } else {
          clearInterval(this.timerInterval);
          this.sound.play();
          this.reset();
        }
      }, 1000)
    },
    reset: function() {
      this.message = "All the best!";
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.started = false; // to change pause and reset -> start
      this.paused = false; // go back to default
      this.totalDuration = this.computeTotalDuration();
    },
  },

  computed: {
    countdownHour: function() {
      let hours = this.totalDuration / 3600;
      return Math.floor(hours);
    },
    countdownMinute: function() {
      let hours = Math.floor(this.totalDuration / 3600);
      let minutes = Math.floor((this.totalDuration - (hours * 3600)) / 60);
      return minutes;
    },
    countdownSecond: function() {
      let hours = Math.floor(this.totalDuration / 3600);
      let minutes = Math.floor((this.totalDuration - (hours * 3600)) / 60);
      let seconds = this.totalDuration - (hours * 3600) - (minutes * 60);
      return seconds;
    }
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Orbitron);
@import url(https://fonts.googleapis.com/css?family=Lato);
@import url(https://fonts.googleapis.com/css?family=Oswald);
@import url(https://fonts.googleapis.com/css?family=Nunito);

.overall {
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: manipulation;
  background: transparent;
}

/** laptop CSS */
.laptop {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 245px;
}

/** laptop CSS - cover + screen + digitalNum */
.laptop-cover {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 80vw;
  border-radius: 15px;
  /**-webkit-box-reflect: below 5px linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));*/
  background: linear-gradient(315deg, #181819, #141415);
  box-shadow: -2px -2px 3px #0d0d0d,
              2px 2px 3px #1f1f21;
}

.laptop-screen {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 95%;
  background: #202026;
  text-align: center;
}

.digitalNum {
  margin: 10px;
  /** font-family: 'Orbitron', sans-serif; */
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  color: #CDD0D7;
  background: transparent;
}

/** laptop CSS - base + notch */
.laptop-base {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 8%;
  width: 85vw;
  border-radius: 0 0 50px 50px;
  z-index: 10;
  background: linear-gradient(315deg, #181819, #141415);
  box-shadow: inset -2px -2px 3px #0d0d0d,
              inset 2px 2px 3px #1f1f21;
}

.laptop-notch {
  height: 50%;
  width: 20%;
  background: #272729;
  border-radius: 0 0 20px 20px;
}

/** message CSS */
.message {
  height: 60px;
  width: 100%;
  text-align: center;
  font-family: "Nunito";
  color: #f6f5f7;
  margin-top: 20px;
}

/** setTimer CSS */
.setTimer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 85vw;
  border-radius: 40px;
  font-family: 'Lato', sans-serif;
  background: #161617;
  box-shadow: -2px -2px 3px #0d0d0d,
              2px 2px 3px #1f1f21;
}

.setTimerText {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  font-size: 16px;
  color: #f6f5f7;
}

.setTimerBtn {
  margin: 10px;
  padding: 15px;
  font-size: 20px;
  border: none;
  background: Transparent;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  color: #d8d8e3;
}

.setTimerBtn:active, .btn:active {
  transform: translateY(2px);
}

/** buttons CSS */
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 85vw;
  margin-top: 25px;
}

.btn {
  height: 45px;
  width: 25%;
  margin: 2px;
  font-size: 14px;
  font-family: 'Nunito';
  border: none;
  border-radius: 50px;
  cursor: pointer;
  color: #f6f5f7;
  background: #161617;
  box-shadow: inset -4px -4px 3px #0d0d0d,
              inset 4px 4px 3px #1f1f21;
}

/** screen size above 768px */
@media only screen and (min-width: 768px) {
  .laptop-cover {
    width: 400px;
  }

  .laptop-base {
    width: 420px;
  }

  .setTimer {
    width: 400px;
  }

  .buttons {
    width: 400px;
  }
}
</style>