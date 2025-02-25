export interface Message {
  text: string;
  start: string;  // Format: "HH:MM"
  end: string;    // Format: "HH:MM"
  days: number[]; // 1 = Lundi, 2 = Mardi, ..., 7 = Dimanche
}

export interface Messages {
  messages: Message[];
}

export const useMessages = () => {
  const dayjs = useDayjs();
  const messages = ref<Messages | null>(null);
  const currentMessage = ref<Message | undefined>();

  const fetchMessages = async () => {
    messages.value = await $fetch<Messages>(
      "https://gist.githubusercontent.com/Keiishu/27df0f09c05a87552b5c557d9da0b37a/raw",
      {
        mode: "cors",
        responseType: "json",
      },
    );
  };

  const getCurrentMessage = () => {
    if (!messages.value?.messages) return defaultMessage;
    return messages.value.messages.find((message) => {
      return dayjs().isBetween(
        dayjs(message.start, "hh:mm"),
        dayjs(message.end, "hh:mm"),
      ) && message.days.includes(dayjs().isoWeekday());
    });
  };

  const updateCurrentMessage = () => {
    currentMessage.value = getCurrentMessage();
  };

  // Initial fetch
  onMounted(async () => {
    await fetchMessages();
    updateCurrentMessage();

    useIntervalFn(() => {
      updateCurrentMessage();
    }, 1000 * 60 * 5);
  });

  return {
    currentMessage: readonly(currentMessage),
    messages: readonly(messages),
  };
};
