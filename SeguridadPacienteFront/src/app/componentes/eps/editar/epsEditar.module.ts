import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EpsEditarComponent } from './epsEditar.component';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme';

@NgModule({
  declarations: [EpsEditarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
  ],
  providers: [],
})
export class EpsEditarModule {}
