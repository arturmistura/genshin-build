import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Weapon } from 'src/app/models/weapon';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-build-weapon',
  templateUrl: './build-weapon.component.html',
  styleUrls: ['./build-weapon.component.scss']
})
export class BuildWeaponComponent implements OnInit {
  @Input() parentForm: FormGroup;

  weapons: Weapon[];
  selectedIndex = -1;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.parentForm.get('character').valueChanges.subscribe(character => {
      this.dataService.getWeapons().subscribe(weapons => {
        this.weapons = weapons.filter(weapon => weapon.weaponType === character.weaponType);
      });
    });
  }

  selectWeapon(weapon: Weapon, index: number): void {
    this.selectedIndex = index;
    this.parentForm.patchValue({
      weapon
    });
  }
}
