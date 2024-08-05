import { Component } from '@angular/core';
import { ImagesFeedComponent } from "../../widgets/images-page/images-feed/images-feed.component";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [ImagesFeedComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export default class ImagesComponent {

}
