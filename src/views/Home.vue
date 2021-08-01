<template>
  <div class="home" :class="setBackgroundColor">
      <div class="timer-steps">
        <PomodoroTabs :step="step"/>
      </div>
      <div>
        <Timer ref="timerComponent" :initialTimer="initialTimer" :isPlaying="isPlaying" class="test" @endCountdown="nextStep"/>
      </div>
      <div class="rounds">
        Rounds {{ longBreakDelay +1 }} / 4
      </div>
      <div class="actions">
        <p v-if="!start" @click="startTimer" title="Launch Timer"><i class="fas fa-play"></i></p>
        <p v-if="start" @click="pauseTimer" title="Pause Timer"><i class="fas fa-pause"></i></p>
        <p @click="resetTimer" title="Reset Timer"><i class="fas fa-undo"></i></p>
      </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue'
import PomodoroTabs from '@/components/PomodoroTabs.vue'
import TimerEnums from '@/enums/timer'

export default {
  name: 'Home',
  components: {Timer, PomodoroTabs},
  data() {
    return {
      start: false,
      step: 0,
      longBreakDelay: 0,
      initialTimer: null,
      isPlaying: false,
    }
  },
  created() {
    this.setActualTimer(TimerEnums.POMODOROTIME)
  },
  computed: {
    setBackgroundColor() {
      return {
        'home-pomodoro': this.step === 0,
        'home-shortbreak': this.step === 1,
        'home-longbreak': this.step === 2,
      }
    }
  },
  methods: {
    nextStep() {
      if(this.step === 1) {
        this.step = 0
        this.longBreakDelay++
      } else if (this.step === 2){
        this.step = 0
        this.longBreakDelay = 0
      } else if (this.longBreakDelay < 3 && this.step < 1){
        this.step++;
      } else {
        this.step = 2;
      }
      switch (this.step) {
        default:
        case 0:
          this.setActualTimer(TimerEnums.POMODOROTIME)
          break;
        case 1:
          this.setActualTimer(TimerEnums.SHORTBREAKTIME)
          break; 
        case 2:
          this.setActualTimer(TimerEnums.LONGBREAKTIME)
          break;
      }
    },
    pauseTimer() {
      this.isPlaying = false;
      this.start = false;
    },
    resetTimer() {
      this.start = false;
      this.isPlaying = false;
      this.longBreakDelay = 0;
      this.step = 0;
      this.setActualTimer(TimerEnums.POMODOROTIME)
    },
    setActualTimer(timer) {
      if(this.initialTimer === timer && this.isPlaying) {
        this.$refs.timerComponent.setInitialTimer(timer)
        this.$refs.timerComponent.startTimer()
      } else if (this.initialTimer === timer) {
         this.$refs.timerComponent.setInitialTimer(timer)
      }
      this.initialTimer = timer;
    },
    startTimer() {
      this.start = true;
      this.isPlaying = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  text-align: center;

  &.home-pomodoro {
    background-color: rgb(255,99,71);
  }
  &.home-shortbreak {
    background-color: rgb(6, 173, 48);
  }
  &.home-longbreak {
    background-color: rgb(109, 129, 194);
  }

  .timer-steps {
    padding: 2em;
  }

  .rounds {
    font-size: 24px;
  }
}

.actions {
  text-align: center;

  p {
    display: inline-block;
    font-size: 3em;
    margin: 50px;
    cursor: pointer;
  }
}

.container button {
  display: flex;
  font-size: 30px;
}

.test {
  margin: auto;
  font-size: 46px;
}
</style>
