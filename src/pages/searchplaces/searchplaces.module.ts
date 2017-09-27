import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchplacesPage } from './searchplaces';

@NgModule({
  declarations: [
    SearchplacesPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchplacesPage),
  ],
})
export class SearchplacesPageModule {}
