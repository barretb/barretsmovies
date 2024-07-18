import { Genre } from "./genre";

export class Movie{
    public id: string;
    public title: string;
    public posterUrl: string;
    public rating: string;
    public summary: string;
    public duration: string;
    public directors: string[];
    public mainActors: string[];
    public datePublished: string;
    public ratingValue: number;
    public bestRating: number;
    public worstRating: number;
    public writers: string[];
    public genres: Genre[];

    constructor(){
        this.id = "";
        this.title = "";
        this.posterUrl = "";
        this.rating = "";
        this.summary = "";
        this.duration = "";
        this.directors = [""];
        this.mainActors = [""];
        this.datePublished = "";
        this.ratingValue = 0.0;
        this.bestRating = 0.0;
        this.worstRating = 0.0;
        this.writers = [""];
        this.genres = [];
    }
}