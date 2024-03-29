import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Combo } from 'src/app/modelos/combos/combo';
import { Query } from 'src/app/modelos/query/query';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { MainService } from 'src/app/servicios/main.service';
import { QueryService } from 'src/app/servicios/query/search.service';
import { BaseFormComponent } from '../../baseComponent';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';
import { OpportunityComponent } from '../opportunity/opportunity.component';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['Codigo','fecha_R','fecha', 'hora', 'nombre', 'doc', 'sede', 'novedad', 'accion'];

  novedades: Combo[] = [];
  empresas: Combo[] = [];
  sedes: Combo[] = [];
  datos: any = [];

  maxDate: Date;

  myForm = new FormGroup({
    Codigo: new FormControl(null, [Validators.maxLength(50), Validators.pattern(this.number)]),
    Numero_Id: new FormControl(null, [Validators.maxLength(15), Validators.pattern(this.number)]),
    Start_Date: new FormControl(null),
    End_Date: new FormControl(null),
    Empresa: new FormControl(null),
    Sede: new FormControl(null),
    Tipo_Novedad: new FormControl(null),
  });

  constructor(
    private QueryService: QueryService,
    public mainService: MainService,
    private comboService: ComboService,
    public dialog: MatDialog
  ) {
    super();

    this.maxDate = new Date();
  }

  ngAfterViewInit(): void {
    this.datos.paginator = this.paginator;
    this.cargaNovedades();
    this.cargaEmpresas();
  }

  ngOnInit(): void {

  }

  cargaEmpresas(){
    this.comboService.getEmpresas().subscribe({
      next: (req) => {
        this.empresas = req;
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    })
  }

  cargaSedes(empresa:any){
    this.comboService.getSedes(empresa).subscribe({
      next: (req) => {
        this.sedes = req;
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    })
  }

  cargaNovedades(){
    this.comboService.getNovedades().subscribe({
      next: (req) => {
        this.novedades = req;
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => (this.loadingMain = false),
    })
  }

  submit(): void {
    if (this.myForm.valid) {
      this.myForm.disable();
      this.loadingMain = true;
      this.QueryService.getAll(this.myForm.value).subscribe({
        next: (req) => {
          this.datos = req;
          console.log(this.datos)
          this.loadingMain = false;
          this.myForm.enable();
          if(this.datos.length < 1) {
            this.mainService.showToast("No se han encontrado registros, verifique los filtros", 'error');
          }
          //this.cancelar();
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
          this.loadingMain = false;
          this.myForm.enable();
        },
        complete: () => {
          this.loadingMain = false;
          this.myForm.enable();
        }
      });
    }
  }

  detalles(guid : any){
    const dialogRef = this.dialog.open(DetallesComponent, {
      width: '100%',
      height: '100%',
      data: guid,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  Oportunidades(guid : any){
    const dialogRef = this.dialog.open(OpportunityComponent, {
      width: '100%',
      height: '100%',
      data: guid,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  cancelar() {
    this.myForm.reset();
  }

  cambioFecha() {
    this.myForm.patchValue({
      codigo: null,
      documento: null,
    });
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.myForm, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.myForm, nameInput);
  }
}
