import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { SlotType } from '../models/slot-type';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  getSlotName(slotType: SlotType): string {
    return this.dataService.getSlotName(slotType);
  }
}
