import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  MatAutocompleteModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {BidiModule} from '@angular/cdk/bidi'

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,

    TranslateModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FlexLayoutModule,

    BidiModule,

    PerfectScrollbarModule

  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FlexLayoutModule,

    BidiModule,

    PerfectScrollbarModule

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class SharedModule {}
