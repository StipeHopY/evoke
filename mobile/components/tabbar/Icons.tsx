import {
  House,
  MessageSquareText,
  CirclePlus,
  Trophy,
  Settings
} from "lucide-react-native";

import { RouteName } from "@/types";

type ColorType = {
  color: string;
};

type IconsType = ColorType & {
  routeName: RouteName;
};

const icons = {
  home: (color: string) => <House strokeWidth={2} size={26} color={color} />,
  chat: (color: string) => <MessageSquareText strokeWidth={2} size={26} color={color} />,
  create: (color: string) => <CirclePlus strokeWidth={2} size={26} color={color} />,
  goals: (color: string) => <Trophy strokeWidth={2} size={26} color={color} />,
  options: (color: string) => <Settings strokeWidth={2} size={26} color={color} />,
};

const Icons = ({ color, routeName }: IconsType) => {
  return icons[routeName](color);
};

export default Icons;
