import { Component } from '@angular/core';
import {ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

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
                <ion-datetime displayFormat="MM/DD/YYYY" formControlName="born"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label floating>Address</ion-label>
                <ion-input type="text" formControlName="address"></ion-input>
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
  
    constructor(private db:DatabaseProvider, public viewCtrl: ViewController, public formBuilder: FormBuilder) {
        this.user = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
            password: ['', Validators.compose([Validators.required])],
            name:[''],
            born:[''],
            address:[''],
            heigh:[''],
            weight:['']
        });
       
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }

    SignUp(value:any){
        if(this.user.valid) {
            let queryCreateAccount='CREATE TABLE IF NOT EXISTS userAccount(id INTEGER PRIMARY KEY AUTOINCREMENT, username CHAR(30),password CHAR(10))';
            this.db.createTable(queryCreateAccount).then((r)=>{
                let searchQuery = 'SELECT * FROM userAccount WHERE username="'+value.username+'"';
                this.db.searchDB(searchQuery).then((rr)=>{
                    if(rr==null){
                        let queryAccount = 'INSERT INTO userAccount(username,password) VALUES(?,?)';
                        let Accountvalues = [value.username,value.password];
                        this.db.addItem(queryAccount,Accountvalues).then((rrr)=>{
                            this.registerHandle(value);
                        })
                    }else{
                        this.registerHandle(value);                        
                    }
                 });
            });   
        }
    }

    registerHandle(value){
        let queryCreateProfile='CREATE TABLE IF NOT EXISTS userProfile(id INTEGER PRIMARY KEY AUTOINCREMENT, username CHAR(30) NOT NULl, name CHAR(30), born DATE, address TEXT, height INTEGER, weight INTEGER, FOREIGN KEY (username) REFERENCES userAccount(username))';
        this.db.createTable(queryCreateProfile).then((rrrr)=>{
            let queryProfile='INSERT INTO userProfile(username,name,born,address,height,weight) VALUES(?,?,?,?,?,?)';
            let Profilevalues=[value.username,value.born,value.address,value.height,value.weight];
            this.db.addItem(queryProfile,Profilevalues).then((rrrrr)=>{
                console.log('success');
            },(e) =>{
                console.log("Error :  " + JSON.stringify(e.err));
            })
        });
    }
  }
