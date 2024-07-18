# Barret's Movies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0. It's an Angular demo project built off the Angular router template. Not intended to be anything real, just a simple demo of Angular hitting an API.

## Interesting tidbits

This hits against a [movies API](https://github.com/thisdot/movies-api), but the API has a couple of quirks. You get paged results and the number of pages, but it doesn't tell you the actual number of results. So in my MovieApiService, I kludged in a hack to retrieve the last page of results, then calculate the total number of results based on page size, number of pages, and number of results on the last page. Not great, and it doubles the number of search calls to the API, but it gets the value. Without access to update the API server, it's the best workaround I could think of.

Another quirk is that it if you search by title and only send a single character, it doesn't appear to apply that filter at all to the result set, so you get the full results list. Two or more characters is fine. Not much I can do there, though. I did make sure to add a debounce so it doesn't make a search call for every character typed to minimize API hits.

I made sure my service handles 401/403 responses to get an updated auth token as the API requires an auth token to hit the end points. 

One really cool thing I added was a user rating service so that the user can add their own rating to a movie. It only saves to local storage at the moment, but a full app would store it back to the API and let that alter the overall rating of the movie.


## Future ideas

- Next I'd probably create a new API service to address the above quirks. A few things this would enable:
  - Ability to filter by rating
  - ability to search by actor/director/writer
  - Ability to save, utilize user ratings
  - ability to allow users to write reviews
- Additional error handling for 400/500 errors


## Standard Angular stuff

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Only the default tests have been created. 

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

