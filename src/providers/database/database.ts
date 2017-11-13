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
        .then((database: SQLiteObject) => {
          this.database=database;    
        });
    });


  }


  public createTable(Query){
    return  this.database.executeSql(Query, {})
    .then((r) => {return r
    },(e)=>{
      return e;
    })
  }


  public getDB(tableName){
    let data = [];
    return this.database.executeSql('SELECT * FROM '+tableName,[]).then((r)=>{
      if(r.rows.length > 0){
        for(var i=0;i < r.rows.length;i++){
          data.push(r.rows.item(i));
        }
      }
      return data;
    },(e)=>{
      return e;
    });
  }

  public searchDB(Query){
    let data=[];
    return this.database.executeSql(Query,[]).then((r)=>{
      console.log(r);
      if (r.rows.length >0){
        for (var i=0;i<r.rows.length;i++){
          data.push(r.rows.item(i));
        }
      }else{
        data=null;
      }
      return data;
    },(e)=>{
      return e;
    })
  }

  public addItem(query,values) {
     return this.database.executeSql(query,values).then((data) => { 
        return data;
      }, (e) => {
        return e;
    });
  }

  public clearDB(query){
    return this.database.executeSql(query,[]).then((r)=>{
      return r;
    },(e)=>{
      return e;
    });
  }

}
