## phpFileUpload
> Angular upload function with backend PHP <br/>
> Reference: <br/>
> [php-file-load](https://www.techiediaries.com/php-file-upload-tutorial/) on [github](https://github.com/techiediaries/php-angular-file-upload)
### Version
#### V1.0
> File upload function prototype
#### V1.1
> Supported Image to Base64 convertion
#### V1.2
> Supported upload conditional checking 
#### V1.3
> Supported Angular project deployment

### The major steps of Angular project deployment
> References: <br/>
> https://angular.io/guide/deployment <br/>
> https://ithelp.ithome.com.tw/articles/10205705 <br/>
Step 1:
```js
ng build --prod
```
Step 2:
> Copy '/dist' folder to Server <br/>
Step 3:
> Add '.' in base tag from index.html 
```php
// Original
<base href="/">
// New
<base href="./">
```
Step 4:
> If there is integrity error, add integrity="" in script and link tag in index.html <br/>
> Example
```js
<link rel="stylesheet"
    href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.css"
    integrity="" crossorigin="anonymous">
```
Step 5:
> Creat .htacess file to rediect the server path if there is a routing action <br/>
> For example, if I store '/dist' folder in 'C:\xampp\htdocs\phpFileUpload'
```php
RewriteEngine On
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /phpFileUpload/index.html
```
