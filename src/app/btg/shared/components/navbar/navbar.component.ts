import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() textBtn!: string;
  @Input() isLogin!: boolean;
  @Input() userName!: string;
  @Input() monto!: number;
  @Output() actionBtnOut: EventEmitter<string> = new EventEmitter<string>();


  /**
   * metodo para disparar un emit de un @output en el componente que lo necesite
   * @param value 
   */
  actionBtn(value: boolean): void {
    this.actionBtnOut.emit();
  }

  
}
