// TODO: create sepreted files for these types

export type RouteName = "home" | "chat" | "create" | "goals" | "options";

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
  type: "Notification" | "Alarm" | "None";
  reminderOffset:
    | "None"
    | "At start time"
    | "5 minutes before start"
    | "15 minutes before start";
};

export type DayLabelType =
  | "Every Monday"
  | "Every Tuesday"
  | "Every Wednesday"
  | "Every Thursday"
  | "Every Friday"
  | "Every Saturday"
  | "Every Sunday";

export type DayValueType =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun";

export type MinuteType = "00" | "15" | "30" | "45";

export type TimeType = {
  hour: number;
  minute: number;
};

export type TaskDateType = {
  time: TimeType;
  date: DateType;
  reminder: ReminderType;
  repeat: DayValueType[];
};

export type RawDateType = {
  day: number;
  month: number;
  year: number;
};

export type DateType = {
  raw: RawDateType;
  ui: "Today" | "Tomorrow" | string;
};

export type LabelType = {
  id: string;
  value: string;
};

export type LabelsType = {
  labels: LabelType[];
};

export type UserType = {
  id: string;
  username: string | null;
  hasDownloadedDefaultLabels: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserState = UserType | null;

export type Task = {
  id: string;
  title: string;
  description: string | null;
  label: LabelType | null;
  date: TaskDateType | null;
  deadline: TaskDateType | null;
  highPriority: boolean;
};

export type StoreState = {
  user: UserType | null;
  tasks: Task[];
  labels: LabelType[];
};

export type ActionType = {
  error: string | null;
};