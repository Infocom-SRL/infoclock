<script setup lang="ts">
// Meta
useHead({
  title: 'Infoclock',
  meta: [
    { name: 'description', content: 'Infocom Clock' }
  ]
});

// Clock
const timeElRef = ref<HTMLDivElement | null>(null);
const dateElRef = ref<HTMLDivElement | null>(null);

const localeDateSettings: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',

  timeZone: 'Europe/Brussels',
};
const localeTimeSettings: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',

  timeZone: 'Europe/Brussels',
};

const updateTime = () => {
  const now = new Date();
  timeElRef.value!.textContent = now.toLocaleTimeString('fr', localeTimeSettings);
  dateElRef.value!.textContent = now.toLocaleDateString('fr', localeDateSettings);
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

</script>

<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtLoadingIndicator/>
    <div class="h-full *:h-full relative">
      <div class="flex flex-col gap-16 items-center justify-center">
        <NuxtImg src="/logo.jpg" sizes="100px md:150px xl:200px 2xl:250px" alt="Infocom Logo" class="absolute top-4 left-4"/>
        <div class="flex flex-col gap-4 items-center justify-center">
          <div id="date" ref="dateElRef" class="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"/>
          <div id="time" ref="timeElRef" class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"/>
        </div>
      </div>
    </div>
  </div>
</template>
