import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  teamMembers = [
    { name: 'John Doe', role: 'CEO', bio: 'Healthcare visionary with 15+ years experience' },
    { name: 'Jane Smith', role: 'Lead Doctor', bio: 'Board-certified physician in internal medicine' },
    { name: 'Mike Johnson', role: 'Tech Lead', bio: 'Healthcare technology expert' }
  ];
}
