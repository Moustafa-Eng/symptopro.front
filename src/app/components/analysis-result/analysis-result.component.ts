import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalReportService } from '../../core/services/medical-report.service';
import { AnalysisCbcResult } from '../../core/interfaces/analysis-result';
import { GoBackComponent } from "../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-analysis-result',
  standalone: true,
  imports: [GoBackComponent],
  templateUrl: './analysis-result.component.html',
  styleUrl: './analysis-result.component.scss'
})
export class AnalysisResultComponent {
  result$: Observable<AnalysisCbcResult | null>;
  resultToView : string = '';
  constructor(private medicalReportService: MedicalReportService) {
    this.result$ = this.medicalReportService.analysisResult$; // Subscribe to observable
    this.result$.subscribe(result => {
      if (result) {
        this.resultToView = result.analysisResult;
      }
    });
  }
}
