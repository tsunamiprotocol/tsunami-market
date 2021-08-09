import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { DatasetComponent } from './components/dataset/dataset.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DatasetComponent
  },
  {
    path: 'buy',
    component: BuyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
