import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: 'admin', 
    component: AdminComponent,
    data: { showHeader: false, showSidebar: false } ,
    children: [
      { path: '', component: AdminComponent,}
    ]
   
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
