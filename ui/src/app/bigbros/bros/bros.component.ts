import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {interval, Observable, Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-bros',
  templateUrl: './bros.component.html',
  styleUrls: ['./bros.component.scss']
})
export class BrosComponent implements OnInit, OnDestroy {
  // @Input('len') len$: Observable<number>;

  @ViewChild('firstOne', {static: true}) firstOne: ElementRef<HTMLElement>;
  @ViewChild('firstTwo', {static: true}) firstTwo: ElementRef<HTMLElement>;
  @ViewChild('secondOne', {static: true}) secondOne: ElementRef<HTMLElement>;
  @ViewChild('secondTwo', {static: true}) secondTwo: ElementRef<HTMLElement>;

  private unsubscribe$ = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    interval(300)
      .subscribe(data => {
        // this.setPositionOne(data);
        // this.setPositionTwo(data);
      });
    // this.setPositionOne(1);
    // this.setPositionOne(1)
  }

  ngOnDestroy(): void {



  }

  private setPositionOne(len: number): void {
    if (len < 2) {
      this.setPosition('first', 56, 110, 101, 111);
    } else if (len < 3) {
      this.setPosition('first', 57, 110, 102, 111);
    } else if (len < 4) {
      this.setPosition('first', 58, 110, 103, 111);
    } else if (len < 5) {
      this.setPosition('first', 59, 110, 104, 111);
    } else if (len < 6) {
      this.setPosition('first', 60, 110, 104, 111);
    } else if (len < 7) {
      this.setPosition('first', 61, 110, 105, 111);
    } else if (len < 8) {
      this.setPosition('first', 62, 110, 106, 111);
    } else if (len < 9) {
      this.setPosition('first', 63, 110, 107, 111);
    } else if (len > 12) {
      this.setPosition('first', 64, 110, 108, 111);
    }
  }

  private setPositionTwo(len: number): void {
    if (len < 2) {
      this.setPosition('second', 245, 167, 290, 168);
    } else if (len < 3) {
      this.setPosition('second', 246, 168, 291, 169);
    } else if (len < 4) {
      this.setPosition('second', 247, 168, 292, 169);
    } else if (len < 5) {
      this.setPosition('second', 248, 168, 293, 169);
    } else if (len < 6) {
      this.setPosition('second', 249, 168, 294, 169);
    } else if (len < 7) {
      this.setPosition('second', 250, 168, 294, 169);
    } else if (len < 8) {
      this.setPosition('second', 250, 168, 294, 169);
    } else if (len === 11) {
      this.setPosition('second', 251, 168, 295, 169);
    } else if (len === 12) {
      this.setPosition('second', 252, 168, 296, 169);
    } else if (len === 13) {
      this.setPosition('second', 253, 168, 297, 169);
    } else if (len > 13) {
      this.setPosition('second', 254, 168, 298, 169);
    }
  }


  private setPosition(person: string, xLeft: number, yLeft: number, xRight: number, yRight: number): void {
    if (person === 'first') {
      this.firstOne.nativeElement.style.left = `${xLeft}px`;
      this.firstOne.nativeElement.style.top = `${yLeft}px`;
      this.firstTwo.nativeElement.style.left = `${xRight}px`;
      this.firstTwo.nativeElement.style.top = `${yRight}px`;
    }

    if (person === 'second') {
      this.secondOne.nativeElement.style.left = `${xLeft}px`;
      this.secondOne.nativeElement.style.top = `${yLeft}px`;
      this.secondTwo.nativeElement.style.left = `${xRight}px`;
      this.secondTwo.nativeElement.style.top = `${yRight}px`;
    }
  }

}
