import Vue from 'vue';
import Router from 'vue-router';
import EmployeesComponent from './components/EmployeesComponent.vue';

Vue.use(Router);

export const routes = [
    {
        name: 'empleados',
        path: '/',
        component: EmployeesComponent
    },
];

const router = new Router({
    routes: routes
});

export default router;
