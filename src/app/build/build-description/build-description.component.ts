import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-build-description',
  templateUrl: './build-description.component.html',
  styleUrls: ['./build-description.component.scss']
})
export class BuildDescriptionComponent implements OnInit {
  name: string;
  description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
