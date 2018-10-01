import { Component, OnInit } from '@angular/core';
import { User } from "../interfaces/user";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: User;
	imageChangedEvent: any = '';
	croppedImage: any      = '';
	picture:any;
	constructor(private userService: UserService,
				private auth:AuthenticationService,
				private storage:AngularFireStorage) {
		this.auth.getStatus()
			.subscribe((status)=>{
				this.userService.getUserById(status.uid)
					.valueChanges()
					.subscribe((usr:User)=>{
						this.user = usr;
					},(e)=>{
						console.log(e);
					});
			},(e)=>{
				console.log(e);
			});
	}

	ngOnInit() {
	}
	edit(){
		if(this.croppedImage){
			const currentPictureId = Date.now();
			const pictures = this.storage.ref('pictures/' + currentPictureId + '.jpg')
								 .putString(this.croppedImage,'data_url');
			pictures
				.then((res)=>{
					this.picture = this.storage
										.ref('pictures/' + currentPictureId + '.jpg')
										.getDownloadURL();
					this.picture.subscribe((image)=>{
						this.userService
							.setAvatar(image,this.user.uid)
							.then(()=>{
								alert('imagen subida correctamente!');
							})
							.catch((e)=>{
								console.log(e);
								alert('algo salio mal al subir img');
							});
					},(e)=>{
						console.log(e);
					})
				})
				.catch((e)=>{
					console.log(e);
				})
		}else{
			this.userService.editUser(this.user)
				.then((res)=>{
					alert('usuario editado');
				}).catch((e)=>{
					alert('error al editar usuario');
					console.log(e);
				});
		}
	}
	fileChangeEvent(event: any): void {
	    this.imageChangedEvent = event;
	}
	imageCropped(image: string) {
	    this.croppedImage = image;
	}
	imageLoaded() {
	    // show cropper
	}
	loadImageFailed() {
	    // show message
	}
}
