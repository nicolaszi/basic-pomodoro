<template>
  <div class="home" :class="setBackgroundColor">
    <div class="container">
      <img class="logo" alt="logo" src="../assets/img/logo.png" />
      <div class="menubar">
        <p
          class="config"
          v-if="!isPlaying"
          @click="openConfig = true"
          title="Configuration panel"
        >
          <i class="fas fa-cog"></i>
        </p>
        <p
          class="config"
          v-if="!volume"
          @click="setVolume"
          title="Activate sound"
        >
          <i class="fas fa-volume-mute"></i>
        </p>
        <p class="config" v-else @click="setVolume" title="Deactivate sound">
          <i class="fas fa-volume-up"></i>
        </p>
      </div>
      <div class="timer-steps">
        <PomodoroTabs :step="step" />
      </div>
      <Timer
        class="timer-container"
        ref="timerComponent"
        :initialTimer="initialTimer"
        :isPlaying="isPlaying"
        :volume="volume"
        @endCountdown="nextStep"
      />
      <div class="rounds">Rounds {{ longBreakDelay + 1 }} / {{ rounds }}</div>
      <div class="actions">
        <p v-if="!isPlaying" @click="startTimer" title="Launch Timer">
          <i class="fas fa-play"></i>
        </p>
        <p v-if="isPlaying" @click="pauseTimer" title="Pause Timer">
          <i class="fas fa-pause"></i>
        </p>
        <p @click="resetTimer" title="Reset Timer">
          <i class="fas fa-undo"></i>
        </p>
      </div>
    </div>
    <footer>
        Made by N. Zilbermann <a target="_blank" href="https://github.com/nicolaszi/basic-pomodoro"><img alt="github link" src="../assets/img/github32.png"/></a>
    </footer>
  </div>
  <transition name="fade" appear>
    <div
      class="modal-overlay"
      v-if="openConfig"
      @click.prevent="openConfig = false"
    ></div>
  </transition>
  <transition name="slide" appear>
    <div class="modal" v-if="openConfig">
      <PomodoroConfig
        @closeModal="openConfig = false"
        @persist="setConfig"
        :roundsNumber="rounds"
        :pomodoroTime="pomodoro"
        :shortbreakTime="shortbreak"
        :longbreakTime="longbreak"
      />
    </div>
  </transition>
</template>

<script>
import Timer from "@/components/Timer.vue";
import PomodoroConfig from "@/components/PomodoroConfig.vue";
import PomodoroTabs from "@/components/PomodoroTabs.vue";
import TimerEnums from "@/enums/timer";

export default {
  name: "Home",
  components: { Timer, PomodoroTabs, PomodoroConfig },
  data() {
    return {
      openConfig: false,
      start: false,
      step: 0,
      longBreakDelay: 0,
      rounds: TimerEnums.ROUNDS,
      pomodoro: this.setActualTimer(TimerEnums.POMODOROTIME),
      shortbreak: TimerEnums.SHORTBREAKTIME,
      longbreak: TimerEnums.LONGBREAKTIME,
      initialTimer: null,
      isPlaying: false,
      volume: true,
    };
  },
  created() {
    if (localStorage.rounds) {
      this.rounds = Number(localStorage.rounds);
    }
    if (localStorage.pomodoro) {
      this.pomodoro = localStorage.pomodoro;
      this.setActualTimer(localStorage.pomodoro);
    } else {
      this.setActualTimer(TimerEnums.POMODOROTIME);
    }
    if (localStorage.shortbreak) {
      this.shortbreak = localStorage.shortbreak;
    }
    if (localStorage.longbreak) {
      this.longbreak = localStorage.longbreak;
    }
    if (localStorage.volume) {
      this.volume = JSON.parse(localStorage.volume);
    }
  },
  computed: {
    setBackgroundColor() {
      return {
        "home-pomodoro": this.step === 0,
        "home-shortbreak": this.step === 1,
        "home-longbreak": this.step === 2,
      };
    },
  },
  methods: {
    nextStep() {
      if (this.step === 1) {
        this.step = 0;
        this.longBreakDelay++;
      } else if (this.step === 2) {
        this.step = 0;
        this.longBreakDelay = 0;
      } else if (this.longBreakDelay < this.rounds - 1 && this.step < 1) {
        this.step++;
      } else {
        this.step = 2;
      }
      switch (this.step) {
        default:
        case 0:
          this.setActualTimer(this.pomodoro);
          break;
        case 1:
          this.setActualTimer(this.shortbreak);
          break;
        case 2:
          this.setActualTimer(this.longbreak);
          break;
      }
    },
    pauseTimer() {
      this.isPlaying = false;
    },
    resetTimer() {
      this.start = false;
      this.isPlaying = false;
      this.longBreakDelay = 0;
      this.step = 0;
      this.setActualTimer(this.pomodoro);
    },
    setActualTimer(timer) {
      if (this.initialTimer === timer && this.isPlaying) {
        this.$refs.timerComponent.setInitialTimer(timer);
        this.$refs.timerComponent.startTimer();
      } else if (this.initialTimer === timer) {
        this.$refs.timerComponent.setInitialTimer(timer);
      }
      this.initialTimer = timer;
    },
    setConfig(data) {
      localStorage.rounds = data.rounds;
      this.rounds = data.rounds;

      localStorage.pomodoro = data.pomodoro;
      this.pomodoro = data.pomodoro;
      this.setActualTimer(this.pomodoro);

      localStorage.shortbreak = data.shortBreak;
      this.shortbreak = data.shortBreak;

      localStorage.longbreak = data.longBreak;
      this.longbreak = data.longBreak;

      if (this.start) {
        this.resetTimer();
      }
    },
    setVolume() {
      this.volume = !this.volume;
      localStorage.volume = this.volume;
    },
    startTimer() {
      this.start = true;
      this.isPlaying = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  text-align: center;
  color: hsl(0, 0%, 100%);

  &.home-pomodoro {
    background-color: rgb(255, 99, 71);
  }
  &.home-shortbreak {
    background-color: rgb(114, 140, 219);
  }
  &.home-longbreak {
    background-color: rgba(59, 170, 19, 0.85);
  }

  .container {
    max-width: 460px;
    margin: auto;

    .logo {
      width: 58px;
      position: relative;
      top: 10px;
      left: -4em;
    }
    .menubar {
      display: flex;
      float: right;

      .config {
        cursor: pointer;
        text-align: right;
        margin-right: 2em;
        padding-top: 1em;
        font-size: 24px;
      }
    }

    .timer-container {
      font-size: 4em;
    }
    .timer-steps {
      padding: 2em;
    }

    .rounds {
      font-size: 24px;
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
  }
}

</style>
