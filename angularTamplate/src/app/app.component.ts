import { Component, OnInit } from '@angular/core';
import { PessoasService } from './services/pessoas.service';
import { Pessoas } from './models/pessoas';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pessoa = {} as Pessoas;
  pessoas!: Pessoas[];
  title: any;

  constructor(private pessoaService: PessoasService) {}
  
  ngOnInit() {
    this.getPessoas();
  }

  // defini se uma pessoa será criado ou atualizada
  savePessoa(form: NgForm) {
    if (this.pessoa.id !== undefined) {
      this.pessoaService.updatePessoas(this.pessoa).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.pessoaService.savePessoas(this.pessoa).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todas as pessoas
  getPessoas() {
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoas[]) => {
      this.pessoas = pessoas;
    });
  }

  // deleta uma pessoa
  deletePessoa(pessoa: Pessoas) {
    this.pessoaService.deletePessoas(pessoa).subscribe(() => {
      this.getPessoas();
    });
  }

  // copiar uma pessoa para ser editado.
  editPessoa(pessoa: Pessoas) {
    this.pessoa = { ...pessoa };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPessoas();
    form.resetForm();
    this.pessoa = {} as Pessoas;
  }

}