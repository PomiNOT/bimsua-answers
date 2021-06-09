<template>
    <div 
        class="
            rounded-lg divide-x divide-gray-300 focus-within:divide-white
            flex items-center
            bg-gray-200 p-3 edit-card
        "
        tabindex="0"
    >
        <div class="text-center pr-3">
            <h2 class="text-gray-500 text-sm">Question</h2>
            <h1 class="font-bold text-blue-800 text-2xl">{{ question }}</h1>
        </div>
        <div class="pl-3 flex-1 flex justify-center space-x-2">
            <edit-card-button
                @updateAnswer="updateAnswer"
                @updateRightAnswer="updateRightAnswer"
                choice="A"
                :currentChoice="answer"
                :rightChoice="rightAnswer"
            />
            <edit-card-button
                @updateAnswer="updateAnswer"
                @updateRightAnswer="updateRightAnswer"
                choice="B"
                :currentChoice="answer"
                :rightChoice="rightAnswer"
            />
            <edit-card-button
                @updateAnswer="updateAnswer"
                @updateRightAnswer="updateRightAnswer"
                choice="C"
                :currentChoice="answer"
                :rightChoice="rightAnswer"
            />
            <edit-card-button
                @updateAnswer="updateAnswer"
                @updateRightAnswer="updateRightAnswer"
                choice="D"
                :currentChoice="answer"
                :rightChoice="rightAnswer"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditCardButton from '@/components/EditCardButton.vue';

export default defineComponent({
    name: 'EditCard',
    emits: ['update:answer', 'update:rightAnswer'],
    components: { EditCardButton },
    props: {
        question: {
            type: Number,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        rightAnswer: {
            type: String,
            required: false
        }
    },
    methods: {
        updateAnswer(answer: string) {
            this.$emit('update:answer', {
                question: this.question,
                answer
            });
        },
        updateRightAnswer(answer: string) {
            this.$emit('update:rightAnswer', {
                question: this.question,
                answer
            });
        }
    }
});
</script>

<style scoped>
.edit-card:focus-within, .edit-card:focus {
    @apply ring-2 ring-blue-400 outline-none;
}
</style>
