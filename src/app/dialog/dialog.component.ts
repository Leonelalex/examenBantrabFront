import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              public dialogRef: MatDialogRef<DialogComponent>
             ) { }
  empresa !: FormGroup;

  ngOnInit(): void {
    this.empresa = this.formBuilder.group({
      nombre_comercial : ['', Validators.required],
      razon_social : ['', Validators.required],
      telefono : ['', Validators.required],
      correo : ['', [Validators.required, Validators.email]],
      nit : ['', Validators.required],
      direccion : ['', Validators.required],
      estado : ['', Validators.required],
    });
    
    if(this,this.editData){
      this.empresa.controls['nombre_comercial'].setValue(this.editData.nombre_comercial);
      this.empresa.controls['razon_social'].setValue(this.editData.razon_social);
      this.empresa.controls['telefono'].setValue(this.editData.telefono);
      this.empresa.controls['correo'].setValue(this.editData.correo);
      this.empresa.controls['nit'].setValue(this.editData.nit);
      this.empresa.controls['direccion'].setValue(this.editData.direccion);
      this.empresa.controls['estado'].setValue(this.editData.estado);
    }
  }

  getErrorMessage() {
    return 'campo requerido';
  }

  close() {
    this.dialogRef.close();
  }

  guardarEmpresa() {
    console.log(JSON.stringify({"empresa" : this.empresa.value}))
    if(this.editData){
      const apiEmpresas = new Request('https://apitest-bt.herokuapp.com/api/v1/empresas/'+this.editData.id, 
      {
        method: 'PUT',
        headers: {user: 'User123', password: 'Password123', 'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({"empresa" : this.empresa.value})
      })
  
      fetch(apiEmpresas)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("Error al consumir api de empresas: " + error));

      return
    }

    const apiEmpresas = new Request('https://apitest-bt.herokuapp.com/api/v1/empresas', 
    {
      method: 'POST',
      headers: {user: 'User123', password: 'Password123', 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({"empresa" : this.empresa.value})
    })

    fetch(apiEmpresas)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("Error al consumir api de empresas: " + error));

  }

}
