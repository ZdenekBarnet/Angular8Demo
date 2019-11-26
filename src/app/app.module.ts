import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { AboutComponent } from './about/about.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CustomersComponent } from './customers/customers.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRippleModule } from '@angular/material/core';
import { SchematicsTableComponent } from './schematics-table/schematics-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DragDropSchematicsComponent } from './drag-drop-schematics/drag-drop-schematics.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AgmCoreModule } from '@agm/core';
import { CustomerDialogComponent } from './customers/customerDialog/customerDialog.component';

@NgModule({
  entryComponents: [CustomerDialogComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CustomerDialogComponent,
    AboutComponent,
    CustomersComponent,
    SchematicsTableComponent,
    DragDropSchematicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule, // diky tomu funguje 2way data binding napr v <input type="text" [(ngModel)]="name">
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressBarModule,
    ScrollingModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      libraries: ['places']
    }),
    DragDropModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
