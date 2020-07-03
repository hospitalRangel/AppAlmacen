import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.page.html',
  styleUrls: ['./cambio.page.scss'],
})
export class CambioPage implements OnInit {

  imagen = '../assets/mensaje.png';
  imagen2 = '../assets/error.png';

  cambioForm: FormGroup;

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
      nombreInstitucion: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required, ]),
      numDocument: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      direccion: new FormControl('', [Validators.required]),
      medicamentoRecibido: new FormControl('', [Validators.required]),
      cantidadRecibida: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(100), Validators.max(500)]),
      medicamentoCambiado: new FormControl('', [Validators.required]),
      cantidadCambiada: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(100), Validators.max(500)]),
      nombreyapellido: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      tipo2: new FormControl('', [Validators.required]),
      numDocument2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      direccion2: new FormControl('', [Validators.required]),
      // tslint:disable-next-line: max-line-length
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(11) , Validators.maxLength(11)]),
      nombreyapellido2: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      tipo3: new FormControl('', [Validators.required]),
      numDocument3: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      fechaEntrega: new FormControl('', [Validators.required])
    });
  }

  constructor(private dbData: AuthService) {
    this.cambioForm = this.crearFormGroup();
   }

  ngOnInit() {
  }


  Reset() {
    this.cambioForm.reset();
  }

  async Guardar() {
    if (this.cambioForm.valid) {
      const newCambio = {
        nombreInstitucion : this.nombreInstitucion.value,
        // NumeroDeDocumentoInstitucion: this.tipo.value + this.numDocument.value,
        // direccionDeInstitucion: this.direccion.value,
        medicamentoRecibido: this.medicamentoRecibido.value,
        cantidadRecibida: Number(this.cantidadRecibida.value),
        medicamentoCambiado: this.medicamentoCambiado.value,
        cantidadCambiada: Number(this.cantidadCambiada.value),
        // nombreyapellido: this.nombreyapellido.value,
        // numDocument2: this.tipo2.value + this.numDocument2.value,
        // direccion2: this.direccion2.value,
        // telefono: this.telefono.value,
        // nombreyapellido2: this.nombreyapellido2.value,
        // numDocument3: this.tipo3.value + this.numDocument3.value,
        fechaEntrega: new Date(this.fechaEntrega.value).toISOString().replace(/T.*/, '').split('-').reverse().join('/')
      };
      // tslint:disable-next-line: max-line-length
      this.dbData.guardarIntercambio(newCambio, newCambio.medicamentoCambiado, newCambio.cantidadCambiada, newCambio.medicamentoRecibido, newCambio.cantidadRecibida);
      this.Reset();
    } else {
      console.log('¡Hubo un error!');
    }
  }

// Getter
  get nombreInstitucion() { return this.cambioForm.get('nombreInstitucion'); }
  get tipo() { return this.cambioForm.get('tipo'); }
  get numDocument() { return this.cambioForm.get('numDocument'); }
  get direccion() { return this.cambioForm.get('direccion'); }
  get medicamentoRecibido() { return this.cambioForm.get('medicamentoRecibido'); }
  get cantidadRecibida() { return this.cambioForm.get('cantidadRecibida'); }
  get medicamentoCambiado() { return this.cambioForm.get('medicamentoCambiado'); }
  get cantidadCambiada() { return this.cambioForm.get('cantidadCambiada'); }
  get nombreyapellido() { return this.cambioForm.get('nombreyapellido'); }
  get tipo2() { return this.cambioForm.get('tipo2'); }
  get numDocument2() { return this.cambioForm.get('numDocument2'); }
  get direccion2() { return this.cambioForm.get('direccion2'); }
  get telefono() { return this.cambioForm.get('telefono'); }
  get nombreyapellido2() { return this.cambioForm.get('nombreyapellido2'); }
  get tipo3() { return this.cambioForm.get('tipo3'); }
  get numDocument3() { return this.cambioForm.get('numDocument3'); }
  get fechaEntrega() { return this.cambioForm.get('fechaEntrega'); }

}
