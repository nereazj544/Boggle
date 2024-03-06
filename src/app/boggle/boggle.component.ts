import { Component } from '@angular/core';
import { stCubes } from './cubes';

@Component({
  selector: 'app-boggle',
  templateUrl: './boggle.component.html',
  styleUrls: ['./boggle.component.css']
})
export class BoggleComponent {

  protected cubes: string[] = [];
  protected letters: string[] = [];


  starGame() {
    this.cubes = stCubes.concat();
    shuffle(this.cubes);
    this.letters = this.cubes.map(c => c[Math.round(Math.random() * 5)]);
  }
}

function shuffle<T>(items: T[]): void {
  for (let i = 0; i < items.length - 2; i++) {
    const swapIndex = Math.floor(Math.random() * (items.length - i));
    [items[i], items[swapIndex]] = [items[swapIndex], items[i]];

  }
}