import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { PqService } from 'src/app/servicios/investigaciones/pq.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OportunidadesFormComponent } from '../../oportunidades-form/oportunidades-form.component';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-p5',
  templateUrl: './p5.component.html',
  styleUrls: ['./p5.component.css']
})
export class P5Component implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private PqService: PqService,
    public mainService: MainService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<P5Component>,
  ) {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
  }
  realizado: boolean = false;
  pq:any;

  form = new FormGroup({
    Id_Detalle: new FormControl(''),
    P5_1: new FormControl(''),
    P5_2: new FormControl(''),
    P5_3: new FormControl(''),
    P5_4: new FormControl(''),
    P5_5: new FormControl(''),
  });


  ngOnInit(): void {
    console.log(this.data)
    if (this.data.all_data.P5 != null){
      this.pq = this.data.all_data.P5;
      this.realizado = true;
      this.form.disable();
      this.setData();
    }else{
      this.realizado = false;
    }
  }

  setData(){
    this.form.controls['P5_1'].setValue(this.pq?.P5_1);
    this.form.controls['P5_2'].setValue(this.pq?.P5_2);
    this.form.controls['P5_3'].setValue(this.pq?.P5_3);
    this.form.controls['P5_4'].setValue(this.pq?.P5_4);
    this.form.controls['P5_5'].setValue(this.pq?.P5_5);
  }

  submit() {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
    console.log(this.form.value)
    if (this.form.valid) {
      this.PqService.send(this.form.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente', 'success');
          this.realizado = true;
          this.form.disable();
          this.mejoras();
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  borrar(){
    this.PqService.borrar(this.data?.id_detalle).subscribe({
      next: (req:any) => {
        console.log(req)
        this.form.reset();
        this.mainService.showToast('Eliminado Correctamente');
        this.realizado = false;
        this.form.enable();
      },
      error: (err: string) => {
        console.log(err)
        this.mainService.showToast(err, 'error');
      },
      complete: () => {
      }
    });
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }

  cancelar(){
    this.dialogRef.close();
  }

  mejoras(){
    const dialogRef = this.dialog.open(OportunidadesFormComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

}
