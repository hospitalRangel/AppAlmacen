import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dotacion',
  templateUrl: './dotacion.page.html',
  styleUrls: ['./dotacion.page.scss'],
})
export class DotacionPage implements OnInit {

  dotacionForm: FormGroup;

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
      area: new FormControl('', [Validators.required]),
      nombreyapellido: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      tipo: new FormControl('', [Validators.required]),
      numDocument: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      medicamentoSolicitado: new FormControl('', [Validators.required]),
      cantidadSolicitada: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(50)]),
      cantidadDespachada: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(50)]),
      nombreyapellido2: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      numDocument2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      tipo2: new FormControl('', [Validators.required]),
      fechaEntrega: new FormControl('', [Validators.required])
    });
  }

  constructor(private dbData: AuthService,
              private alertController: AlertController) {
    this.dotacionForm = this.crearFormGroup();

    // dbData.guardarInterno(newDota);
   }

  ngOnInit() {
  }

  async Guardar() {
    if (this.dotacionForm.valid) {
      const newDotacion = {
        area: this.area.value,
        // nombreyapellido: this.nombreyapellido.value,
        // numDocument: this.tipo.value + this.numDocument.value,
        medicamentoSolicitado: this.medicamentoSolicitado.value,
        cantidadSolicitada: Number(this.cantidadSolicitada.value),
        cantidadDespachada: Number(this.cantidadDespachada.value),
        // nombreyapellido2: this.nombreyapellido2.value,
        // numDocument2: this.tipo2.value + this.numDocument2.value,
        fechaEntrega: new Date(this.fechaEntrega.value).toISOString().replace(/T.*/, '').split('-').reverse().join('/')
      };
      this.dbData.guardarInterno(newDotacion, newDotacion.medicamentoSolicitado, newDotacion.cantidadDespachada);
      this.Reset();
    } else {
      console.log('¡Hubo un error!');
    }
  }

  Reset() {
    this.dotacionForm.reset();
  }

  get area() { return this.dotacionForm.get('area'); }
  get nombreyapellido() { return this.dotacionForm.get('nombreyapellido'); }
  get tipo() { return this.dotacionForm.get('tipo'); }
  get numDocument() { return this.dotacionForm.get('numDocument'); }
  get medicamentoSolicitado() { return this.dotacionForm.get('medicamentoSolicitado'); }
  get cantidadSolicitada() { return this.dotacionForm.get('cantidadSolicitada'); }
  get cantidadDespachada() { return this.dotacionForm.get('cantidadDespachada'); }
  get nombreyapellido2() { return this.dotacionForm.get('nombreyapellido2'); }
  get tipo2() { return this.dotacionForm.get('tipo2'); }
  get numDocument2() { return this.dotacionForm.get('numDocument2'); }
  get fechaEntrega() { return this.dotacionForm.get('fechaEntrega'); }

}
