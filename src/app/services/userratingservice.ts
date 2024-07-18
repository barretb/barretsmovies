import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserRatingService {
  getRating(id: string): number {
    const rating = window.localStorage.getItem(id);
    if (rating === null || rating === undefined) {
      return 0;
    } else {
      return +rating;
    }
  }

  setRating(id: string, value: number){
    window.localStorage.setItem(id, value.toString());
  }
}
