<template>
    <div 
        class="
            rounded-lg divide-x divide-gray-300 hover:divide-white flex items-center
            h-20 bg-gray-200 group hover:bg-blue-600
            p-3
        "
    >
        <div class="text-center pr-3">
            <h2 class="text-gray-500 group-hover:text-gray-300 text-sm">Question</h2>
            <h1 class="font-bold text-blue-800 group-hover:text-white text-2xl">{{ question }}</h1>
        </div>
        <div class="pl-3 flex-1 flex justify-center space-x-2">
            <div class="w-10 h-10 group-hover:text-white font-bold cursor-pointer grid place-items-center rounded-full border-2 border-gray-400 group-hover:border-white">A</div>
            <div class="w-10 h-10 group-hover:text-white font-bold cursor-pointer grid place-items-center rounded-full border-2 border-gray-400 group-hover:border-white">B</div>
            <div class="w-10 h-10 group-hover:text-white font-bold cursor-pointer grid place-items-center rounded-full border-2 border-gray-400 group-hover:border-white">C</div>
            <div class="w-10 h-10 group-hover:text-white font-bold cursor-pointer grid place-items-center rounded-full border-2 border-gray-400 group-hover:border-white">D</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'EditCard',
    props: {
        question: {
            type: Number,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }
});
</script>
