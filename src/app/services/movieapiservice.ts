// Axios wrapper adapted from https://gist.github.com/santospatrick/752a605dca66cbbdba5abf62c6cfcd74 for the token and error handling blocks

import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { GenreStats } from '../models/genrestats';

export interface MoviesResponse {
  data: Movie[];
  totalPages: number;
}

export interface MoviesByGenreResponse {
  data: Genre[];
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private service: AxiosInstance;

  public movies: Movie[];
  public currentPage: number;
  public pageSize: number;
  public totalPages: number;
  public totalResults: number;
  public currentGenre: string | null;
  public currentTitleFilter: string | null;
  public genres: Genre[];
  

  constructor() {
    const baseUrl = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';
    const token = window.localStorage.getItem('token');
    const service = axios.create({
      baseURL: baseUrl,
      headers: token ? { Authorization: 'Bearer ' + token } : {},
    });

    service.interceptors.response.use(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    );
    this.service = service;

    this.movies = [];
    this.currentPage = 0;
    this.pageSize = 25;
    this.totalPages = 0;
    this.totalResults = 0;
    this.currentGenre = null;
    this.currentTitleFilter = null;
    this.genres = [];
  }

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  handleError(error: AxiosError) {
    switch (error.response?.status) {
      case 401:
      case 403:
        //Token expired or invalid
        delete this.service.defaults.headers['Authorization'];
        window.localStorage.removeItem('token');

        this.service.get('/auth/token').then((response) => {
          window.localStorage.setItem('token', response.data.token);
          this.service.defaults.headers['Authorization'] =
            'Bearer ' + response.data.token;
          window.location.reload();
        });
        break;
      default:
        alert('Unknown error');
        break;
    }
  }

  getMovies(page: number | null) {
    if (page === null || page <= 0) page = 1;

    this.service
      .get<MoviesResponse>('/movies', {
        params: {
          page,
          limit : this.pageSize,
          search : this.currentTitleFilter,
          genre : this.currentGenre,
        },
      })
      .then((response) => {
        this.currentPage = page;
        this.totalPages = response.data.totalPages;
        this.movies = response.data.data;

        if (this.totalPages > 1) {
          //kludge fix total results count
          this.service
            .get<MoviesResponse>('/movies', {
              params: {
                page: this.totalPages,
                limit : this.pageSize,
                search : this.currentTitleFilter,
                genre : this.currentGenre,
              },
            })
            .then((countResponse) => {
              this.totalResults =
                countResponse.data.data.length + (this.totalPages - 1) * this.pageSize;
            });
        } else {
          this.totalResults = response.data.data.length;
        }
      });
  }

  getGenres(page: number | null, limit: number | null) {
    if (page === null || page <= 0) page = 1;
    if (limit === null || limit <= 0) limit = 25;

    this.service
      .get<MoviesByGenreResponse>('/genres/movies', {
        params: {
          page,
          limit,
        },
      })
      .then((response) => {
        this.genres = response.data.data;
        this.genres.forEach(element => {
          this.service.get<GenreStats>('/movies/genres/' + element.id)
            .then((result)=>{
              element.totalMovies = result.data.totalMovies;
            })
        });
      });
  }

  getMovieDetails(id: string): Promise<Movie> {
    return this.service.get<Movie>('/movies/' + id).then((result) => {
      return result.data as Movie;
    });
  }

  changeGenre(genre: string | null) {
    this.currentGenre = genre;
    this.currentPage = 1;
    this.getMovies(null);
  }

  changePageSize(newSize: number | null){
    if(newSize === null){
      this.pageSize = 25;
    } else {
      this.pageSize = newSize;
    }
    this.getMovies(null);
  }
}
