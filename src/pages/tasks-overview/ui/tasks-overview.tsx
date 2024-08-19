import { PrimaryCard } from "@/shared/ui/primary-card.tsx";
import { Heading } from "@/shared/ui/heading.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { useQuery } from "@tanstack/react-query";
import TaskService from "@/shared/api/service/task.ts";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const TasksOverview = () => {
  const { t } = useTranslation();
  const { initDataRaw } = retrieveLaunchParams();
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TaskService.getTasks(initDataRaw),
  });

  return (
    <div className="flex flex-col w-full justify-center text-primary-text">
      <div className="flex gap-y-2 flex-col w-full justify-center text-center mt-6">
        <Heading>{t("tasks.title")}</Heading>
        <p className="flex m-auto w-9/12">{t("tasks.description")}</p>
      </div>
      <div className="flex flex-col gap-y-2 w-full mt-8">
        {tasks?.data.map((task, index) => (
          <PrimaryCard key={index}>
            <div className="flex flex-col gap-y-1.5 w-8/12">
              <h3 className="font-semibold text-sm">{task.name}</h3>
              <span className="text-sm">+{task.points} $MUSCLE</span>
            </div>
            <div className="flex items-center justify-end w-4/12">
              <Link to={task.link}>
                <Button variant="chip" size="chip" className="px-4 py-2.5">
                  Начать
                </Button>
              </Link>
            </div>
          </PrimaryCard>
        ))}
      </div>
    </div>
  );
};
