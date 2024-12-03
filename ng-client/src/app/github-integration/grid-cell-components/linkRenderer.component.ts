import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <a [href]="value" target="_blank">{{ parsedValue }}</a>
  `
})
export class LinkRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  public parsedValue!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    this.parsedValue = new URL(params.value).hostname;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    this.parsedValue = new URL(params.value).hostname;
    return true;
  }
}