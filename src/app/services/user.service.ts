import { Injectable } from '@angular/core';
import { User } from "../interfaces/user";
import {AngularFireDatabase} from "angularfire2/database";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  	constructor(private angularFireDataBase: AngularFireDatabase) {

  	}
  	getUsers(){
  		return this.angularFireDataBase.list('/users');
  	}
  	getUserById(uid){
  		return this.angularFireDataBase.object('/users/'+ uid);
  	}
  	createUser(user){
  		return this.angularFireDataBase.object('/users/'+user.uid).set(user);
  	}
  	editUser(user){
  		return this.angularFireDataBase.object('/users/'+user.uid).set(user);
  	}
  	add(user: User) {
	    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
	  }
    setAvatar(avatar, uid){
      return this.angularFireDataBase.object('/users/' + uid + '/avatar').set(avatar);
    }
}
