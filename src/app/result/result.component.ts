import { QuizService } from './../quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  timer = this.quizService.seconds;
  score = this.quizService.score
  numberOfAnsweredQuestions = this.quizService.numberOfAnsweredQuestions
  correctAnswers = this.quizService.correctAnswers
  wrongAnswers = this.quizService.wrongAnswers


  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  displayTimeElapsed() {
    return  Math.floor(this.timer / 60) + ':' + Math.floor(this.timer % 60)
  }

}
