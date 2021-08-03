<template>
    <div class="config-form">
        <h1>Settings</h1>
        <div class="field">
            <div>
                <span>Rounds : </span>
            </div>
            <input type="number" min="1" step="1" width="70" v-model="config.rounds">
        </div>
        <div class="field">
            <div>
                <span>Pomodoro : </span>
            </div>
            <input type="text" v-mask="'##:##'" v-model="config.pomodoro">
        </div>
        <div class="field">
            <div>
                <span>Short break : </span>
            </div>
            <input type="text"  v-mask="'##:##'" v-model="config.shortBreak">
        </div>
        <div class="field">
            <div>
                <span>Long break : </span>
            </div>
            <input type="text"  v-mask="'##:##'" v-model="config.longBreak">
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
                rounds: this.roundsNumber
            }
        }
    },
    // computed: {
    //     pomodoro: {
    //         get () {
    //             return this.pomodoroTime     
    //         },
    //         set (val) {
    //             if(val.length == 2) {
    //                 this.pomodoroTime = val + ':'
    //             } else if (val.length < 6) {
    //                 this.pomodoroTime = val
    //             } else {
    //                 console.log(val)
    //                 const new_val = val.slice(0, -1)
    //                 console.log(new_val)
    //                 this.pomodoroTime = new_val
    //             }
    //         }
    //     },
    //     rounds: {
    //         get() {
    //             return this.roundsNumber
    //         },
    //         set (val){
    //             if(val) {
    //                 this.roundsNumber = val
    //             } else {
    //                 return this.roundsNumber
    //             }
    //         }
    //     }
    // },
    methods: {
        closeModal(){
            return this.$emit('close-modal')
        },
        persistConfig() {
            this.$emit('persist', this.config)
            this.closeModal()
        },
    },
    beforeUnmount() {
        console.log('here');
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