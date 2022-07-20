import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Agenda } from "src/app/core/model";
import { AgendaService } from "../agenda.service";

@Component({
  selector: 'app-agenda-cadastro',
  templateUrl: './agenda-cadastro.component.html',
  styleUrls: ['./agenda-cadastro.component.css']
})
export class AgendaCadastroComponent implements OnInit {
  
  formulario!: FormGroup;

  
  constructor(
    private agendaService: AgendaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle('Nova Agenda');
    const codigoAgenda = this.route.snapshot.params['codigo'];

    if (codigoAgenda) {
      this.carregarAgenda(codigoAgenda)
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      nome: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      dataNascimento: [ null, Validators.required ],
      telefone: [null, Validators.required],
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }


  get editando() {
    return Boolean(this.formulario.get('codigo')!.value);
  }
  
  carregarAgenda(codigo: number) {
    this.agendaService.buscarPorCodigo(codigo)
      .then(agenda => {
        console.log(agenda);
        this.formulario.patchValue(agenda)
      },
      erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarAgenda()
    } else {
      this.adicionarAgenda()
    }
  }

  atualizarAgenda() {
    this.agendaService.atualizar(this.formulario.value)
      .then((agenda:Agenda) => {
          this.formulario.patchValue(agenda)
          this.messageService.add({ severity: 'success', detail: 'Agenda alterada com sucesso!' });
          this.atualizarTituloEdicao();
        }
      ).catch(erro => this.errorHandler.handle(erro))
  }

  adicionarAgenda() {
    this.agendaService.adicionar(this.formulario.value)
      .then(agendaAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Agenda adicionada com sucesso!' });

        this.router.navigate(['/agenda', agendaAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset(new Agenda);

    this.router.navigate(['agenda/novo']);
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de agenda: ${this.formulario.get('nome')!.value}`);
  }
}
