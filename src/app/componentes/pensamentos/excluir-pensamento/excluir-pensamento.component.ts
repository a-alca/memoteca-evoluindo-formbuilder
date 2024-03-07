import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent {

  pensamento: Pensamento = {
    id: '',
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      const id =  this.route.snapshot.paramMap.get('id')
      this.service.buscarPorId(id!).subscribe((pensamento) => {
        this.pensamento = pensamento
      })
    }

    excluirPensamento() {
      if(this.pensamento.id) {
        this.service.excluirPensamento(this.pensamento.id).subscribe(() => {
          this.router.navigate(['/listarPensamento'])
        })
      }
    }

    cancelarPensamento() {
      this.router.navigate(['/listarPensamento'])
    }
}
