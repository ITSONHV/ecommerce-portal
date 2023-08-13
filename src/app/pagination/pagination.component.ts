import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
  } from '@angular/core';
  import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
  
  export class PaginationValue {
    page: number;
    pageSize: number;
  }
  
  @Component({
    selector: 'my-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PaginationComponent),
        multi: true,
      },
    ],
  })
  export class PaginationComponent
    implements OnInit, OnChanges, ControlValueAccessor
  {
    @Input() value: PaginationValue = { page: 1, pageSize: 12};
    @Input() total = 10;
    @Input() visibleRangeLength = 5;
    // @Input() pageSizes: number[] = [18, 27, 36, 45];
  
    onChange(value: any) {}
    onTouched() {}
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    writeValue(value: PaginationValue): void {
      if (!value) return;
  
      this.value = value;
      this.updateTotalPages();
      this.updateVisiblePages();
    }
  
    public totalPages: number;
    public visiblePages: number[];
  
    ngOnInit(): void {
      this.updateVisiblePages();
    }
  
    ngOnChanges(changes: SimpleChanges): void {   
      
        this.updateTotalPages();  this.updateVisiblePages();
    }
  
    public selectPage(page: number): void {
      this.value = { ...this.value, page };
      this.updateVisiblePages();
      this.onChange(this.value);
    }
  
    public selectPageSize(pageSize: string): void {
      this.value = { page: 1, pageSize: +pageSize };
      this.updateTotalPages();
      this.updateVisiblePages();
      this.onChange(this.value);
    }
  
    private updateVisiblePages(): void {
      const length = Math.min(this.totalPages, this.visibleRangeLength);
  
      const startIndex = Math.max(
        Math.min(
          this.value.page - Math.ceil(length / 2),
          this.totalPages - length
        ),
        0
      );
  
      this.visiblePages = Array.from(
        new Array(length).keys(),
        (item) => item + startIndex + 1
      );
    }
  
    private updateTotalPages(): void {
      this.totalPages = Math.ceil(this.total / this.value.pageSize);
    }
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
  }
  