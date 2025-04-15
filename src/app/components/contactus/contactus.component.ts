import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ContactusComponent {
  technologyFeatures = [
    {
      title: 'AI-Powered Diagnosis',
      icon: 'fa-solid fa-robot',
      color: 'info',
      description: 'Machine learning algorithms predict illnesses based on user-entered symptoms with high accuracy.',
    },
    {
      title: 'Medical Report Analysis',
      icon: 'bi bi-file-medical',
      color: 'warning',
      description: 'Upload and analyze lab reports using NLP to highlight abnormalities clearly and effectively.',
    },
    {
      title: 'Smart Doctor Suggestions',
      icon: 'bi bi-person-check',
      color: 'success',
      description: 'We recommend doctors based on your case, medical history, and location — personalized for you.',
    },
  ];
}
