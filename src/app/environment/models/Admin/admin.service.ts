import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../api';

type uploadMoview = {
  name: string,
  category: string,
  yearOfRelease: number,
  availablityStarts: string,
  description: string,
  isFeatured: boolean,
  contentPath: string,
  moviePoster: string
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'  // Example header
    })
  };

  uploadMovie(object: uploadMoview) {
    const url = api.Admin.uploadMovies;
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('accept', '*/*');
    headers.append('Content-Type', 'application/json');
    const formData = new FormData();

    formData.append('Name', object.name);
    formData.append('Category', object.category);
    formData.append('Yearofrelease', object.yearOfRelease.toString());
    formData.append('AvailabilityStates', object.availablityStarts);
    formData.append('Description', object.description);
    formData.append('IsFeatured', object.isFeatured.toString());
    formData.append('ContentPath', object.contentPath);
    formData.append('MoviePosterBase64String', object.moviePoster);


    return this._http.post(url, formData, { headers: headers })
  }
}
