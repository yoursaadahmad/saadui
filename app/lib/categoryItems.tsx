import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
    name: string;
    title: string;
    image: ReactNode;
    id: number;
}


export const categoryItems: iAppProps[] = [
    {
        id: 0,
        name: 'template',
        title: 'Templates',
        image: <Globe />,
    },
    {
        id: 1,
        name:'uikits',
        title:'UI Kits',
        image: <ChefHat />,
    },
    {
        id: 2,
        name:'icons',
        title:'Icons',
        image: <PartyPopper />
    },
];