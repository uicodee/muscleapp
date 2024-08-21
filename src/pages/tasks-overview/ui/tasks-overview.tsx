import { PrimaryCard } from "@/shared/ui/primary-card.tsx";
import { Heading } from "@/shared/ui/heading.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskService from "@/shared/api/service/task.ts";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const TasksOverview = () => {
  const [started, setStarted] = useState<number[]>([]);
  const { t } = useTranslation();
  const { initDataRaw } = retrieveLaunchParams();
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TaskService.getTasks(initDataRaw),
  });
  const mutation = useMutation({
    mutationFn: (taskId: number) => TaskService.checkTask(initDataRaw, taskId),
    onError: (taskId: number) => {
      setStarted((prevStarted) => prevStarted.filter((id) => id !== taskId));
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div className="flex flex-col w-full justify-center text-primary-text">
      <div className="flex gap-y-2 flex-col w-full justify-center text-center mt-6">
        <Heading>{t("tasks.title")}</Heading>
        <p className="flex m-auto w-9/12">{t("tasks.description")}</p>
      </div>
      <div className="flex flex-col gap-y-2 w-full mt-8">
        {tasks?.data.map((task, index) => (
          <PrimaryCard key={index} className="gap-x-6">
            <div className="flex flex-col gap-y-1.5 w-8/12">
              <h3 className="font-semibold text-sm">{task.name}</h3>
              <span className="text-sm">+{task.points} $MUSCLE</span>
            </div>
            <div className="flex items-center justify-end w-4/12">
              {started.includes(task.id) ? (
                <Button
                  variant="chip"
                  size="chip"
                  className="px-4 py-2.5"
                  onClick={() => mutation.mutate(task.id)}
                >
                  {t("tasks.check")}
                </Button>
              ) : (
                <Link to={task.link}>
                  <Button
                    variant="chip"
                    size="chip"
                    className="px-4 py-2.5 bg-[#EFEFF4] border border-primary-blue text-primary-blue"
                    onClick={() => {
                      if (!started.includes(task.id)) {
                        setStarted([...started, task.id]);
                      }
                    }}
                  >
                    {t("tasks.start")}
                  </Button>
                </Link>
              )}
            </div>
          </PrimaryCard>
        ))}
      </div>
    </div>
  );
};
