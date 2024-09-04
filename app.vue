<script setup lang="ts">
// Meta
import { getCurrentJoke } from "~/utils/jokes";

useHead({
  title: "Infoclock",
  meta: [
    {name: "description", content: "Infocom Clock"},
  ],
});

// Clock
const timeElRef = ref<HTMLDivElement | null>(null);
const dateElRef = ref<HTMLDivElement | null>(null);

const updateTime = () => {
  const now = new Date();
  timeElRef.value!.textContent = now.toLocaleTimeString("fr", localeTimeSettings);
  dateElRef.value!.textContent = now.toLocaleDateString("fr", localeDateSettings);
};

// Jokes
const {data: jokes} = await useFetch<Messages>("https://gist.githubusercontent.com/Keiishu/27df0f09c05a87552b5c557d9da0b37a/raw", {
  mode: "cors",
  transform: (data: string) => JSON.parse(data),
});

const jokeElRef = ref<HTMLDivElement | null>(null);

const updateJokes = () => {
  const now = new Date();
  const joke: Message = getCurrentJoke(now, jokes.value);
  jokeElRef.value!.textContent = joke.text;
};

// Init
onMounted(() => {
  updateTime();
  updateJokes();
  setInterval(updateTime, 1000);
  setInterval(updateJokes, 1000 * 60 * 5);
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtLoadingIndicator/>
    <div class="h-full relative">
      <!-- Logo -->
      <div class="absolute top-4 left-4">
        <NuxtImg src="/logo.jpg" sizes="100px md:150px xl:200px 2xl:250px" alt="Infocom Logo"/>
      </div>
      <!-- Clock -->
      <div class="flex items-center justify-center h-full relative">
        <div class="flex flex-col gap-4 items-center justify-center">
          <div ref="dateElRef" class="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"/>
          <div ref="timeElRef" class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"/>
        </div>

        <!-- Jokes -->
        <div ref="jokeElRef" class="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl max-w-2xl text-center
                                  break-words text-gray-800 absolute bottom-24"/>
      </div>
    </div>
  </div>
</template>
