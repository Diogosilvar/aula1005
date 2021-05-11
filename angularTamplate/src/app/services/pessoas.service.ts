import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pessoas } from '../models/pessoas';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  url = 'http://localhost:3000/Pessoas'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Pessoasros
  getPessoas(): Observable<Pessoas[]> {
    return this.httpClient.get<Pessoas[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Pessoasro pelo id
  getPessoasById(id: number): Observable<Pessoas> {
    return this.httpClient.get<Pessoas>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salvar uma Pessoa
  savePessoas(Pessoas: Pessoas): Observable<Pessoas> {
    return this.httpClient.post<Pessoas>(this.url, JSON.stringify(Pessoas), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Atualiza uma Pessoa
  updatePessoas(Pessoas: Pessoas): Observable<Pessoas> {
    return this.httpClient.put<Pessoas>(this.url + '/' + Pessoas.id, JSON.stringify(Pessoas), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deletar uma Pessoa
  deletePessoas(Pessoas: Pessoas) {
    return this.httpClient.delete<Pessoas>(this.url + '/' + Pessoas.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}