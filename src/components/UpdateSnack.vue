<template>
  <teleport to="body">
    <div
      class="
        fixed flex items-center w-full md:w-96 bg-blue-800 p-2 bottom-0 left-0
        md:left-1/2 transform md:-translate-x-1/2 md:rounded-lg md:px-3
        transition-transform duration-300 z-50
      "
      :class="visible ? 'translate-y-0 md:-translate-y-3' : 'translate-y-full'"
    >
      <span>🎉</span>
      <span class="ml-2 flex-1 font-bold text-white">
        {{ status == 0 ? 'Update installed' : 'You are up to date!' }}
      </span>
      <button
        type="button"
        class="btn btn-white btn-small"
        @click="$emit('restart')"
        v-if="status == 0"
      > <!-- UpdateSnackStatus.STATUS_NEW_UPDATE -->
        Restart
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export enum UpdateSnackStatus {
  STATUS_NEW_UPDATE,
  STATUS_UP_TO_DATE
}

export default defineComponent({
  name: 'UpdateSnack',
  emits: ['restart'],
  props: {
    status: {
      type: Number as PropType<UpdateSnackStatus>,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  }
});
</script>