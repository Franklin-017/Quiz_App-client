import { Observable } from 'rxjs';
import { Question } from './models/question.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  questionsUrl:string = 'https://examly-quizquestion-api.herokuapp.com/api/questions'
  questions: Question[];
  numberOfQuestions: number = 15;
  numberOfAnsweredQuestions: number = 0;
  score: number = 0;
  correctAnswers:number = 0;
  wrongAnswers: number = 0;
  seconds: number = 0;


  constructor(private http: HttpClient) { 
    this.getDataFromAPI()
  }

  getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl)
  }

  getDataFromAPI(): void{
    this.getQuestion().subscribe((questions) =>{
      this.questions  = questions
    }, (error) => {
      console.log("Error is", error)
    })
  }
}
