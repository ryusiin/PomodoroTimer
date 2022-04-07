function Start() {
  // :: 수치 및 UI 초기화
  this.InitStatus();

  // :: 버튼 시나리오 추가
  this.AddButtonScenarios();

  this.setInterval(this.Update, 100);
  this.ShowCurrentTime();
  this.ShowEndTime();
}
function Update() {
  this.ShowCurrentTime();
  if (this.iDoTimer) {
    this.ReduceTimer();
  }
}

// :: 수치 및 UI 초기화
// :: UI
let TEXT_CurrentTime; // : UI 현재 시간
let TEXT_EndTime; // : UI 종료 시간
let TEXT_Timer; // : UI 타이머
let TEXT_State; // : UI 상태
let SECTION_Progress; // : UI 진행도
let SECTION_MainTimer; // : UI 메인 타이머
let SECTION_Settings; // : UI 설정
let SECTION_Modal; // : UI 모달
let BUTTON_Auto; // : UI 버튼 Auto
let INPUT_Time_Focus; // : UI Input Focus
let INPUT_Time_ShortBreak; // : UI Input Short Break
let INPUT_Time_LongBreak; // : UI Input Long Break
let INPUT_Time_Finish_Hour; // : UI Input Finish Hour
let INPUT_Time_Finish_Minute; // : UI Input Finish Minute
// :: Audio
let nSound;
let SOUND_AlarmEndBreakLong;
let SOUND_AlarmEndBreakShort;
let SOUND_AlarmEndFocus;
let SOUND_TimerOff;
let SOUND_TimerOn;
// :: 수치
let nWeek; // : 현재 요일
let iTimeFocus; // : 집중 시간
let iTimeBreakShort; // : 단기 휴식
let iTimeBreakLong; // : 장기 휴식
let iState; // : 현재 상태
let nState;
let iProgress;
let iDoTimer;
let iDoAuto;
let iCurrentTime_Minute; // : 현재 분
let iCurrentTime_Second; // : 현재 초
function InitStatus() {
  // :: UI
  this.TEXT_CurrentTime = document.getElementById("TEXT_CurrentTime"); // : 현재 시간
  this.TEXT_EndTime = document.getElementById("TEXT_EndTime"); // : 종료 시간
  this.TEXT_Timer = document.getElementById("TEXT_Timer"); // : 현재 타이머
  this.TEXT_State = document.getElementById("TEXT_State"); // : 현재 상태
  this.SECTION_Progress = document.getElementById("SECTION_Progress"); // : 현재 진행도
  this.SECTION_MainTimer = document.getElementById("SECTION_MainTimer"); // : 메인 타이머
  this.SECTION_Settings = document.getElementById("SECTION_Settings"); // : 설정
  this.SECTION_Modal = document.getElementById("SECTION_Modal"); // : 모달
  this.BUTTON_Auto = document.getElementById("BUTTON_Auto"); // : 버튼 Auto
  this.INPUT_Time_Focus = document.getElementById("INPUT_Time_Focus"); // : Input Time Focus
  this.INPUT_Time_ShortBreak = document.getElementById("INPUT_Time_ShortBreak"); // : Input Time Short Break
  this.INPUT_Time_LongBreak = document.getElementById("INPUT_Time_LongBreak"); // : Input Time Long Break
  this.INPUT_Time_Finish_Hour = document.getElementById(
    "INPUT_Time_Finish_Hour",
  ); // : Input Time Finish Hour
  this.INPUT_Time_Finish_Minute = document.getElementById(
    "INPUT_Time_Finish_Minute",
  ); // : Input Time Finish Mintue

  // :: 사운드
  this.SOUND_AlarmEndFocus = new Audio("./Sound/sound_alarm_end_focus.mp3");
  this.SOUND_AlarmEndBreakShort = new Audio(
    "./Sound/sound_alarm_end_break_short.mp3",
  );
  this.SOUND_AlarmEndBreakLong = new Audio(
    "./Sound/sound_alarm_end_break_long.mp3",
  );
  this.SOUND_TimerOn = new Audio("./Sound/sound_timer_on.mp3");
  this.SOUND_TimerOff = new Audio("./Sound/sound_timer_off.mp3");
  this.nSound = new Array(
    this.SOUND_AlarmEndFocus,
    this.SOUND_AlarmEndBreakShort,
    this.SOUND_AlarmEndBreakLong,
  );

  // :: 현재 요일
  this.nWeek = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

  // :: 현재 상태
  this.nState = new Array("Focus", "Short Break", "Long Break");

  // :: 현재 타이머
  this.iTimeFocus = 25;
  this.iTimeBreakShort = 5;
  this.iTimeBreakLong = 30;
  this.iDoTimer = false;
  this.DoAuto();

  this.LoadTime();

  // :: 현재 진행도
  this.iProgress = 0;

  // :: 기본 Focus 설정
  this.SetTimerFocus();
}

function UpdateSetting_CategoryTime() {
  this.INPUT_Time_Focus.value = this.iTimeFocus;
  this.INPUT_Time_ShortBreak.value = this.iTimeBreakShort;
  this.INPUT_Time_LongBreak.value = this.iTimeBreakLong;
}
function UpdateSetting_FinishTime() {
  this.INPUT_Time_Finish_Hour.value = this.iEndTime_Hour;
  this.INPUT_Time_Finish_Minute.value = this.iEndTime_Minute;
}
function InputSetting_CategoryTime() {
  this.ChangeTimeFocus(this.INPUT_Time_Focus.value);
  this.ChangeTimeShortBreak(this.INPUT_Time_ShortBreak.value);
  this.ChangeTimeLongBreak(this.INPUT_Time_LongBreak.value);
}
function InputSetting_FinishTime() {
  this.ChangeTimeFinish(
    this.INPUT_Time_Finish_Hour.value,
    this.INPUT_Time_Finish_Minute.value,
  );
}
function ChangeTimeFinish(_hour, _minute) {
  this.iEndTime_Hour = Number(_hour);
  this.iEndTime_Minute = Number(_minute);
  this.SaveFinishTime();
}
function ChangeTimeFocus(_value) {
  this.iTimeFocus = Number(_value);
  this.SaveTime();
}
function ChangeTimeShortBreak(_value) {
  this.iTimeBreakShort = Number(_value);
  this.SaveTime();
}
function ChangeTimeLongBreak(_value) {
  this.iTimeBreakLong = Number(_value);
  this.SaveTime();
}
function SaveFinishTime() {
  window.localStorage.setItem("time_finish_hour", this.iEndTime_Hour);
  window.localStorage.setItem("time_finish_minute", this.iEndTime_Minute);
}
function SaveTime() {
  window.localStorage.setItem("time_focus", this.iTimeFocus);
  window.localStorage.setItem("time_short_break", this.iTimeBreakShort);
  window.localStorage.setItem("time_long_break", this.iTimeBreakLong);
}
function LoadTime() {
  if (window.localStorage.getItem("time_focus") === null) {
    window.localStorage.setItem("time_focus", this.iTimeFocus);
  } else {
    this.iTimeFocus = window.localStorage.getItem("time_focus");
  }

  if (window.localStorage.getItem("time_short_break") === null) {
    window.localStorage.setItem("time_short_break", this.iTimeBreakShort);
  } else {
    this.iTimeBreakShort = window.localStorage.getItem("time_short_break");
  }

  if (window.localStorage.getItem("time_long_break") === null) {
    window.localStorage.setItem("time_long_break", this.iTimeBreakLong);
  } else {
    this.iTimeBreakLong = window.localStorage.getItem("time_long_break");
  }
}

function AddButtonScenarios() {
  this.AddButtonSecnario_Modal();

  this.AddButtonScenario_Input_Focus();
  this.AddButtonScenario_Input_ShortBreak();
  this.AddButtonScenario_Input_LongBreak();

  this.AddButtonScenario_Input_FinishTime();
}
function AddButtonSecnario_Modal() {
  this.SECTION_Modal.addEventListener("click", (e) => {
    if (e.target === this.SECTION_Modal) this.HideSettings();
  });
}
function AddButtonScenario_Input_Focus() {
  this.INPUT_Time_Focus.addEventListener("change", (e) => {
    this.InputSetting_CategoryTime();
  });
}
function AddButtonScenario_Input_ShortBreak() {
  this.INPUT_Time_ShortBreak.addEventListener("change", (e) => {
    this.InputSetting_CategoryTime();
  });
}
function AddButtonScenario_Input_LongBreak() {
  this.INPUT_Time_LongBreak.addEventListener("change", (e) => {
    this.InputSetting_CategoryTime();
  });
}
function AddButtonScenario_Input_FinishTime() {
  this.INPUT_Time_Finish_Hour.addEventListener("change", (e) => {
    this.InputSetting_FinishTime();
  });
  this.INPUT_Time_Finish_Minute.addEventListener("change", (e) => {
    this.InputSetting_FinishTime();
  });
}

let iIntervalCurrentTime;
function ShowCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const date = ("0" + now.getDate()).slice(-2);
  const day = this.nWeek[now.getDay()];
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);
  const currentTime = `${year}-${month}-${date}(${day}) ${hours}:${minutes}:${seconds}`;

  this.TEXT_CurrentTime.innerHTML = currentTime;

  if (
    now.getSeconds() == 0 &&
    now.getHours() == this.iEndTime_Hour &&
    now.getMinutes() == this.iEndTime_Minute
  ) {
    this.SOUND_AlarmEndBreakLong.play();
  }
}

let iEndTime_Hour;
let iEndTime_Minute;
function ShowEndTime() {
  const now = new Date();
  if (window.localStorage.getItem("time_finish_hour") == null) {
    this.iEndTime_Hour = now.getHours();
  } else {
    this.iEndTime_Hour = window.localStorage.getItem("time_finish_hour");
  }

  if (window.localStorage.getItem("time_finish_minute") == null) {
    this.iEndTime_Minute = now.getMinutes();
  } else {
    this.iEndTime_Minute = window.localStorage.getItem("time_finish_minute");
  }

  const hours = ("0" + this.iEndTime_Hour).slice(-2);
  const minutes = ("0" + this.iEndTime_Minute).slice(-2);

  this.TEXT_EndTime.innerHTML = `Finish Time : ${hours}:${minutes}`;
}

function ShowSettings() {
  this.SECTION_Modal.style.display = "block";
  this.SECTION_Settings.style.display = "block";

  this.UpdateSetting_CategoryTime();
  this.UpdateSetting_FinishTime();
}

function HideSettings() {
  this.SECTION_Modal.style.display = "none";
  this.SECTION_Settings.style.display = "none";

  this.ResetTimer();
  this.ShowEndTime();
}

function ResetPomodoro() {
  this.ResetProgress();
  this.iDoTimer = false;
  this.iCurrentTime_Minute = this.iTimeFocus;
  this.iCurrentTime_Second = 0;
  this.SetTimerFocus();
}

// :: 현재 타이머
let iGoalTime;
function DoTimer() {
  this.iDoTimer = !this.iDoTimer;

  if (this.iDoTimer) {
    // :: 현재 시간
    const now = new Date();

    // :: 골 더하기
    now.setMinutes(now.getMinutes() + Number(this.iCurrentTime_Minute));
    now.setSeconds(now.getSeconds() + Number(this.iCurrentTime_Second));

    // ::  목표 저장
    this.iGoalTime = now;

    this.SOUND_TimerOn.play();
  } else {
    this.SOUND_TimerOff.play();
  }
}

function DoAuto() {
  this.iDoAuto = this.BUTTON_Auto.checked;
}

function ReduceTimer() {
  this.UpdateTimer();
  if (this.iCurrentTime_Minute <= 0 && this.iCurrentTime_Second <= 0) {
    this.EndTimer();
  } else {
    const now = new Date();
    const diff = Math.round((this.iGoalTime.getTime() - now.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = Math.round(diff % 60);
    this.iCurrentTime_Minute = minutes;
    this.iCurrentTime_Second = seconds;
  }
}

function UpdateTimer() {
  const minutes = ("0" + this.iCurrentTime_Minute).slice(-2);
  const seconds = ("0" + this.iCurrentTime_Second).slice(-2);
  this.TEXT_Timer.innerHTML = `${minutes}:${seconds}`;
}

function SetTimerFocus() {
  this.iState = 0;
  this.iCurrentTime_Minute = this.iTimeFocus;
  this.iCurrentTime_Second = 0;
  this.UpdateTimer();
  this.UpdateState();

  this.SECTION_MainTimer.className = "color_focus";

  this.PlusProgress();
}

function SetTimerBreakShort() {
  this.iState = 1;
  this.iCurrentTime_Minute = this.iTimeBreakShort;
  this.iCurrentTime_Second = 0;
  this.UpdateTimer();
  this.UpdateState();

  this.SECTION_MainTimer.className = "color_shortBreak";
}

function SetTimerBreakLong() {
  this.iState = 2;
  this.iCurrentTime_Minute = this.iTimeBreakLong;
  this.iCurrentTime_Second = 0;
  this.UpdateTimer();
  this.UpdateState();

  this.SECTION_MainTimer.className = "color_longBreak";

  this.PlusProgress();
}

function EndTimer() {
  this.iDoTimer = false;
  // :: 사운드 재생
  this.nSound[this.iState].play();
  if (this.iState == 0) {
    if (this.iProgress % 4 == 0) this.SetTimerBreakLong();
    else this.SetTimerBreakShort();
  } else if (this.iState == 1 || this.iState == 2) {
    if (this.iState == 2) this.ResetProgress();
    this.SetTimerFocus();
  }

  // :: Auto일 때 자동 실행
  if (this.iDoAuto) this.DoTimer();
}

function ResetProgress() {
  this.iProgress = 0;

  // :: 카운트 획득
  let count = this.SECTION_Progress.children.length;
  if (count >= 5) count = 5; // : 카운트 제한

  // :: 칠하기
  for (let index = 0; index < count; index++) {
    this.SECTION_Progress.children[index].style.backgroundColor =
      this.GetColor(-1);
  }
}

function PlusProgress() {
  this.iProgress += 1;
  this.UpdateProgress();
}

function UpdateProgress() {
  for (let index = 0; index < this.iProgress; index++) {
    this.SECTION_Progress.children[index].style.backgroundColor = this.GetColor(
      index + 1,
    );
  }
}
function GetColor(_index) {
  if (_index === -1) return "#C4C4C4";
  if (_index === 5) return "#7DF5D1";
  if (this.iProgress === _index) return "#D44949";
  return "#DB7B7B";
}

function UpdateState() {
  this.TEXT_State.innerHTML = this.nState[this.iState];
}

function ResetTimer() {
  // :: 이미 진행중이면 return
  if (this.iDoTimer) return;

  if (this.iState == 0) {
    this.iCurrentTime_Minute = this.iTimeFocus;
  } else if (this.iState == 1) {
    this.iCurrentTime_Minute = this.iTimeBreakShort;
  } else if (this.iState == 2) {
    this.iCurrentTime_Minute = this.iTimeBreakLong;
  }
  this.UpdateTimer();
}
