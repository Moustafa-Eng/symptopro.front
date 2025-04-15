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
    { name: 'Mustafa', role: 'Full Stack Developer', bio: 'mustafakhaledmah@gmail.com' },
    { name: 'Ziad', role: 'Front-end Developer', bio: 'Passionate about creating intuitive user interfaces.' },
    { name: 'Andre', role: 'Team Lead', bio: 'Experienced in leading cross-functional teams.' },
    { name: 'Nourhan', role: 'Front-end Developer', bio: 'Focused on responsive and accessible design.' },
    { name: 'Fady', role: 'AI/ML Developer', bio: 'Specializes in machine learning models for healthcare.' },
    { name: 'Mohammed', role: 'Database Designer', bio: 'Expert in database optimization and architecture.' },
    { name: 'Omer', role: 'UI/UX Designer', bio: 'Crafting seamless user experiences.' },
  ];
}
