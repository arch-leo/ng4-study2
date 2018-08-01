import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  subDays, subMonths, subYears, differenceInDays, differenceInMonths,
  differenceInYears, isBefore, parse, format, subISOYears, isDate, isValid, isFuture
} from 'date-fns';
import { isValidDate } from '../../utils/date.utils';
import { Subscription } from 'rxjs/Subscription';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  num: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]

})
export class AgeInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  selectedUnit = AgeUnit.Year;
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' }
  ];
  form: FormGroup;
  @Input() daysTop = 90;
  @Input() daysBot = 0;
  @Input() monthsTop = 24;
  @Input() monthsBot = 1;
  @Input() yearsTop = 150;
  @Input() yearsBot = 1;
  @Input() debounceTime = 300;
  @Input() format = 'YYYY-MM-DD';
  subBirth: Subscription;
  private propagateChange = (_: any) => { };
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, { validator: this.validateAge('ageNum', 'ageUnit') })
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .map(d => {
        return { date: d, from: 'birthday' };
      })
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_n, _u) => {
        return this.toDate({ num: _n, unit: _u });
      })
      .map(d => {
        return { date: d, from: 'age' };
      })
      .filter(_ => this.form.get('age').valid);

    const mergeDate$ = Observable.merge(birthday$, age$);
    this.subBirth = mergeDate$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.num !== ageNum.value) {
          ageNum.patchValue(age.num, { emitEvent: false });
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.num !== ageToCompare.num || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }
  // ControlValueAccessor只用于初始化 只进行一次
  // 提供值得写入方法
  writeValue(obj: any): void {
    if (obj) {
      console.log(obj);
      const date = format(obj, this.format);
      console.log(date);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.num);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  // 这里没有使用，用于注册 touched 状态
  registerOnTouched(fn: any): void {

  }
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ?
      { num: differenceInDays(now, date), unit: AgeUnit.Day } :
      isBefore(subMonths(now, this.monthsTop), date) ?
        { num: differenceInMonths(now, date), unit: AgeUnit.Month } :
        { num: differenceInYears(now, date), unit: AgeUnit.Year };
  }
  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.num), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.num));
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.num));
      }
      default: {
        return null;
      }
    }
  }
  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfbirthInvalid: true
    };
  }
  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    };
  }
  validateAge(numKey: string, unitKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[numKey];
      const ageUnit = group.controls[unitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBot && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBot && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBot && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : { ageInvalid: true };
    };
  }
}
