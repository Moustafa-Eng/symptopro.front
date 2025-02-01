import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() closed = new EventEmitter<void>();

  // Close the pop-up
  close(): void {
    this.isVisible = false;
    this.closed.emit();
  }
}
