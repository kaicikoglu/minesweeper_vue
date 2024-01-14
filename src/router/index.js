import {createRouter, createWebHistory} from "vue-router";

import AboutPage from "@/Views/AboutPage.vue";
import MinesweeperGame from "@/Views/MinesweeperGame.vue";
import LoseScreen from "@/components/Game/LoseScreen.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AboutPage,
        },
        {
            path: '/game/:difficulty',
            name: 'game',
            component: MinesweeperGame
        },
        {
            path: '/lost',
            name: 'lose',
            component: LoseScreen
        }
    ]
});

export default router;