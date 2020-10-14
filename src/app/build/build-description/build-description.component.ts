import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-build-description',
  templateUrl: './build-description.component.html',
  styleUrls: ['./build-description.component.scss']
})
export class BuildDescriptionComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor() { }

  ngOnInit(): void {

  }

  get name(): AbstractControl {
    return this.parentForm.controls.name;
  }

  get description(): AbstractControl {
    return this.parentForm.controls.description;
  }
}
