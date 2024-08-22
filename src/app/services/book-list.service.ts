import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
  books: Book[] = [
    {
      id: uuid(),
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      publicationYear: 2008,
      description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole-a subset you can use to create truly extensible and efficient code.',
      isTopSeller: false
    },
    {
      id: uuid(),
      title: 'Eloquent JavaScript',
      author: 'Marijn Haverbeke',
      publicationYear: 2024,
      description: 'Completely revised and updated, this best-selling introduction to programming in JavaScript focuses on writing real applications. JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon.',
      isTopSeller: true
    },
    {
      id: uuid(),
      title: 'You Don\'t Know JS Yet',
      author: 'Kyle Simpson',
      publicationYear: 2020,
      description: 'It seems like there\'s never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript.',
      isTopSeller: true
    },
    {
      id: uuid(),
      title: 'JavaScript and JQuery: Interactive Front-End Web Development',
      author: 'Jon Duckett',
      publicationYear: 2014,
      description: 'In JavaScript and jQuery: Interactive Front-End Development, best-selling author Jon Duckett delivers a fully illustrated guide to making your websites more interactive and your interfaces more interesting and intuitive. ',
      isTopSeller: false
    }
  ];

  getBooksList(): Observable<Book[]> {
    return of(this.books);
  }

  addBook(bookInfo: Book): Observable<Book> {
    this.books = [...this.books, bookInfo];
    return of(bookInfo);
  }

  editBook(bookInfo: Book): Observable<Book> {
    this.books = this.books.map((book: Book) => book.id === bookInfo.id ? bookInfo : book);
    return of(bookInfo);
  }

  deleteBook(bookId: string): Observable<void> {
    this.books = this.books.filter((book: Book) => book.id !== bookId);
    return of();
  }
}
