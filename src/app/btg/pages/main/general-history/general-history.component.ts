import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ResponseTransactions } from '../services/interfaces/response';

@Component({
  selector: 'app-general-history',
  standalone: false,
  templateUrl: './general-history.component.html',
  styleUrl: './general-history.component.scss'
})
export class GeneralHistoryComponent implements OnInit{
  public mainService = inject(UserService);
  public transactions: ResponseTransactions[] = [];
  ngOnInit(): void {

    this.transactionsAlls();
  }

  /**
   * metodo para traer todas las transacciones por el usuario en session
   */
  public transactionsAlls(): void {
    this.mainService.allTransactions()?.subscribe({
      next: (response) => {
        this.transactions = response.filter(
          (value) =>
            value.usuario?._id === localStorage.getItem('idUser')!
        );
      },
    });
  }
}
