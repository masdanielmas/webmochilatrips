import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DestinosComponent } from './components/destinos/destinos.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'destinos', component: DestinosComponent},
    {path: 'planes', component: PlanesComponent},
    {path: 'reservas', component: ReservasComponent},
    {path: 'user', component: UserComponent},
    {path: 'login', component: LoginComponent}
];

