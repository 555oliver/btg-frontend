import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ResponseFunds } from '../services/interfaces/response';

@Component({
  selector: 'app-fund-register',
  standalone: false,
  templateUrl: './fund-register.component.html',
  styleUrl: './fund-register.component.scss'
})
export class FundRegisterComponent implements OnInit{

  public mainService = inject(UserService);
  public funds: ResponseFunds[] = [];

  ngOnInit(): void {
    this.fundsAlls()
  }

  /**
   * metodo para traer todos los fondos
   */
  public fundsAlls(): void{
    this.mainService.fundsAll()?.subscribe({
      next: (response => this.funds = response)
    })
  }

}
