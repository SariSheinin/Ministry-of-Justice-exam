import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RequestModule { }

export interface Request {
   id?: number;
   name: string;
   subject: string;
   content?: string;
   createdAt?: string;
}
