import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DotacionPageRoutingModule } from './dotacion-routing.module';

import { DotacionPage } from './dotacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DotacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DotacionPage]
})
export class DotacionPageModule {}
