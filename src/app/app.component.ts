import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface VirtualDataInterface {
  index: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-virtual',
  template: `
    <button nz-button (click)="scrollToIndex(200)">Scroll To Index 200</button>
    <br />
    <br />
    <nz-table
      #virtualTable
      [nzVirtualItemSize]="54"
      [nzData]="listOfData"
      [nzVirtualForTrackBy]="trackByIndex"
      [nzFrontPagination]="false"
      [nzShowPagination]="false"
      [nzScroll]="{ x: '1200px', y: '240px' }"
    >
      <thead>
        <tr>
          <th nzLeft>Full Name 
          <i (click)="sorting()" nz-icon nzType="caret-up" nzTheme="outline"></i>
          <i (click)="sorting2()" nz-icon nzType="caret-down" nzTheme="outline"></i> </th>
          <th nzLeft (click)="sorting2()">Age</th>
          <th>Index</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
          <th>Column 7</th>
          <th>Column 8</th>
          <th nzRight>Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-template nz-virtual-scroll let-data let-index="index">
          <tr>
            <td nzLeft>{{ data.name }}</td>
            <td nzLeft>{{ data.age }}</td>
            <td>{{ data.index }} <button nz-button [nzType]="'primary'" (click)="showModal()"><span>Show Modal</span></button></td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td nzRight>
              <nz-select ngModel="lucy" nzBorderless>
                <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
                <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
                <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
              </nz-select>
            </td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="The first Modal" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <p>Content one</p>
        <p>Content two</p>
        <p>Content three</p>
      </ng-container>
    </nz-modal>
  `
})
export class NzDemoTableVirtualComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('virtualTable', { static: false }) nzTableComponent?: NzTableComponent<VirtualDataInterface>;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];
  isVisible = false;

  scrollToIndex(index: number): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 20000; i++) {
      data.push({
        index: i,
        name: `${i} Edward`,
        age: i,
        address: `London`
      });
    }
    this.listOfData = data;
  }

  ngAfterViewInit(): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange.pipe(takeUntil(this.destroy$)).subscribe((data: number) => {
      console.log('scroll index to', data);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showModal(): void {
    this.isVisible = true;
  }

  sorting() {
    alert(1)
    this.listOfData = [...this.listOfData].sort((a, b) => (a.name > b.name) ? 1 : -1)
    // this.listOfData = [...this.listOfData].sort(compare)
    // this.listOfData = this.listOfData.filter((val, idx) => {
    //   return idx < 10;
    // })
  }

  sorting2() {
    alert(1)
    this.listOfData = [...this.listOfData].sort((a, b) => (a.name < b.name) ? 1 : -1)
    // this.listOfData = [...this.listOfData].sort(compare)
    // this.listOfData = this.listOfData.filter((val, idx) => {
    //   return idx < 10;
    // })
  }

  blur() {
    alert(1)
  }
}
