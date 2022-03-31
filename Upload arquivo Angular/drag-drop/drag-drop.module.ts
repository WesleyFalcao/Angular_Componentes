import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropDirective } from './drag-drop.directive';

@NgModule({
    declarations: [
        DragDropDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        DragDropDirective
    ]
})
export class DragDropModule { }
