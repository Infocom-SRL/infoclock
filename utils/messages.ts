export const defaultMessage: Message = {
  text: "Bienvenue !",
  start: "00:00",
  end: "23:59",
  days: [0, 1, 2, 3, 4, 5, 6],
};

export interface Message {
  text: string;
  start: string;  // Format: "HH:MM"
  end: string;    // Format: "HH:MM"
  days: number[]; // 1 = Lundi, 2 = Mardi, ..., 7 = Dimanche
}

export interface Messages {
  messages: Message[];
}
