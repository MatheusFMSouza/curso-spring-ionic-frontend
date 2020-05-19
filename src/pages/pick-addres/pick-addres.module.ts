import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickAddresPage } from './pick-addres';

@NgModule({
  declarations: [
    PickAddresPage,
  ],
  imports: [
    IonicPageModule.forChild(PickAddresPage),
  ],
})
export class PickAddresPageModule {}
