import {PrimaryCard} from "@/shared/ui/primary-card.tsx";
import {Heading} from "@/shared/ui/heading.tsx";
import {Button} from "@/shared/ui/button.tsx";

export const TasksOverview = () => {
    const tasks = [
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
        {
            title: 'Подпишитесь на MuscleCare в Telegram',
            price: '2 000',
        },
    ];

    return (
        <div className="flex flex-col w-full justify-center text-primary-text">
            <div className="flex gap-y-2 flex-col w-full justify-center text-center mt-6">
                <Heading>Задания</Heading>
                <p className="flex m-auto w-9/12">Выполняйте задания, чтобы получить $MUSCLE</p>
            </div>
            <div className="flex flex-col gap-y-2 w-full mt-8">
                {tasks.map((task, index) => (
                    <PrimaryCard key={index}>
                        <div className="flex flex-col gap-y-1.5 w-8/12">
                            <h3 className="font-semibold text-sm">{task.title}</h3>
                            <span className="text-sm">+{task.price} $MUSCLE</span>
                        </div>
                        <div className="flex items-center justify-end w-4/12">
                            <Button variant="chip" size="chip" className="px-4 py-2.5">Начать</Button>
                        </div>
                    </PrimaryCard>
                ))}
            </div>
        </div>
    );
};
