import { Component } from '@angular/core';
import { MovieApiService } from '../services/movieapiservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent {
  constructor(protected movieApiService: MovieApiService) {
    if (movieApiService.genres.length === 0) {
      movieApiService.getGenres(1, 100);
    }
  }

  selectGenre(genre: string | null) {
    this.movieApiService.changeGenre(genre);
  }
}
