import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Agenda } from '../core/model';
import { environment } from '../../environments/environment';

export class AgendaFiltro {
  nome?: string
  dataNascimento?: Date
  telefone?: string
  pagina: number = 0
  itensPorPagina: number = 5
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  
  agendaUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.agendaUrl = `${environment.apiUrl}/agenda`
  }

  uploadHeaders() {
    return new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }

  pesquisar(filtro: AgendaFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);
    

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }   
    
    if (filtro.dataNascimento) {
      params = params.set('dataNascimento', this.datePipe.transform(filtro.dataNascimento, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.agendaUrl}?resumo`, { headers, params })
      .toPromise()
      .then((response : any) => {
        const agendas = response['content'];

        const resultado = {
          agendas,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.agendaUrl}/${codigo}`, { headers })
      .toPromise();
  }

  adicionar(agenda: Agenda): Promise<Agenda> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.post<Agenda>(this.agendaUrl, agenda, { headers })
      .toPromise();
  }

  atualizar(agenda: Agenda): Promise<Agenda> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
  
    return this.http.put<Agenda>(`${this.agendaUrl}/${agenda.codigo}`, agenda, { headers })
      .toPromise()
      .then((response:any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Agenda> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.agendaUrl}/${codigo}`, { headers })
      .toPromise()
      .then((response:any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });
  }

  private converterStringsParaDatas(agendas: any[]) {

    for (const agenda of agendas) {
      
      agenda.dataNascimento = new Date(agenda.dataNascimento);
   
    }
  }

}
