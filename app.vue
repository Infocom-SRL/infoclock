<script setup lang="ts">
const now = useNow();
const dayjs = useDayjs();

// Messages
const {data: messages} = await useFetch<Messages>("https://gist.githubusercontent.com/Keiishu/27df0f09c05a87552b5c557d9da0b37a/raw", {
  mode: "cors",
  lazy: true,
  responseType: "json",
});

function getCurrentMessage() {
  if (!messages.value || !messages.value.messages) return defaultMessage;
  return messages.value?.messages.find((message) => {
    return dayjs().isBetween(dayjs(message.start, "hh:mm"), dayjs(message.end, "hh:mm")) && message.days.includes(dayjs().isoWeekday());
  });
}

const currentMessage = ref<Message | undefined>(getCurrentMessage());

useIntervalFn(() => {
  currentMessage.value = getCurrentMessage();
}, 1000 * 60 * 5);
</script>

<template>
  <div>
    <NuxtRouteAnnouncer/>
    <div class="h-full relative">
      <!-- Logo -->
      <div class="absolute top-4 left-4">
        <NuxtImg src="/logo.jpg" sizes="100px md:150px xl:200px 2xl:250px" alt="Infocom Logo"/>
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
