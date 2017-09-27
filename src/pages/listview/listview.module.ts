import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListviewPage } from './listview';

@NgModule({
  declarations: [
    ListviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListviewPage),
  ],
})
export class ListviewPageModule {}
