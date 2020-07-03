import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioPageRoutingModule } from './inventario-routing.module';

import { InventarioPage } from './inventario.page';
import { AuthService } from 'src/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InventarioPage]
})
export class InventarioPageModule {}
