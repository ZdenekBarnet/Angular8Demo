import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop-schematics',
  templateUrl: './drag-drop-schematics.component.html',
  styleUrls: ['./drag-drop-schematics.component.css'],
})
export class DragDropSchematicsComponent {
  todo = [
    'Jít do práce',
    'Zaběhat si',
    'Navečeřet se',
    'Jít spát'
  ];

  done = [
    'Vstát z postele',
    'Vyčistit zuby',
    'Osprchovat se',
    'Zkontrolovat e-maily',
    'Nasnídat se'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
