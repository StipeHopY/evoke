export type RouteName = "home" | "chat" | "create" | "goals" | "options";
export type UsernameType = {
  username: string | undefined;
};
export type Theme = {
  colors: {
    active: string;
    background: string;
    border: string;
    buttonBgColor: string;
    buttonTextColor: string;
    disabled: string;
    inactive: string;
    main: string;
    selected: string;
    text: string;
  };
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export type ReminderType = {
  type: "notification" | "alarm" | "none";
  reminderOffset:
    | "None"
    | "At start time"
    | "5 minutes before start"
    | "15 minutes before start";
};

export type DateStateType = {
  time: string | null;
  date: string | null;
};
