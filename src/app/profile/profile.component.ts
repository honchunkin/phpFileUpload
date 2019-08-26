import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // a form instance of FormGroup and uploadResponse object that will hold the response
  form: FormGroup;
  uploadResponse;

  public base64textString: String = "";
  public convertedImage = '';
  isMime: boolean;
  isSize = false;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  get avatar() {
    return this.form.get('avatar');
  }
  // will be called when a file is selected from interface triggered by the file input file
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatar.setValue(file);
      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.convertedImage = 'data:image/jpeg;base64,' + this.base64textString;
    console.log(btoa(binaryString));
  }

  get checkMIME() {
    // check MIME type
    if (this.avatar.value.size > 0) {
      switch (this.avatar.value.type) {
        case 'image/png': {
          this.isMime = true;
          break;
        }
        case 'image/jpeg': {
          this.isMime = true;
          break;
        }
        case 'image/gif': {
          this.isMime = true;
          break;
        }
        case 'image/png': {
          this.isMime = true;
          break;
        }
        case 'application/pdf': {
          this.isMime = true;
          break;
        }
        default: this.isMime = false;
      }
      if (this.isMime === false) {
        return true;
      }
    } else {
      return false;
    }
  }

  get checkSize() {
    if (this.avatar.value.size > 0) {
      if (this.avatar.value.size <= 5242880) {
        this.isSize = true;
      } else {
        this.isSize = false;
        return true;
      }
    } else {
      return false;
    }
  }

  onSubmit() {
    const formData = new FormData();
    // append() to add a key/value pair
    formData.append('avatar', this.avatar.value);
    console.log(this.avatar.value);
    console.log(this.avatar.value.type);

    /**
     * Limit file size to 5 MB
     * Limit file type to PDF, PNG, GIF, JPG/JPEG
    */

    if ((this.isMime === true) && (this.isSize === true)) {
      this.uploadService.uploadFile(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
          console.log(res);
          window.alert('upload success');
        },
        (err) => {
          console.log(err);
          window.alert('upload failed');
        }
      );
    } else {
      window.alert('Fail to upload ');
      return;
    }
  }

}
