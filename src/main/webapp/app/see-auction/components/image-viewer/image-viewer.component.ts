import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  @Input() images: string[];
  public config = {
    btnClass: 'default', // The CSS class(es) that will apply to the buttons
    zoomFactor: 0.1, // The amount that the scale will be increased by
    containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
    wheelZoom: true, // If true, the mouse wheel can be used to zoom in
    allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to enter fullscreen mode
    allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
    btnIcons: {
      // The icon classes that will apply to the buttons. By default, font-awesome is used.
      zoomIn: 'fa fa-plus',
      zoomOut: 'fa fa-minus',
      rotateClockwise: 'fa fa-redo',
      rotateCounterClockwise: 'fa fa-undo',
      next: 'fa fa-arrow-right',
      prev: 'fa fa-arrow-left',
      fullscreen: 'fa fa-arrows-alt',
    },
    btnShow: {
      zoomIn: true,
      zoomOut: true,
      rotateClockwise: true,
      rotateCounterClockwise: true,
      next: true,
      prev: true,
    },
  };

  constructor() {
    this.images = [];
  }
  ngOnInit(): void {}
}
