import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.scss'
})
export class PopupMessageComponent {
  @Input() isVisible: boolean = false; 
  @Input() message: string = ''; 
  @Input() type: 'success' | 'error' | 'info' = 'info'; 
}
