<script setup lang="ts">
const now = useNow();

// Messages
const {currentMessage} = useMessages();
</script>

<template>
  <div>
    <NuxtRouteAnnouncer/>
    <div class="h-full relative">
      <!-- Logo -->
      <div class="absolute top-4 left-4">
        <SvgLogo class="w-24 md:w-36 xl:w-48 2xl:w-60" alt="Infocom Logo"/>
      </div>
      <!-- Clock -->
      <div class="flex items-center justify-center h-full relative">
        <div class="flex flex-col gap-4 items-center justify-center">
          <NuxtTime :datetime="now" date-style="full" locale="fr"
                    class="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"/>
          <NuxtTime :datetime="now" second="2-digit" minute="2-digit" hour="2-digit" locale="fr"
                    class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"/>
        </div>

        <!-- Jokes -->
        <div class="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl max-w-2xl text-center
                                  break-words text-gray-800 absolute bottom-24">
          {{ currentMessage?.text }}
        </div>
      </div>
    </div>
  </div>
</template>
