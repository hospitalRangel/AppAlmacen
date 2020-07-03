import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { Entrada } from 'src/shared/entrada.class';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {

  imagen = '../assets/mensaje.png';
  imagen2 = '../assets/error.png';

  medicamentos: any[] = [
    {
      medicamento: 'Paracetamol'
    },
    {
      medicamento: 'Omeprazol'
    },
    {
      medicamento: 'Aspirina'
    },
    {
      medicamento: 'Ibuprofeno'
    },
    {
      medicamento: 'Morfina'
    },
    {
      medicamento: 'Ketoprofeno'
    },
    {
      medicamento: 'Diclofenaco'
    },
    {
      medicamento: 'Salbutamol'
    },
    {
      medicamento: 'Amoxicilina'
    }
  ];

  entradaForm: FormGroup;

  crearFormGroup() {
    return new FormGroup({
      razon: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      tipo: new FormControl('', [Validators.required]),
      numDocument: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      direccion: new FormControl('', [Validators.required]),
      medicamento: new FormControl('', [Validators.required]),
      numLote: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(100000)]),
      fechaVen: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(100), Validators.max(500)]),
      nombreyapellido: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      tipo2: new FormControl('', [Validators.required]),
      numDocument2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      direccion2: new FormControl('', [Validators.required]),
      nombreyapellido2: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      tipo3: new FormControl('', [Validators.required]),
      numDocument3: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      fechaEntrada: new FormControl('', [Validators.required])
    });
  }

  constructor(private db: AngularFirestore,
              private alertController: AlertController,
              private dbData: AuthService,
              private afs: AngularFirestore) {
    this.entradaForm = this.crearFormGroup();
  }

  ngOnInit() {}

  async Guardar() {
    if (this.entradaForm.valid) {
      const newEntrada = {
        razonSocial: this.razon.value,
        // numDocument: this.tipo.value + this.numDocument.value,
        // direccion: this.direccion.value,
        medicamento: this.medicamento.value,
        numeroDeLote: this.numLote.value,
        fechadeVencimiento: new Date(this.fechaVen.value).toISOString().replace(/T.*/, '').split('-').reverse().join('/'),
        cantidad: Number(this.cantidad.value),
        // nombreyapellido: this.nombreyapellido.value,
        // numDocument2: this.tipo2.value + this.numDocument2.value,
        // direccion2: this.direccion2.value,
        // nombreyapellido2: this.nombreyapellido2.value,
        // numDocument3: this.tipo3.value + this.numDocument3.value,
        fechadeEntrada: new Date(this.fechaEntrada.value).toISOString().replace(/T.*/, '').split('-').reverse().join('/')
      };
      const newInventario = {
        medicamento: this.medicamento.value,
        cantidad: Number(this.cantidad.value),
      };
      this.dbData.guardarEntrada(newEntrada, newInventario, newInventario.medicamento, newInventario.cantidad);
      this.Reset();
    } else {
      console.log('¡Hubo un error!');
    }
  }

  Reset() {
    this.entradaForm.reset();
  }

  // Getter
  get razon() {
    return this.entradaForm.get('razon');
  }
  get tipo() {
    return this.entradaForm.get('tipo');
  }
  get numDocument() {
    return this.entradaForm.get('numDocument');
  }
  get direccion() {
    return this.entradaForm.get('direccion');
  }
  get medicamento() {
    return this.entradaForm.get('medicamento');
  }
  get numLote() {
    return this.entradaForm.get('numLote');
  }
  get fechaVen() {
    return this.entradaForm.get('fechaVen');
  }
  get cantidad() {
    return this.entradaForm.get('cantidad');
  }
  get nombreyapellido() {
    return this.entradaForm.get('nombreyapellido');
  }
  get tipo2() {
    return this.entradaForm.get('tipo2');
  }
  get numDocument2() {
    return this.entradaForm.get('numDocument2');
  }
  get direccion2() {
    return this.entradaForm.get('direccion2');
  }
  get nombreyapellido2() {
    return this.entradaForm.get('nombreyapellido2');
  }
  get tipo3() {
    return this.entradaForm.get('tipo3');
  }
  get numDocument3() {
    return this.entradaForm.get('numDocument3');
  }
  get fechaEntrada() {
    return this.entradaForm.get('fechaEntrada');
  }

}
