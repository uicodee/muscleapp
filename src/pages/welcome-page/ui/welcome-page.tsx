import {Spinner} from "@telegram-apps/telegram-ui";
import {Suspense, useEffect} from "react";
import {useMiniApp} from "@telegram-apps/sdk-react";
import body from "@/assets/body.png"
import earn from "@/assets/earn.png"
import bring from "@/assets/bring.png"

export const WelcomePage = () => {
    const miniApp = useMiniApp();

    const slides = [
        {
            title: "Качай персонажа",
            description: "Руки ноги и спину",
            image: <img src={body}/>
        },
        {
            title: "Зарабатывай токены",
            description: "$MUSCLE",
            image: <img src={earn}/>
        },
        {
            title: "Зови друзей",
            description: "Получай токены",
            image: <img src={bring}/>
        }
    ]
    useEffect(() => {
        miniApp.setHeaderColor('#1877F2')
    }, [miniApp]);
    return (
        <Suspense fallback={
            <div className="flex h-lvh max-h-lvh justify-center items-center bg-secondary">
                <Spinner size="m"/>
            </div>
        }>
            <div className="h-lvh w-full bg-primary-blue px-2">
                <div className="flex flex-col w-full h-full justify-center text-white">
                    {/*<div className="flex bg-white px-4 py-2 rounded-full text-primary-blue">Пропустить</div>*/}
                    <div className="flex w-full justify-center items-center">{slides[0].image}</div>
                    <div className="flex flex-col gap-y-4 mt-14">
                        <h1 className=" text-4xl">{slides[0].title}</h1>
                        <span className="font-light">{slides[0].description}</span>
                    </div>
                    {/*<div className="flex mt-9 items-start">*/}
                    {/*    <div className="flex">*/}
                    {/*        <svg width="115" height="60" viewBox="0 0 115 60" fill="none"*/}
                    {/*             xmlns="http://www.w3.org/2000/svg">*/}
                    {/*            <rect width="115" height="60" rx="30" fill="white"/>*/}
                    {/*            <path fillRule="evenodd" clipRule="evenodd"*/}
                    {/*                  d="M79.2365 22.2645C79.6496 21.8903 80.2929 21.9163 80.6734 22.3225L87.231 29.3225C87.5897 29.7053 87.5897 30.2947 87.231 30.6775L80.6734 37.6775C80.2929 38.0837 79.6496 38.1097 79.2365 37.7355C78.8234 37.3613 78.797 36.7287 79.1775 36.3225L84.1636 31H28.5169C27.9553 31 27.5 30.5523 27.5 30C27.5 29.4477 27.9553 29 28.5169 29H84.1636L79.1775 23.6775C78.797 23.2713 78.8234 22.6387 79.2365 22.2645Z"*/}
                    {/*                  fill="#1877F2"/>*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                </div>
            </div>
        </Suspense>
    )
}