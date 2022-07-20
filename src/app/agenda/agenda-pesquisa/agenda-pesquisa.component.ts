import { Component, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { MessageService, ConfirmationService, LazyLoadEvent } from "primeng/api";
import { Table } from "primeng/table";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { AuthService } from "src/app/seguranca/auth.service";
import { AgendaFiltro, AgendaService } from "../agenda.service";


@Component({
  selector: 'app-agenda-pesquisa',
  templateUrl: './agenda-pesquisa.component.html',
  styleUrls: ['./agenda-pesquisa.component.css']
})
export class AgendaPesquisaComponent implements OnInit {


  filtro = new AgendaFiltro();

  totalRegistros: number = 0

  agendas: any[] = [] ;
  @ViewChild('tabela') grid!: Table;
  
  constructor(
    private auth: AuthService,
    private agendaService: AgendaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Agenda');
  }
  
  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    
    this.agendaService.pesquisar(this.filtro)
      .then((resultado: any) => {
        this.agendas = resultado.agendas;
        this.totalRegistros = resultado.total ;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
  }

  confirmarExclusao(agenda: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          this.excluir(agenda);
      }
    });
  }

  excluir(agenda: any) {

    this.agendaService.excluir(agenda.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Agenda excluída com sucesso!' })
      })
  }

  naoTemPermissao(permissao: string) {
    return !this.auth.temPermissao(permissao);
  }
}
