<template>
  <div>
    {{ timer }}
  </div>
</template>

<script>
import { Howl } from "howler";
import moment from "moment";

export default {
  props: {
    initialTimer: String,
    isPlaying: Boolean,
    volume: Boolean
  },
  data() {
    return {
      timer: this.initialTimer,
      timerInterval: null,
    };
  },
  watch: {
    initialTimer(value) {
      this.setInitialTimer(value);
      if (this.isPlaying) {
        this.stopTimer();
        this.startTimer();
      }
    },
    isPlaying(playing) {
      if (playing) {
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    },
    timer(value, oldValue) {
      if (oldValue === "00:01" && value === "00:00") {
        setTimeout(() => {
          this.stopTimer();
          if(this.volume) {
            this.playSound();
          }
          this.$emit("end-countdown");
        }, 1000);
      }
    },
  },
  methods: {
    playSound() {
      const sound = new Howl({
        src: ["endtimer.mp3"],
      });
      sound.play();
    },
    setInitialTimer(timer) {
      this.timer = timer;
    },
    startTimer() {
      const INTERVAL_TIME = 1000;
      this.timerInterval = setInterval(() => {
        this.subtractOneSecond();
      }, INTERVAL_TIME);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
    },
    subtractOneSecond() {
      if (this.timer !== "00:00") {
        const new_timer = moment(this.timer, "mm:ss")
          .subtract(1, "seconds")
          .format("mm:ss");
        this.setInitialTimer(new_timer);
      }
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
    },
  },
};
</script>

<style lang="scss" scoped>
.pause {
  cursor: pointer;
}
</style>