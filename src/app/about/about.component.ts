import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  authorTitle = 'Autor';
  authorName = 'Ing. Zdeněk Bárnet';
  authorEmail = 'Email: zdenek.barnet@seznam.cz';
  descriptionTitle = 'Devstack';
  descriptionContent = 'Angular8 + Angular Material + Java Spring server + PostgreSQL';

  constructor() { }

  ngOnInit() {
  }

}
