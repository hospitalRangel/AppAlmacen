import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { Salida } from 'src/shared/salida.class';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.page.html',
  styleUrls: ['./salida.page.scss'],
})
export class SalidaPage implements OnInit {

  salidaForm: FormGroup;

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

  crearFormGroup() {
    return new FormGroup({
      nombreyapellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      tipo: new FormControl('', [Validators.required]),
      numDocument: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      direccion: new FormControl('', [Validators.required]),
      // tslint:disable-next-line: max-line-length
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(11) , Validators.maxLength(11)]),
      medicamento: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(500)]),
      nombreyapellido2: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      numDocument2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      tipo2: new FormControl('', [Validators.required]),
      fechaEntrega: new FormControl('', [Validators.required])
    });
  }

  constructor(private afs: AngularFirestore,
              private alertController: AlertController,
              private toastCtrl: ToastController,
              private dbData: AuthService) {

                // this.itemsCollection = db.collection < Salida > ('Salida');
                // this.items = this.itemsCollection.valueChanges();

                this.salidaForm = this.crearFormGroup();
              }

  ngOnInit() {}

  async Guardar() {
    if (this.salidaForm.valid) {
      const newSalida = {
        // nombreyapellido : this.nombreyapellido.value,
        // numDocument: this.tipo.value + this.numDocument.value,
        // direccion: this.direccion.value,
        // telefono: this.telefono.value,
        medicamento: this.medicamento.value,
        cantidad: Number(this.cantidad.value),
        // nombreyapellido2: this.nombreyapellido2.value,
        // numDocument2: this.tipo2.value + this.numDocument2.value,
        fechaEntrega: new Date(this.fechaEntrega.value).toISOString().replace(/T.*/, '').split('-').reverse().join('/')
      };
      const newInventario = {
        medicamento: this.medicamento.value,
        cantidad: Number(this.cantidad.value),
      };
      this.Reset();
      this.dbData.guardarSalida(newSalida, newInventario.medicamento, newInventario.cantidad);
      } else {
        console.log('¡Hubo un error!');
      }
  }

  Reset() {
    this.salidaForm.reset();
  }

  get nombreyapellido() { return this.salidaForm.get('nombreyapellido'); }
  get tipo() { return this.salidaForm.get('tipo'); }
  get numDocument() { return this.salidaForm.get('numDocument'); }
  get direccion() { return this.salidaForm.get('direccion'); }
  get telefono() { return this.salidaForm.get('telefono'); }
  get medicamento() { return this.salidaForm.get('medicamento'); }
  get cantidad() { return this.salidaForm.get('cantidad'); }
  get nombreyapellido2() { return this.salidaForm.get('nombreyapellido2'); }
  get tipo2() { return this.salidaForm.get('tipo2'); }
  get numDocument2() { return this.salidaForm.get('numDocument2'); }
  get fechaEntrega() { return this.salidaForm.get('fechaEntrega'); }

}
