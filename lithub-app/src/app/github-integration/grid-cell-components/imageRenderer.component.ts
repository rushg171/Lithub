import { Component } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-logo-renderer',
    standalone: true,
    template: `
        <span :class="imgSpanLogo">
            @if (value) {
                <a [href]="ownerUrl" target="_blank">
                <img
                    [alt]="name"
                    [src]="value"
                    [height]="30"
                    :class="logo"
                />
                </a>
            }
        </span>
    `,
})
export class LogoRenderer implements ICellRendererAngularComp {
    // Init Cell Value
    public value!: string;
    public name!: string;
    public ownerUrl!: string;
    agInit(params: ICellRendererParams): void {
        this.refresh(params);
    }

    // Return Cell Value
    refresh(params: ICellRendererParams): boolean {
        this.value = params.data.avatarUrl;
        this.name = params.data.name;
        this.ownerUrl = params.data.ownerUrl;
        return true;
    }
}