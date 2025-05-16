import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DestinosComponent } from './components/destinos/destinos.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'destinos', component: DestinosComponent}
];

