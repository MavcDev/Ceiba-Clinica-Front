import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { MessageBoxYesNotComponent } from './components/message-box-yes-not/message-box-yes-not.component';

@NgModule({
  declarations: [
    MessageBoxComponent,
    MessageBoxYesNotComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [MessageBoxComponent, MessageBoxYesNotComponent]
})
export class ToolModule { }
