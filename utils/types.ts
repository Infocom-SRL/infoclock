export interface Message {
  text: string;
  start: string;  // Format: "HH:MM"
  end: string;    // Format: "HH:MM"
  days: number[]; // 1 = Lundi, 2 = Mardi, ..., 7 = Dimanche
}

export interface Messages {
  messages: Message[];
}
