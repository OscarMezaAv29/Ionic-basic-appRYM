import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileId: string = '';
  character: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
  if (idParam !== null) {
    this.profileId = idParam;
    this.http.get<any>('https://rickandmortyapi.com/api/character/' + this.profileId)
    .subscribe(res => this.character = res);
  } else {
    // Manejar el caso en el que 'id' sea nulo, por ejemplo, mostrar un mensaje de error o redirigir a otra página.
  }
}

translateStatusOrSpecies(value: string, property: string): string {
  if (property === 'status') {
    if (value === 'Alive') {
      return 'Vivo';
    } else if (value === 'unknown') {
      return 'Desconocido';
    } else if (value === 'Dead') {
      return 'Muerto';
    }
    return value;
  } else if (property === 'species') {
    if (value === 'Human') {
      return 'Humano';
    }
    return value;
  } else if (property === 'gender') {
    if (value === 'Male') {
      return 'Masculino';
    } else if (value === 'Female') {
      return 'Femenino';
    }
    return value;
  } 
  return value;
}
}