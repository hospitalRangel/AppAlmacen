import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/services/auth.service';
import { ListaPageModule } from './lista.module';
import { ListaPageRoutingModule } from './lista-routing.module';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  albumes: any[] = [];
  textoBuscar = '';

  public lista: any[];
  public listaCargada: any[];

  constructor( private dbData: AuthService, public fs: AngularFirestore, ) { }

  ngOnInit() {
    // this.dataService.getAlbumes().subscribe( albumes => {
    //   console.log(albumes);
    //   this.albumes = albumes;
    // });
    this.fs.collection('Inventario').valueChanges().subscribe(lista => {
      this.lista = lista;
      this.listaCargada = lista;
      console.log('Estos son los medicamentos que hay actualmente en el Inventario ' , lista);
      if (lista.length === 0) {
        this.dbData.AlertaDatos();
      }
    });
  }

  initializeItems(): void {
    this.lista = this.listaCargada;
  }

  buscar( event ) {
    this.initializeItems();

    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.lista = this.lista.filter(prueba => {
      if (prueba.medicamento && searchTerm) {
        if (prueba.medicamento.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

}
