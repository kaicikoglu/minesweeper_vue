import {createRouter, createWebHistory} from "vue-router";

import AboutPage from "@/Views/AboutPage.vue";
import MinesweeperGame from "@/Views/MinesweeperGame.vue";
import LoseScreen from "@/components/Game/LoseScreen.vue";
import RegisterPage from "@/Views/RegisterPage.vue";
import SignIn from "@/Views/SignIn.vue";
import StartPage from "@/Views/StartPage.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: StartPage,
        }, {
            path: '/home',
            component: AboutPage,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/game/:difficulty',
            name: 'game',
            component: MinesweeperGame,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/lost',
            name: 'lose',
            component: LoseScreen,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/register',
            name: 'registerPage',
            component: RegisterPage
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignIn
        }
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("You dont have acces!");
            next("/")
        }
    } else {
        next();
    }
});

export default router;