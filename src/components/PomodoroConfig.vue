<template>
    <div class="config-form">
        <h1>Settings</h1>
        <div class="field">
            <div>
                <span>Rounds : </span>
            </div>
            <input type="number" min="1" step="1" width="70" v-model="config.rounds">
            <p class="error" v-if="errors.rounds">Oops: Rounds must be a number</p>
        </div>
        <div class="field">
            <div>
                <span>Pomodoro : </span>
            </div>
            <input type="text" v-mask="'##:##'" v-model="config.pomodoro">
            <p class="error" v-if="errors.pomodoro">Oops: Accepted Format ##:##</p>
        </div>
        <div class="field">
            <div>
                <span>Short break : </span>
            </div>
            <input type="text"  v-mask="'##:##'" v-model="config.shortBreak">
            <p class="error" v-if="errors.shortBreak">Oops: Accepted Format ##:##</p>
        </div>
        <div class="field">
            <div>
                <span>Long break : </span>
            </div>
            <input type="text"  v-mask="'##:##'" v-model="config.longBreak">
            <p class="error" v-if="errors.longBreak">Oops: Accepted Format ##:##</p>
        </div>
        <div class="submit">
            <button @click="persistConfig">Submit</button>
        </div>
    </div>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
    directives: {mask},
    props: {
        roundsNumber: {
            type: Number,
            required: true
        },
        pomodoroTime: {
            type: String,
            required: true
        },
        shortbreakTime: {
            type: String,
            required: true
        },
        longbreakTime: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            config: {
                pomodoro:this.pomodoroTime,
                shortBreak: this.shortbreakTime,
                longBreak: this.longbreakTime,
                rounds: Number(this.roundsNumber)
            },
            errors: {}
        }
    },
    methods: {
        closeModal(){
            return this.$emit('close-modal')
        },
        persistConfig() {
            this.errors = {}
            this.validateData()
            if(Object.keys(this.errors).length === 0) {
                this.$emit('persist', this.config)
                this.closeModal()
            }
        },
        validateData() {
            if(!this.config.rounds) {
                this.errors.rounds = true
            } else {
                this.config.rounds = Math.trunc(this.config.rounds)
            }
            if(this.config.pomodoro.length !== 5) {
                this.errors.pomodoro = true
            }
            if(this.config.shortBreak.length !== 5) {
                this.errors.shortBreak = true
            }
            if(this.config.longBreak.length !== 5) {
                this.errors.longBreak = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.config-form {
    color: #000;
    h1 {
        font-size: 26px;
        font-weight: 900;
        margin-bottom: 15px;
    }

    .field {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        align-items: center;
        margin:5px;

        input {
            border-radius: 4px;
            background-color: rgb(239, 239, 239);
            font-size: 16px;
            padding: 10px;
            border: medium none;
            color: rgb(85, 85, 85);
            width: 70px;
        }

        .line-break {
            width: 100%;
        }
        .error {
            display: block;
            font-style: italic;
            color: red;
            margin-top: -15px;
            font-size: 14px;
        }
    }

    .submit {
        text-align: center;

        button {
            padding: 5px;
            cursor: pointer;
            width: 100px;
            font-size: 1em;
        }
    }
}
</style>