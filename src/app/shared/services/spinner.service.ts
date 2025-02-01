import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  showSpinner() {
    this.isLoading.next(true);
  }

  hideSpinner() {
    this.isLoading.next(false);
  }
}
