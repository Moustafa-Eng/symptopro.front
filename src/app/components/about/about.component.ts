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
    { name: 'Mustafa', role: 'Full Stack Developer', bio : 'mustafakhaledmah@gmail.com' },
    { name: 'Ziad', role: 'front-end developer' },
    { name: 'Andre ', role: 'Team Lead' },
    { name: 'Nourhan', role: 'front-end developer' },
    { name: 'Fady', role: 'Ai/Ml Developer' },
    { name: 'Mohammed', role: 'Database designer' },
    { name: 'Omer', role: 'UI&UX Designer' }

  ];
}
