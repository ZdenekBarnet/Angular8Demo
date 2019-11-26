import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { CustomersComponent } from './customers/customers.component';
import { SchematicsTableComponent } from './schematics-table/schematics-table.component';
import { DragDropSchematicsComponent } from './drag-drop-schematics/drag-drop-schematics.component';


const routes: Routes = [
  { path: 'dash', component: DashboardComponent, children: [
    { path: 'about', component: AboutComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'table', component: SchematicsTableComponent },
    { path: 'tasks', component: DragDropSchematicsComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: '', component : LoginComponent},
  { path: '**', redirectTo:'dash' }
  // ** znamena vsechno ostatni, takze nesmysl pujde na dashboard, ale kdyz nebudu mit token, tak to pujde na login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
