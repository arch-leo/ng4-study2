import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from '../../service/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    cn: '满足感在于不断的努力，而不是现有成就。全心努力必定会胜利满满。',
    en: 'Satisfaction lies in constant efforts, not existing achievements. All efforts will be filled with victory.',
    pic: '/assets/img/quote_fallback.jpg'
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe(quote => this.quote = quote);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['leo@163.com', [Validators.required, Validators.email, this.validate]],
      password: ['', Validators.required]
    });
  }
  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
    // 动态添加验证条件
    // this.form.controls['email'].setValidators(Validators.required);
  }

  // 自定义验证器
  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^leo+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      'email': 'email must start width "leo"'
    };
  }
}
