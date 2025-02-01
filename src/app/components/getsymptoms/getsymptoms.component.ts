import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { PredictionsService } from './../../core/services/predictions.service';
import { Router } from '@angular/router';
import { GoBackComponent } from '../../shared/components/go-back/go-back.component';

@Component({
  selector: 'app-getsymptoms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, GoBackComponent],
  templateUrl: './getsymptoms.component.html',
  styleUrl: './getsymptoms.component.scss'
})
export class GetsymptomsComponent {
  getsymptomsForm!: FormGroup;
  result: string | null = null;
  description: string  = '';
  precaution: string  = '';
  searchText: string = '';
  filteredSymptoms: string[] = [];
  selectedSymptoms: Set<string> = new Set();

  // List of all symptoms
  allSymptoms = ['itching' ,'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing',
    'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity',
    'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition',
    'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety',
    'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness',
    'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough',
    'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration',
    'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea',
    'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation',
    'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
    'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
    'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise',
    'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
    'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain',
    'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
    'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain'  ,
    'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
    'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid',
    'brittle_nails', 'swollen_extremeties', 'excessive_hunger',
    'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech' , 
    'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck',
    'swelling_joints', 'movement_stiffness', 'spinning_movements',
    'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
    'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
    'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching',
    'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain',
    'altered_sensorium', 'red_spots_over_body', 'belly_pain',
    'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes',
    'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum',
    'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
    'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma',
    'stomach_bleeding', 'distention_of_abdomen',
    'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum',
    'prominent_veins_on_calf', 'palpitations', 'painful_walking',
    'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
    'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails',
    'blister', 'red_sore_around_nose', 'yellow_crust_ooze'];

  constructor(private fb: FormBuilder, private predictionsService: PredictionsService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.filteredSymptoms = [...this.allSymptoms]; // Initially show all symptoms
  }
  

  initializeForm() {
    this.getsymptomsForm = this.fb.group({
      symptoms: ['', Validators.required], // Input field for symptoms
    });
  }
  
  createBinaryArray(selectedSymptoms: string[]): number[] {
    return this.allSymptoms.map((symptom) => (selectedSymptoms.includes(symptom) ? 1 : 0));
  }
  

  filterSymptoms(): void {
    const minLength = 1; // Minimum characters required for searching
  
    if (!this.searchText.trim()) {
      // If the search box is empty, show all symptoms
      this.filteredSymptoms = [...this.allSymptoms];
    } else if (this.searchText.trim().length < minLength) {
      // If the search text is too short, clear the filtered list
      this.filteredSymptoms = [];
    } else {
      // Perform the filtering for valid input
      this.filteredSymptoms = this.allSymptoms.filter((symptom) =>
        symptom.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  
  toggleSymptom(symptom: string): void {
    if (this.selectedSymptoms.has(symptom)) {
      this.selectedSymptoms.delete(symptom); // Deselect
    } else {
      this.selectedSymptoms.add(symptom); // Select
    }
  }
  

  clearAll(): void {
    this.selectedSymptoms.clear();
    this.searchText = '';
    this.filteredSymptoms = [];
  }


  onSubmit(): void {
    if (this.selectedSymptoms.size > 0) {
      const binaryArray = this.createBinaryArray([...this.selectedSymptoms]);
      console.log(binaryArray);
      this.predictionsService.getPredictions({ data: binaryArray });
      this.clearAll();
      this.router.navigate(['/prediction-result']); // Navigate to the result page
    }

  }
}
