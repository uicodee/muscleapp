import { HomeIcon } from "@/assets/icons/home.tsx";
import { LevelIcon } from "@/assets/icons/level.tsx";
import { TaskIcon } from "@/assets/icons/task.tsx";
import { FriendIcon } from "@/assets/icons/friend.tsx";

export const tabs = [
  {
    title: "Главная",
    icon: <HomeIcon />,
    href: "/",
    key: "main",
  },
  {
    title: "Прокачка",
    icon: <LevelIcon />,
    href: "/level",
    key: "upgrade",
  },
  {
    title: "Задания",
    icon: <TaskIcon />,
    href: "/tasks",
    key: "tasks",
  },
  {
    title: "Друзья",
    icon: <FriendIcon />,
    href: "/friends",
    key: "friends",
  },
];
