import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MindfulBitesComponent } from './ui/pages/mindful-bites/mindful-bites.component';
import { MindfulBitesUsecase } from './domain/usecase/mindful-bites.usecase';
import { MindfulBitesGateway } from './domain/gateway/mindful-bites.gateway';
import { MindfulBitesService } from './infraestructure/driven-adapter/mindful-bites.service';


@NgModule({
  declarations: [
    MindfulBitesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    MindfulBitesUsecase,
    {
      provide: MindfulBitesGateway,
      useClass: MindfulBitesService,
    },
  ]
})
export class ProfileModule { }
