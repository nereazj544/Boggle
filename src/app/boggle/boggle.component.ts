import { Component, OnInit } from '@angular/core';
import { stCubes } from './cubes';
// import { last } from 'rxjs';
import { dicionary } from './dictionary';
import { IfStmt } from '@angular/compiler';

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
  protected selectedCellStack: [number, number][] = [];

  ngOnInit() {
    this.starGame();
  }

  //! Metodo para selecionar las palabras (no funcina)
  protected selectLetter(row: number, col: number) {

    if (!this.isCellSectable(row, col)) {
      return;
    }
    if (this.selectedCells.has(`${row}, ${col}`)) {
      if (this.isLastSelectedCell(row, col)) {
        this.letterSelected.pop()
        this.selectedCellStack.shift();
        this.selectedCells.delete(`${row}, ${col}`);
        return;
      }
    }
    this.selectedCells.add(`${row}, ${col}`);
    this.letterSelected.push(this.letters[row * 4 + col]);
    this.selectedCellStack.unshift([row, col]);
  }

  protected isCellSectable(row: number, col: number){
    const lastSelected = this.selectedCellStack[0];
    
    if(!this.selectedCellStack.length){
      return true;
    }

    if (!this.selectedCells.has(`${row}, ${col}`)) {
      return Math.abs(row - lastSelected[0]) <= 1 && Math.abs(col - lastSelected[1]) <= 1;
    }else{
      return row === lastSelected[0] && col === lastSelected[0];
    }
  }

  protected isLastSelectedCell(row: number, col: number){
    return this.selectedCellStack.length &&
    row == this.selectedCellStack[0][0] && col == this.selectedCellStack[0][1]
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
    return this.wordsFound.map(w => w.length)
  }


  //! Palabra encontrtada
  commitWord() {
    const word = this.letterSelected.join('').toLowerCase();
    // if (dicionary.includes(word)) {
      this.wordsFound.push(word);
    // }

    this.restSelection();
  }
  
  protected restSelection() {
    this.selectedCellStack = [];
    this.letterSelected = [];
    this.selectedCells = new Set<string>();
  }
  




}

function shuffle<T>(items: T[]): void {
  for (let i = 0; i < items.length - 1; i++) {
    const swapIndex = Math.floor(Math.random() * (items.length - i));
    [items[i], items[swapIndex]] = [items[swapIndex], items[i]];
  }
}