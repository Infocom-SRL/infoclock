export const getCurrentJoke = (date: Date, jokes: Messages): Message => {
  const messages = jokes.messages;

  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  const day = (date.getDay() === 0) ? 7 : date.getDay();  // 1-7

  return messages.find((message) => {
    //console.log(message);
    const startMinutes = convertTimeToMinutes(message.start);
    //console.log(startMinutes);
    const endMinutes = convertTimeToMinutes(message.end);
    //console.log(endMinutes);
    const days = message.days;
    //console.log(days);

    const isDay = days.includes(day);
    //console.log(isDay);
    const isTime = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    //console.log(isTime);

    //console.log("\n");
    return isDay && isTime;
  });
}

const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
