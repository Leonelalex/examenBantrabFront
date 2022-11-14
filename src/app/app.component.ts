import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'examen';

  constructor(private dialog : MatDialog){}

  ngOnInit(): void {
    this.getEmpresas();
  }

  displayedColumns: string[] = ['id', 'estado', 'nombre_comercial', 'correo', 'nit', 'opciones'];
  dataSource !: MatTableDataSource<any>;
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  openDetail(row : any){
    const detailRef = this.dialog.open(DetailViewComponent, {
      width: '800px',
      data: row
    });

    detailRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  getEmpresas() {
    const apiEmpresas = new Request('https://apitest-bt.herokuapp.com/api/v1/empresas', 
    {
      headers: {user: 'User123', password: 'Password123'}
    })

    fetch(apiEmpresas)
    .then((response) => response.json())
    .then((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
    .catch((error) => console.log("Error al consumir api de empresas: " + error));
  }

  editarEmpresa(row : any){
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: row
    })
  }

  verEmpresa(row : any){
    console.log("ver empresa");
  }

}


