import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public snack(message:any) {
    let snacked = this.snackBar.open(message, 'OK', {
       duration: environment.SNACK_TIMEOUT
    })
 }

 getUsers() {
   return this.http.get('https://jsonplaceholder.typicode.com/users')
    .pipe(map((res:any) => {
         return res;
    }),
    catchError(this.handleError('Get Data', []))
   )
 }

 getUsersPosts(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId='+userId)
    .pipe(map((res:any) => {
      return res;
    }),
    catchError(this.handleError('Post Data', []))
   )
 }

 getUserByID(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
    .pipe(map((res:any) => {
      return res;
    }),
    catchError(this.handleError('Post Data', []))
  )
 }

 getPostDetail(postId) {
   return this.http.get('https://jsonplaceholder.typicode.com/posts/'+postId)
    .pipe(map((res:any) => {
      return res;
      }),
      catchError(this.handleError('Post Details', []))
    )
 }

 getPostComments(postId) {
  return this.http.get('https://jsonplaceholder.typicode.com/comments?postId='+postId)
  .pipe(map((res:any) => {
    return res;
    }),
    catchError(this.handleError('Post Details', []))
  )
 }

 deletePosts(postId) {
  return this.http.delete('https://jsonplaceholder.typicode.com/posts/'+postId)
  .pipe(map((res:any) => {
    return res;
    }),
    catchError(this.handleError('Post Details', []))
  )
 }

 public handleError<T> (operation = 'operation', result?: T) {
     return (error: any) : Observable<T> => {

       if(error.error.message && error.error.message != undefined){
           this.snack(error.error.message);
       }else {
           this.snack(environment.SYSTEM_ERROR);
       }

       return of(result as T);
     }
 }
}
