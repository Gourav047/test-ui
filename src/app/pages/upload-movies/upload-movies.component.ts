import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/environment/models/Admin/admin.service';
import { AccountService } from 'src/app/environment/models/account/account.service';
import { tosterFunction } from '../../util/utilities'
import * as moment from 'moment';

@Component({
  selector: 'app-upload-movies',
  templateUrl: './upload-movies.component.html',
  styleUrls: ['./upload-movies.component.scss']
})
export class UploadMoviesComponent {

  isLogin: boolean = true;
  uploadForm: any;
  indeterminate: boolean = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled: boolean = false;
  checked: boolean = false;
  showImage: boolean = false;
  imageUrl: string = '';

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _adminService: AdminService
  ) {
    this.setForm();
  }

  ngOnInit() {

  }

  setForm() {
    this.uploadForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      yearOfRelease: new FormControl('', Validators.required),
      availablityStarts: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isFeatured: new FormControl(false, Validators.required),
      contentPath: new FormControl('', Validators.required),
      moviePoster: new FormControl('', Validators.required)
    })
  }


  logout() {
    this._accountService.set(false);
    this._router.navigate(['/login']);
  }

  upload() {
    console.log(this.uploadForm);
    let uploadObject = {
      name: this.uploadForm.value.name,
      category: this.uploadForm.value.category,
      yearOfRelease: this.uploadForm.value.yearOfRelease,
      availablityStarts: moment(this.uploadForm.value.availablityStarts).format('YYYY-MM-DD hh:mm:ss'),
      description: this.uploadForm.value.description,
      isFeatured: this.checked,
      contentPath: this.uploadForm.value.contentPath,
      moviePoster: this.uploadForm.value.moviePoster
    }
    this._adminService.uploadMovie(uploadObject).subscribe(res => {
      if (res) {
        tosterFunction("sucess", "Added Sucessfully");
        this.navigate('dashboard');
      } else {
        tosterFunction("error", "Something went wrong");
      }
    })

  }

  onFileSelected(event: any): void {
    const selectedFile: File = event.target.files[0];
    console.log(event.target.files)
    if (selectedFile) {
      this.showImage = true;
      this.imageUrl = URL.createObjectURL(selectedFile);
      this.uploadForm.patchValue({ contentPath: this.imageUrl });
      this.convertToBase64(selectedFile)
        .then(base64String => {
          this.uploadForm.patchValue({ moviePoster: base64String });
        })
        .catch(error => {
          console.error('Error converting to base64:', error);
        });
    }
    console.log(this.uploadForm)
  }

  async convertToBase64(file: File): Promise<any> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  navigate(val:string){
    this._router.navigate([`/${val}`])
  }
}

