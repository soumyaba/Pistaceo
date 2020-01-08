import { Component, Input, Output, EventEmitter, ElementRef, AfterContentInit, OnChanges } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the SignaturePadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var require: any;

export interface Point {
  x: number;
  y: number;
  time: number;
}

export type PointGroup = Array<Point>;
@Component({
  selector: 'signature-pad',
  template: '<canvas id="mycanvas" style="border: 1px solid #ddd;"></canvas>',
})
export class SignaturePadComponent implements AfterContentInit, OnChanges {
  @Input() public options: Object;
  @Input() public canvasWidth: any;
  @Input() public canvasHeight: any;
  @Output() public onBeginEvent: EventEmitter<boolean>;
  @Output() public onEndEvent: EventEmitter<boolean>;
  @Input() public backgroundImages: any[];
  @Input() public disabled: any;
  private signaturePad: any;
  private elementRef: ElementRef;
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.options = this.options || {};
    this.onBeginEvent = new EventEmitter();
    this.onEndEvent = new EventEmitter();
  }
  public ngAfterContentInit(): void {
    const sp: any = require('signature_pad')['default'];
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    const ctx = canvas.getContext('2d');
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      canvas.zoom = 2;
    this.signaturePad = new sp(canvas, this.options);
    this.signaturePad.onBegin = this.onBegin.bind(this);
    this.signaturePad.onEnd = this.onEnd.bind(this);
    if (this.disabled === 'readonly' ) {
     this.signaturePad.off();
    }
    // console.log(this.backgroundImages);
    if(this.backgroundImages !== undefined) {
      if(this.backgroundImages.length > 0) {
    this.fromDataURL(this.backgroundImages);
      }
    };
    // this.resizeCanvas();

  }
  ngOnChanges() {
    if(this.signaturePad !== undefined && this.backgroundImages !== undefined) {
      if(this.backgroundImages.length > 0) {
  this.fromDataURL(this.backgroundImages);
  if (this.disabled === 'readonly' ) {
    this.signaturePad.off();
   } else {
     this.signaturePad.on();
   }
      }
    }

  }

  public resizeCanvas(): void {
    // const ratio: number = Math.max(window.devicePixelRatio || 1, 1);
    // const canvas: any = this.signaturePad._canvas;

    // let canvas = document.querySelector('canvas');
    let canvas = this.signaturePad._canvas;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // canvas.getContext('2d').scale(ratio, ratio);
    // this.signaturePad.set('minWidth', 1);
    // this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    // this.signaturePad.set('canvasHeight', canvas.offsetHeight);
    this.fromDataURL(this.backgroundImages);
    this.signaturePad.clear();
  }

  public toData(): Array<PointGroup> {
    return this.signaturePad.toData();
  }

  public fromData(points: Array<PointGroup>): void {
    this.signaturePad.fromData(points);
  }
  public toDataURL(imageType?: string, quality?: number): string {
    return this.signaturePad.toDataURL(imageType, quality);
  }

  public fromDataURL(backgroundImages): void {
    let imageUrl = '';
    for (let index = backgroundImages.length ; index > 0; index--) {
      imageUrl = imageUrl + `url(${backgroundImages[index - 1].url})`;
      if (index - 1 > 0) {
        imageUrl  = imageUrl + ',';
      }
    }
   const width = this.canvasWidth + 'px';
   const height = this.canvasHeight + 'px';
    this.signaturePad.canvas.style.backgroundImage = imageUrl;
    this.signaturePad.canvas.style.backgroundSize = width, height;
    this.signaturePad.canvas.style.backgroundRepeat = 'no-repeat';
    // this.signaturePad.penColor = "#246275";
    this.signaturePad.maxWidth = 1.3;
  }


  public clear(): void {
    this.signaturePad.clear();
  }

  public isEmpty(): boolean {
    return this.signaturePad.isEmpty();
  }

  // Unbinds all event handlers
  public off(): void {
    this.signaturePad.off();
  }

  public on(): void {
    this.signaturePad.on();
  }

  public set(option: string, value: any): void {

    switch (option) {
      case 'canvasHeight':
        this.signaturePad._canvas.height = value;
        break;
      case 'canvasWidth':
        this.signaturePad._canvas.width = value;
        break;
      default:
        this.signaturePad[option] = value;
    }
  }

  // notify subscribers on signature begin
  public onBegin(): void {
    this.onBeginEvent.emit(true);
  }

  // notify subscribers on signature end
  public onEnd(): void {
    this.onEndEvent.emit(true);
  }
}
