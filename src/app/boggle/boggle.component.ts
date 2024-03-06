import { Component, OnInit } from '@angular/core';
import { stCubes } from './cubes';
import { last } from 'rxjs';
import { dicionary } from './dictionary';

@Component({
  selector: 'app-boggle',
  templateUrl: './boggle.component.html',
  styleUrls: ['./boggle.component.css']
})
export class BoggleComponent implements OnInit {

  protected cubes: string[] = [];
  protected letters: string[] = [];

  protected wordsFound: string [] = [];

  //! Palabras
  protected letterSelected: string [] = [];
  protected selectedCells = new Set<string>();
  protected lasSelectedCell: [number, number] | null = null;

  ngOnInit() {
    this.starGame();
  }

  //! Metodo para selecionar las palabras (no funcina)
  protected selectLetter(row: number, col: number) {

    if (!this.isCellSectable(row, col)) {
      return;
    }
    if (this.selectedCells.has(`${row}, ${col}`)) {
      return;
    }
    this.selectedCells.add(`${row}, ${col}`);
    this.letterSelected.push(this.letters[row * 4 + col]);
    this.lasSelectedCell = [row, col];
  }

  protected isCellSectable(row: number, col: number){
    return !this.lasSelectedCell || (Math.abs(row - this.lasSelectedCell[0]) <= 1 && Math.abs(col - this.lasSelectedCell[1]) <= 1);
    ;
  }

  starGame() {
    // this.wordsFound = [];
    // this.letterSelected = [];
    // this.selectedCells = new Set<string>();
    this.restSelection();

    this.cubes = stCubes.concat();
    shuffle(this.cubes);
    this.letters = this.cubes.map(c => c[Math.floor(Math.random() * 6)]);
    //! si se deja como: Math.round 
    //! Esto es para que se muestren todas las letras de los cubos.
  }





  //!Puntuaje
  protected score() {
  }


  //! Palabra encontrtada
  commitWord() {
    const word = this.letterSelected.join('').toLowerCase();
    if (dicionary.includes(word)) {
      this.wordsFound.push(word);
    }

    this.restSelection();
  }
  
  private restSelection() {
    this.lasSelectedCell = null;
    this.letterSelected = [];
    this.selectedCells = new Set<string>();
  }
  


}

function shuffle<T>(items: T[]): void {
  for (let i = 0; i < items.length - 2; i++) {
    const swapIndex = Math.floor(Math.random() * (items.length - i));
    [items[i], items[swapIndex]] = [items[swapIndex], items[i]];
  }
}