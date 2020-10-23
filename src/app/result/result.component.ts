import { QuizService } from './../quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  timer = this.quizService.seconds;
  score = Math.round((this.quizService.score / 15) * 100)
  numberOfAnsweredQuestions = this.quizService.numberOfAnsweredQuestions
  correctAnswers = this.quizService.correctAnswers
  wrongAnswers = this.quizService.wrongAnswers
  remark:string = ""


  constructor(private quizService: QuizService) {
    if(this.score < 30){
      this.remark = "Try again!"
    }
    else if(this.score > 30 && this.score < 50){
      this.remark = "Better luck next time!"
    }
    else if(this.score > 50 && this.score < 80){
      this.remark = "You can do better!"
    }
    else {
      this.remark = "You are a genious!"
    }
  }

  ngOnInit(): void {
  }

  displayTimeElapsed() {
    return  Math.floor(this.timer / 60) + ':' + Math.floor(this.timer % 60)
  }

}
