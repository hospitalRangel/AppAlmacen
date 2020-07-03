import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventarioForm: FormGroup;

  imagen = '../assets/mensaje.png';
  imagen2 = '../assets/error.png';

  crearFormGroup() {
    return new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      fechaEntrega: new FormControl('', [Validators.required]),
      creador: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      tipo: new FormControl('', [Validators.required]),
      numDocument: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  constructor(private alertController: AlertController,
              public file: File,
              public fileOpener: FileOpener,
              public dbData: AuthService) {
    this.inventarioForm = this.crearFormGroup();
   }

  ngOnInit() {
  }

  Reset() {
    this.inventarioForm.reset();
  }

// Getter
  get codigo() { return this.inventarioForm.get('codigo'); }
  get fechaEntrega() { return this.inventarioForm.get('fechaEntrega'); }
  get creador() { return this.inventarioForm.get('creador'); }
  get tipo() { return this.inventarioForm.get('tipo'); }
  get numDocument() { return this.inventarioForm.get('numDocument'); }

}
