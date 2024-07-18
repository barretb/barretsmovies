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
  public pageSize:number = 25;
  public pageSizes:number[] = [10,25,50,100,1000];

  constructor(protected movieApiService: MovieApiService) {
    if (movieApiService.movies.length === 0) {
      movieApiService.getMovies(null);
    }
  }

  ngOnInit(){
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {   
        this.movieApiService.currentTitleFilter = searchValue;
        this.movieApiService.getMovies(null);
    })
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  pageSizeChange(newValue:any) {
    this.movieApiService.changePageSize(this.pageSize);
  }

  search() {
    this.searchSubject.next(this.searchText);
  }

  goToNextPage(){
    this.movieApiService.getMovies(this.movieApiService.currentPage+1);
  }

  goToPrevPage(){
    this.movieApiService.getMovies(this.movieApiService.currentPage-1);
  }


}
