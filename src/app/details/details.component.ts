import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieApiService } from '../services/movieapiservice';
import { CommonModule } from '@angular/common';
import { UserRatingService } from '../services/userratingservice';
import { FormsModule } from '@angular/forms';
import { RuntimeTransform } from '../helpers/runtimetransform';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RuntimeTransform],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  public selectedMovieId: string;
  public movieDetails: Movie;
  public myRating: number = 0;
  public userRatings: any = [
    {
      value: 0,
      text: 'Not Rated',
    },{
      value: 1,
      text: '1',
    },{
      value: 2,
      text: '2',
    },{
      value: 3,
      text: '3',
    },{
      value: 4,
      text: '4',
    },{
      value: 5,
      text: '5',
    },{
      value: 6,
      text: '6',
    },{
      value: 7,
      text: '7',
    },{
      value: 8,
      text: '8',
    },{
      value: 9,
      text: '9',
    },{
      value: 10,
      text: '10',
    }
  ];

  constructor(
    protected movieApiService: MovieApiService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected userRatingService: UserRatingService
  ) {
    this.selectedMovieId = this.route.snapshot.params['id'];
    this.movieDetails = new Movie();
    movieApiService.getMovieDetails(this.selectedMovieId).then((result) => {
      this.movieDetails = result;
    });
    this.getMyRating();
  }

  loadGenre(genreName: string) {
    this.movieApiService.currentGenre = genreName;
    this.movieApiService.getMovies(null);
    this.router.navigate(['']);
  }

  getMyRating() {
    this.myRating = this.userRatingService.getRating(this.selectedMovieId);
  }

  setMyRating(event: any) {
    this.userRatingService.setRating(this.selectedMovieId, this.myRating);
  }
}
