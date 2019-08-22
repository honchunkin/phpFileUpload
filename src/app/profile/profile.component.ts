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

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }
  // will be called when a file is selected from interface triggered by the file input file
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
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

  onSubmit() {
    const formData = new FormData();
    // append() to add a key/value pair
    formData.append('avatar', this.form.get('avatar').value);
    console.log(this.form.get('avatar').value);

    this.uploadService.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
