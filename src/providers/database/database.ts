import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  constructor(private platform: Platform, private sqlite: SQLite, public sqlitePorter: SQLitePorter,public http: Http) {
    console.log('Hello DatabaseProvider Provider');
    platform.ready().then(() => {
      this.sqlite.create({
        name: 'fitness.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS userAccount(CREATE TABLE IF NOT EXISTS userAccount(id Integer NOT NULL PRIMARY KEY AUTO_INCREMENT, username CHAR(30),password CHAR(10)))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
    
        });
    });

  }

  public getDB(tableName){
    let data = [];
    this.database.executeSql('SELECT * FROM '+tableName,[]).then((r)=>{
      if(r.rows.length > 0){
        for(var i=0;i < r.rows.length;i++){
          data.push(r.rows.item(i));
        }
      }
      console.log(data);
    },(e)=>{
      console.log('Error' + JSON.stringify(e));
    });
  }

  public addItem(query,values,tableName) {
    this.database.executeSql(query,values).then((data) => {
        console.log("Success");
        this.getDB(tableName);
    }, (e) => {
        console.log("Error :  " + JSON.stringify(e.err));
    });
}

}
