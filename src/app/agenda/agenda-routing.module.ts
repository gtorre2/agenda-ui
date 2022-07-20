import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaPesquisaComponent } from './agenda-pesquisa/agenda-pesquisa.component';
import { AgendaCadastroComponent } from './agenda-cadastro/agenda-cadastro.component';


const routes: Routes = [
    { 
      path: '', 
      component: AgendaPesquisaComponent, 
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_AGENDA'] } 
    },
    { 
      path: 'novo', 
      component: AgendaCadastroComponent, 
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_AGENDA'] } 
    },
    {
      path: ':codigo', 
      component: AgendaCadastroComponent, 
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_AGENDA'] } 
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class AgendaRoutingModule { }