import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AgendaCadastroComponent } from './agenda-cadastro/agenda-cadastro.component';
import { AgendaPesquisaComponent } from './agenda-pesquisa/agenda-pesquisa.component';
import { AgendaRoutingModule } from './agenda-routing.module';
import {InputMaskModule} from 'primeng/inputmask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    
    MultiSelectModule,

    InputMaskModule,

    SharedModule,
    AgendaRoutingModule,
    ProgressSpinnerModule
  ],
  declarations: [
    AgendaCadastroComponent,
    AgendaPesquisaComponent
  ],
  exports: [
    
  ]
})
export class AgendaModule { }
