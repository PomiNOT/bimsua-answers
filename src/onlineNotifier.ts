import { ref } from 'vue';

let online = ref(navigator.onLine);

window.addEventListener('online', () => online.value = true);
window.addEventListener('offline', () => online.value = false);

export default online;