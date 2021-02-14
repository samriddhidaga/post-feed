import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DefaultService } from './default.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatExpansionModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    PostComponent,
    NotFoundComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [DefaultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
