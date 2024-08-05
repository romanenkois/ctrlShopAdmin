import { Component, computed, inject, OnInit } from '@angular/core';
import { ImagesService } from './api/images.service';

@Component({
  selector: 'app-images-feed',
  standalone: true,
  imports: [],
  templateUrl: './images-feed.component.html',
  styleUrl: './images-feed.component.scss'
})
export class ImagesFeedComponent implements OnInit {
  private imagesService: ImagesService = inject(ImagesService);

  images = computed(() => this.imagesService.images());

  ngOnInit() {
    this.imagesService.getImagesId();
  }
}
