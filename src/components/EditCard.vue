<template>
    <div 
        class="
            rounded-lg divide-x divide-gray-300 focus-within:divide-white
            flex items-center
            h-20 bg-gray-200
            p-3 edit-card
        "
        tabindex="0"
    >
        <div class="text-center pr-3">
            <h2 class="text-gray-500 text-sm">Question</h2>
            <h1 class="font-bold text-blue-800 text-2xl">{{ question }}</h1>
        </div>
        <div class="pl-3 flex-1 flex justify-center space-x-2">
            <button type="button" @click="update('A')" class="choice-button" :class="{ 'selected': answer == 'A' }">
                <span>A</span>
            </button>
            <button type="button" @click="update('B')" class="choice-button" :class="{ 'selected': answer == 'B' }">
                <span>B</span>
            </button>
            <button type="button" @click="update('C')" class="choice-button" :class="{ 'selected': answer == 'C' }">
                <span>C</span>
            </button>
            <button type="button" @click="update('D')" class="choice-button" :class="{ 'selected': answer == 'D' }">
                <span>D</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'EditCard',
    emits: ['update:answer'],
    props: {
        question: {
            type: Number,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    },
    methods: {
        update(newAnswer: string) {
            this.$emit('update:answer', newAnswer);
        }
    }
});
</script>

<style scoped>
.edit-card:focus-within, .edit-card:focus {
    @apply ring-2 ring-blue-400 outline-none;
}

.choice-button {
    @apply w-10 h-10 font-bold cursor-pointer grid;
    @apply place-items-center rounded-full border-2 border-gray-400 outline-none;
}

.choice-button:focus {
    @apply bg-green-400 text-white transform animate-pulse;
}

.selected {
    @apply text-white relative;
}

.selected::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: 50%;
    @apply bg-green-500;
    animation: scale 800ms cubic-bezier(0.16, 1, 0.3, 1);
}

.selected span {
    z-index: 2;
}

@keyframes scale {
    from {
        transform: scale(1.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
