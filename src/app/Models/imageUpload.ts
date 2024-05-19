export class ImageUpload {

  public imageData: string| null='';
  public imageName: string| null='';

  public getBase64(file: File): void {
    var reader = new FileReader();

    reader.onload = (e:any) => {
      this.imageData = e.target.result as string;
      this.imageName = file.name;
      //console.log(reader.result);

    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
      return error;
    };

    reader.readAsDataURL(file);
  }
}
