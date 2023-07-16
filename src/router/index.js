import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import ChartView from "@/components/ChartView.vue";

const routes = [
    {
        path: "/",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/ChartView",
        name: "ChartView",
        component: ChartView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;