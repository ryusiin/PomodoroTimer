function Start() {
  // :: 수치 및 UI 초기화
  this.InitStatus();

  this.setInterval(this.Update, 1000);
  this.ShowCurrentTime();
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
let TEXT_Timer; // : UI 타이머
let TEXT_State; // : UI 상태
let SECTION_Progress; // : UI 진행도
// :: Audio
let nSound;
let SOUND_AlarmEndBreakLong;
let SOUND_AlarmEndBreakShort;
let SOUND_AlarmEndFocus;
// :: 수치
let nWeek; // : 현재 요일
let iTimeFocus; // : 집중 시간
let iTimeBreakShort; // : 단기 휴식
let iTimeBreakLong; // : 장기 휴식
let iState; // : 현재 상태
let nState;
let iProgress;
let iDoTimer;
let iCurrentTime_Minute; // : 현재 분
let iCurrentTime_Second; // : 현재 초
function InitStatus() {
  // :: UI
  this.TEXT_CurrentTime = document.getElementById("TEXT_CurrentTime"); // : 현재 시간
  this.TEXT_Timer = document.getElementById("TEXT_Timer"); // : 현재 타이머
  this.TEXT_State = document.getElementById("TEXT_State"); // : 현재 상태
  this.SECTION_Progress = document.getElementById("SECTION_Progress"); // :: 현재 진행도

  // :: 사운드
  this.SOUND_AlarmEndFocus = new Audio("./Sound/sound_alarm_end_focus.mp3");
  this.SOUND_AlarmEndBreakShort = new Audio(
    "./Sound/sound_alarm_end_break_short.mp3",
  );
  this.SOUND_AlarmEndBreakLong = new Audio(
    "./Sound/sound_alarm_end_break_long.mp3",
  );
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

  // :: 현재 진행도
  this.iProgress = 0;

  // :: 기본 Focus 설정
  this.SetTimerFocus();
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
}

// :: 현재 타이머
function DoTimer(check) {
  this.iDoTimer = check;
}
function ReduceTimer() {
  this.UpdateTimer();
  if (this.iCurrentTime_Minute <= 0 && this.iCurrentTime_Second <= 0) {
    this.EndTimer();
  } else if (this.iCurrentTime_Second <= 0) {
    this.iCurrentTime_Minute -= 1;
    this.iCurrentTime_Second = 59;
  } else {
    this.iCurrentTime_Second -= 1;
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

  this.PlusProgress();
}
function SetTimerBreakShort() {
  this.iState = 1;
  this.iCurrentTime_Minute = this.iTimeBreakShort;
  this.iCurrentTime_Second = 0;
  this.UpdateTimer();
  this.UpdateState();
}
function SetTimerBreakLong() {
  this.iState = 2;
  this.iCurrentTime_Minute = this.iTimeBreakLong;
  this.iCurrentTime_Second = 0;
  this.UpdateTimer();
  this.UpdateState();

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
}
function ResetProgress() {
  this.iProgress = 0;
  for (let index = 0; index < this.SECTION_Progress.children.length; index++) {
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
