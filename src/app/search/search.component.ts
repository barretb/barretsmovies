import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenresComponent } from '../genres/genres.component';
import { MovieApiService } from '../services/movieapiservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { debounceTime, fromEvent, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [GenresComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy{
  private searchSubject = new Subject<string>();
  public searchText:string = '';

  constructor(protected movieApiService: MovieApiService) {
    if (movieApiService.movies.length === 0) {
      movieApiService.getMovies(null, null);
    }
  }

  ngOnInit(){
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {   
        this.movieApiService.currentTitleFilter = searchValue;
        this.movieApiService.getMovies(null, null);
    })
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  search() {
    this.searchSubject.next(this.searchText);
  }

  goToNextPage(){
    this.movieApiService.getMovies(this.movieApiService.currentPage+1, 25);
  }

  goToPrevPage(){
    this.movieApiService.getMovies(this.movieApiService.currentPage-1, 25);
  }


}