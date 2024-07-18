import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieApiService } from '../services/movieapiservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  public selectedMovieId: string;
  public movieDetails: Movie;

  constructor( protected movieApiService: MovieApiService,
    protected route: ActivatedRoute, protected router: Router){
      this.selectedMovieId = this.route.snapshot.params['id'];
      this.movieDetails = new Movie();
      movieApiService.getMovieDetails(this.selectedMovieId).then((result) => {
        this.movieDetails = result;
      });
    }

    loadGenre(genreName: string){
      this.movieApiService.currentGenre = genreName;
      this.movieApiService.getMovies(null, null);
      this.router.navigate(['']);
    }
}
