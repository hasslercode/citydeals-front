import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MindfulBitesComponent } from './ui/pages/mindful-bites/mindful-bites.component';

const routes: Routes = [
  { path: 'mindfulbites', component: MindfulBitesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
