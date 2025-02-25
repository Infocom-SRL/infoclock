<script setup lang="ts">
import { SparklesIcon } from "lucide-vue-next";

const now = useNow();

// Messages
const {currentMessage} = useMessages();

const particlesEnabled = ref(true);
</script>

<template>
  <NuxtRouteAnnouncer/>

  <!--    <SmoothGradient/>-->
  <Transition name="fade" mode="out-in">
    <StarCanvas v-if="particlesEnabled"/>
  </Transition>

  <div class="h-full">
    <!-- Logo -->
    <SvgLogo class="absolute top-4 left-4 bg-white w-24 md:w-36 xl:w-48 2xl:w-60" alt="Infocom Logo"
             :fontControlled="false"/>

    <!-- Settings -->
    <button @click="particlesEnabled = !particlesEnabled"
            class="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg z-10
                   opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <SparklesIcon class="size-6"/>
    </button>

    <!-- Clock -->
    <div class="flex items-center justify-center h-full relative">
      <div class="flex flex-col gap-4 items-center justify-center">
        <NuxtTime :datetime="now" date-style="full" locale="fr"
                  class="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"/>
        <NuxtTime :datetime="now" second="2-digit" minute="2-digit" hour="2-digit" locale="fr"
                  class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"/>
      </div>

      <!-- Messages -->
      <div class="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl max-w-2xl text-center
                                  break-words text-gray-800 absolute bottom-24">
        {{ currentMessage?.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
