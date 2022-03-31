<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/outline";

const colorMode = useColorMode();
const lightMode = ref(false);

onMounted(() => {
  lightMode.value = colorMode.value === "light";
});

function toggleTheme() {
  lightMode.value =
    (colorMode.value === "light" ? "dark" : "light") === "light";
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
  <button
    class="active:scale-100 hover:scale-125 transition"
    title="Toggle theme"
    @click="toggleTheme"
  >
    <SunIcon
      ref="sunIcon"
      aria-hidden="true"
      class="h-7 lg:h-8 w-7 lg:w-8 text-stone-900 active:text-slate-600 hover:motion-safe:animate-spin"
      :class="[lightMode ? '' : 'hidden']"
    />
    <MoonIcon
      ref="moonIcon"
      aria-hidden="true"
      class="h-7 lg:h-8 w-7 lg:w-8 text-slate-100 active:text-slate-400 hover:motion-safe:animate-pulse"
      :class="[lightMode ? 'hidden' : '']"
    />
  </button>
</template>
