import { Component } from '@angular/core';
import {ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'page-login',
    template: `
    <ion-header>
    <ion-toolbar color="primary">
      <ion-title>
        Description
      </ion-title>
      <ion-buttons start>
        <button ion-button (click)="dismiss()">Cancel</button>
        <button ion-button (click)="SignUp(user.value)" [disabled]="!user.valid">Register</button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content  >
    <form [formGroup]="user" >
        <ion-list>
        <ion-item-divider color="light" >Account</ion-item-divider>
            <ion-item [ngClass]="{'error-border':!user.controls.username.valid && user.controls.username.touched}">
                <ion-label floating>Username</ion-label>
                <ion-input type="text" formControlName="username"></ion-input>
            </ion-item>
            <ion-item *ngIf="user.controls.username.hasError('required') && user.controls.username.touched">
                <p>Sorry, field username is required!</p>
            </ion-item>

            <ion-item [ngClass]="{'error-border':!user.controls.password.valid && user.controls.password.touched}">
                <ion-label floating>Password</ion-label>
                <ion-input type="password" formControlName="password"></ion-input>
            </ion-item>
            <ion-item *ngIf="user.controls.password.hasError('required') && user.controls.password.touched">
                <p>Sorry, field password is required!</p>
        </ion-item>

        <ion-item-divider color="light" >Profiles</ion-item-divider>
         
            <ion-item>
                <ion-label floating>Name</ion-label>
                <ion-input type="text" formControlName="name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label floating>Date of birth</ion-label>
                <ion-input type="text" formControlName="born"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label floating>heigh</ion-label>
                <ion-input type="text" formControlName="heigh"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label floating>weight</ion-label>
                <ion-input type="text" formControlName="weight"></ion-input>
            </ion-item>
        </ion-list>    
    </form>
  </ion-content>
  `
  })

export class ModalContentPage {
    user: FormGroup;
  
    constructor( public viewCtrl: ViewController, public formBuilder: FormBuilder) {
        this.user = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
            password: ['', Validators.compose([Validators.required])],
            name:[''],
            born:[''],
            heigh:[''],
            weight:['']
        });
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }

    SignUp(value:any){
        if(this.user.valid) {
            console.log(value);
        }
    }
  }
