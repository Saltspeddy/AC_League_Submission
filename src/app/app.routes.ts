import { Routes } from '@angular/router';

export const routes: Routes = [{
    path:'',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./home/home').then((m) => m.Home)
    },
    },
    {
    path:'profile',
        loadComponent:() => {
            return import('./profile/profile').then((m)=> m.Profile)
        },
    },
    {
    path:'create-profile',
    loadComponent:() => {
        return import('./create-profile/create-profile').then((m)=> m.CreateProfile)
    },
    },
    {
    path:'login',
    loadComponent:() => {
        return import('./login/login').then((m)=> m.LoginComponent)
    },
    
}];
