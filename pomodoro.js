import ChangeTitle from "./Module/UI/ChangeTitle.js";

function Start() {
  // :: 수치 및 UI 초기화
  InitStatus();

  // :: 버튼 시나리오 추가
  AddButtonScenarios();

  setInterval(Update, 100);
  ShowCurrentTime();
  ShowEndTime();
}

function Update() {
  ShowCurrentTime();
  if (iDoTimer) {
    ReduceTimer();
    ChangePlayImage_Pause();
  } else {
    ChangePlayImage_Play();
  }
}
function GetToday(_subtract = 0) {
  const now = new Date();

  // :: 마이너스
  var daySubtract = 24 * 60 * 60 * 1000 * _subtract;
  now.setTime(now.getTime() - daySubtract);

  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

function GetDate(_subtract = 0) {
  const now = new Date();

  // :: 마이너스
  var daySubtract = 24 * 60 * 60 * 1000 * _subtract;
  now.setTime(now.getTime() - daySubtract);

  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  return `${month}-${day}`;
}
function ChangePlayImage_Play() {
  BUTTON_Play.src = "./Image/outline_play_arrow_black_24dp.png";
}
function ChangePlayImage_Pause() {
  BUTTON_Play.src = "./Image/outline_pause_black_24dp.png";
}

// :: 수치 및 UI 초기화
// :: UI
let HTML_Main; // : UI HTML Main
let TEXT_CurrentTime; // : UI 현재 시간
let TEXT_EndTime; // : UI 종료 시간
let TEXT_Timer; // : UI 타이머
let TEXT_State; // : UI 상태
let SECTION_Progress; // : UI 진행도
let SECTION_MainTimer; // : UI 메인 타이머
let SECTION_Settings; // : UI 설정
let SECTION_Records;
let SECTION_Modal; // : UI 모달
let BUTTON_Auto; // : UI 버튼 Auto
let BUTTON_Setting; // : UI 버튼 설정
let BUTTON_Reset; // : UI 버튼 리셋
let BUTTON_Skip; // : UI 버튼 스킵
let BUTTON_Play; // : UI 버튼 플레이
let BUTTON_Pause; // : UI 버튼 일시정지
let BUTTON_Stop; // : UI 버튼 멈춤
let BUTTON_Progress_1; // : UI 버튼 진행도 1
let BUTTON_Progress_2; // : UI 버튼 진행도 2
let BUTTON_Progress_3; // : UI 버튼 진행도 3
let BUTTON_Progress_4; // : UI 버튼 진행도 4
let BUTTON_Progress_5; // : UI 버튼 진행도 5
let INPUT_Time_Focus; // : UI Input Focus
let INPUT_Time_ShortBreak; // : UI Input Short Break
let INPUT_Time_LongBreak; // : UI Input Long Break
let INPUT_Time_Finish_Hour; // : UI Input Finish Hour
let INPUT_Time_Finish_Minute; // : UI Input Finish Minute
let SPAN_Record_Focus; // : UI Record Focus;
let SPAN_Record_Break; // : UI Record Break;
// :: Chart
let CHART_Day_0;
let CHART_Day_0_Data;
let CHART_Day_1;
let CHART_Day_1_Data;
let CHART_Day_2;
let CHART_Day_2_Data;
let CHART_Day_3;
let CHART_Day_3_Data;
let CHART_Day_4;
let CHART_Day_4_Data;
let CHART_Day_5;
let CHART_Day_5_Data;
let CHART_Day_6;
let CHART_Day_6_Data;
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
  // :: UI\
  HTML_Main = document.getElementById("HTML_Main"); // : 메인 HTML
  TEXT_CurrentTime = document.getElementById("TEXT_CurrentTime"); // : 현재 시간
  TEXT_EndTime = document.getElementById("TEXT_EndTime"); // : 종료 시간
  TEXT_Timer = document.getElementById("TEXT_Timer"); // : 현재 타이머
  TEXT_State = document.getElementById("TEXT_State"); // : 현재 상태
  SECTION_Progress = document.getElementById("SECTION_Progress"); // : 현재 진행도
  SECTION_MainTimer = document.getElementById("SECTION_MainTimer"); // : 메인 타이머
  SECTION_Settings = document.getElementById("SECTION_Settings"); // : 설정
  SECTION_Records = document.getElementById("SECTION_Records"); // : 기록
  SECTION_Modal = document.getElementById("SECTION_Modal"); // : 모달
  BUTTON_Auto = document.getElementById("BUTTON_Auto"); // : 버튼 Auto
  BUTTON_Setting = document.getElementById("BUTTON_Setting"); // : 버튼 설정
  BUTTON_Reset = document.getElementById("BUTTON_Reset"); // : 버튼 리셋
  BUTTON_Skip = document.getElementById("BUTTON_Skip"); // : 버튼 스킵
  BUTTON_Play = document.getElementById("BUTTON_Play"); // : 버튼 플레이
  BUTTON_Pause = document.getElementById("BUTTON_Pause"); // : 버튼 일시정지
  BUTTON_Stop = document.getElementById("BUTTON_Stop"); // : 버튼 멈춤
  BUTTON_Progress_1 = document.getElementById("BUTTON_Progress_1"); // : 버튼 진행 1
  BUTTON_Progress_2 = document.getElementById("BUTTON_Progress_2"); // : 버튼 진행 2
  BUTTON_Progress_3 = document.getElementById("BUTTON_Progress_3"); // : 버튼 진행 3
  BUTTON_Progress_4 = document.getElementById("BUTTON_Progress_4"); // : 버튼 진행 4
  BUTTON_Progress_5 = document.getElementById("BUTTON_Progress_5"); // : 버튼 진행 5
  INPUT_Time_Focus = document.getElementById("INPUT_Time_Focus"); // : Input Time Focus
  INPUT_Time_ShortBreak = document.getElementById("INPUT_Time_ShortBreak"); // : Input Time Short Break
  INPUT_Time_LongBreak = document.getElementById("INPUT_Time_LongBreak"); // : Input Time Long Break
  INPUT_Time_Finish_Hour = document.getElementById("INPUT_Time_Finish_Hour"); // : Input Time Finish Hour
  INPUT_Time_Finish_Minute = document.getElementById(
    "INPUT_Time_Finish_Minute",
  ); // : Input Time Finish Mintue
  SPAN_Record_Focus = document.getElementById("SPAN_Record_Focus"); // : Record Focus
  SPAN_Record_Break = document.getElementById("SPAN_Record_Break"); // : Record Focus
  // :: 차트
  CHART_Day_0 = document.getElementById("CHART_Day_0");
  CHART_Day_0_Data = document.getElementById("CHART_Day_0_Data");
  CHART_Day_1 = document.getElementById("CHART_Day_1");
  CHART_Day_1_Data = document.getElementById("CHART_Day_1_Data");
  CHART_Day_2 = document.getElementById("CHART_Day_2");
  CHART_Day_2_Data = document.getElementById("CHART_Day_2_Data");
  CHART_Day_3 = document.getElementById("CHART_Day_3");
  CHART_Day_3_Data = document.getElementById("CHART_Day_3_Data");
  CHART_Day_4 = document.getElementById("CHART_Day_4");
  CHART_Day_4_Data = document.getElementById("CHART_Day_4_Data");
  CHART_Day_5 = document.getElementById("CHART_Day_5");
  CHART_Day_5_Data = document.getElementById("CHART_Day_5_Data");
  CHART_Day_6 = document.getElementById("CHART_Day_6");
  CHART_Day_6_Data = document.getElementById("CHART_Day_6_Data");

  // :: 사운드
  SOUND_AlarmEndFocus = new Audio("./Sound/sound_alarm_end_focus.mp3");
  SOUND_AlarmEndBreakShort = new Audio(
    "./Sound/sound_alarm_end_break_short.mp3",
  );
  SOUND_AlarmEndBreakLong = new Audio("./Sound/sound_alarm_end_break_long.mp3");
  SOUND_TimerOn = new Audio("./Sound/sound_timer_on.mp3");
  SOUND_TimerOff = new Audio("./Sound/sound_timer_off.mp3");
  nSound = new Array(
    SOUND_AlarmEndFocus,
    SOUND_AlarmEndBreakShort,
    SOUND_AlarmEndBreakLong,
  );

  // :: 현재 요일
  nWeek = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

  // :: 현재 상태
  nState = new Array("Focus", "Short Break", "Long Break");

  // :: 현재 타이머
  iTimeFocus = 25;
  iTimeBreakShort = 5;
  iTimeBreakLong = 30;
  iDoTimer = false;
  DoAuto();

  LoadTime();

  // :: 현재 진행도
  iProgress = 0;

  // :: 기본 Focus 설정
  SetTimerFocus(true);
}

function UpdateSetting_CategoryTime() {
  INPUT_Time_Focus.value = iTimeFocus;
  INPUT_Time_ShortBreak.value = iTimeBreakShort;
  INPUT_Time_LongBreak.value = iTimeBreakLong;
}
function UpdateSetting_FinishTime() {
  INPUT_Time_Finish_Hour.value = iEndTime_Hour;
  INPUT_Time_Finish_Minute.value = iEndTime_Minute;
}
function InputSetting_CategoryTime() {
  ChangeTimeFocus(INPUT_Time_Focus.value);
  ChangeTimeShortBreak(INPUT_Time_ShortBreak.value);
  ChangeTimeLongBreak(INPUT_Time_LongBreak.value);
}
function InputSetting_FinishTime() {
  ChangeTimeFinish(
    INPUT_Time_Finish_Hour.value,
    INPUT_Time_Finish_Minute.value,
  );
}
function ChangeTimeFinish(_hour, _minute) {
  iEndTime_Hour = Number(_hour);
  iEndTime_Minute = Number(_minute);
  SaveFinishTime();
}
function ChangeTimeFocus(_value) {
  iTimeFocus = Number(_value);
  SaveTime();
}
function ChangeTimeShortBreak(_value) {
  iTimeBreakShort = Number(_value);
  SaveTime();
}
function ChangeTimeLongBreak(_value) {
  iTimeBreakLong = Number(_value);
  SaveTime();
}
function SaveFinishTime() {
  window.localStorage.setItem("time_finish_hour", iEndTime_Hour);
  window.localStorage.setItem("time_finish_minute", iEndTime_Minute);
}
function SaveTime() {
  window.localStorage.setItem("time_focus", iTimeFocus);
  window.localStorage.setItem("time_short_break", iTimeBreakShort);
  window.localStorage.setItem("time_long_break", iTimeBreakLong);
}
function LoadTime() {
  if (window.localStorage.getItem("time_focus") === null) {
    window.localStorage.setItem("time_focus", iTimeFocus);
  } else {
    iTimeFocus = window.localStorage.getItem("time_focus");
  }

  if (window.localStorage.getItem("time_short_break") === null) {
    window.localStorage.setItem("time_short_break", iTimeBreakShort);
  } else {
    iTimeBreakShort = window.localStorage.getItem("time_short_break");
  }

  if (window.localStorage.getItem("time_long_break") === null) {
    window.localStorage.setItem("time_long_break", iTimeBreakLong);
  } else {
    iTimeBreakLong = window.localStorage.getItem("time_long_break");
  }
}

function AddButtonScenarios() {
  AddButtonSecnario_Modal();

  AddButtonScenario_Input_Focus();
  AddButtonScenario_Input_ShortBreak();
  AddButtonScenario_Input_LongBreak();

  AddButtonScenario_Input_FinishTime();

  AddButtonScenario_MainTimer();
  AddButtonScenario_Auto();

  // :: 재생, 멈춤, 단계 초기화
  AddButtonScenario_Play();
  AddButtonScenario_Stop();
  AddButtonScenario_Skip();

  // :: Upper Buttons
  AddButtonScenario_Setting();
  AddButtonScenario_Record();

  // :: 진행
  AddButtonScenario_Progress();
}
function AddButtonScenario_Progress() {
  BUTTON_Progress_1.addEventListener("click", (e) => {
    ChangeProgress(1);
  });
  BUTTON_Progress_2.addEventListener("click", (e) => {
    ChangeProgress(2);
  });
  BUTTON_Progress_3.addEventListener("click", (e) => {
    ChangeProgress(3);
  });
  BUTTON_Progress_4.addEventListener("click", (e) => {
    ChangeProgress(4);
  });
  BUTTON_Progress_5.addEventListener("click", (e) => {
    ChangeProgress(5);
  });
}
function AddButtonScenario_Play() {
  BUTTON_Play.addEventListener("click", (e) => {
    PlayTimer();
  });
}
function AddButtonScenario_Pause() {
  BUTTON_Pause.addEventListener("click", (e) => {
    PauseTimer();
  });
}
function AddButtonScenario_Stop() {
  BUTTON_Stop.addEventListener("click", (e) => {
    ResetTimer_Forced();
  });
}
function AddButtonScenario_Skip() {
  BUTTON_Skip.addEventListener("click", (e) => {
    EndTimer();
  });
}
function AddButtonScenario_Reset() {
  BUTTON_Reset.addEventListener("click", (e) => {
    ResetPomodoro();
  });
}
function AddButtonScenario_Setting() {
  BUTTON_Setting.addEventListener("click", (e) => {
    ShowSettings();
  });
}
function AddButtonScenario_Record() {
  BUTTON_Record.addEventListener("click", (e) => {
    ShowRecords();
  });
}
function AddButtonScenario_Auto() {
  BUTTON_Auto.addEventListener("click", (e) => {
    DoAuto();
  });
}
function AddButtonScenario_MainTimer() {
  SECTION_MainTimer.addEventListener("click", (e) => {
    DoTimer();
  });
}
function AddButtonSecnario_Modal() {
  SECTION_Modal.addEventListener("click", (e) => {
    if (e.target === SECTION_Modal) HideModals();
  });
}
function AddButtonScenario_Input_Focus() {
  INPUT_Time_Focus.addEventListener("change", (e) => {
    InputSetting_CategoryTime();
  });
}
function AddButtonScenario_Input_ShortBreak() {
  INPUT_Time_ShortBreak.addEventListener("change", (e) => {
    InputSetting_CategoryTime();
  });
}
function AddButtonScenario_Input_LongBreak() {
  INPUT_Time_LongBreak.addEventListener("change", (e) => {
    InputSetting_CategoryTime();
  });
}
function AddButtonScenario_Input_FinishTime() {
  INPUT_Time_Finish_Hour.addEventListener("change", (e) => {
    InputSetting_FinishTime();
  });
  INPUT_Time_Finish_Minute.addEventListener("change", (e) => {
    InputSetting_FinishTime();
  });
}

let iIntervalCurrentTime;
function ShowCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const date = ("0" + now.getDate()).slice(-2);
  const day = nWeek[now.getDay()];
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);
  const currentTime = `${year}-${month}-${date}(${day}) ${hours}:${minutes}:${seconds}`;

  TEXT_CurrentTime.innerHTML = currentTime;

  if (
    now.getSeconds() == 0 &&
    now.getHours() == iEndTime_Hour &&
    now.getMinutes() == iEndTime_Minute
  ) {
    SOUND_AlarmEndBreakLong.play();
  }
}

let iEndTime_Hour;
let iEndTime_Minute;
function ShowEndTime() {
  const now = new Date();
  if (window.localStorage.getItem("time_finish_hour") == null) {
    iEndTime_Hour = now.getHours();
  } else {
    iEndTime_Hour = window.localStorage.getItem("time_finish_hour");
  }

  if (window.localStorage.getItem("time_finish_minute") == null) {
    iEndTime_Minute = now.getMinutes();
  } else {
    iEndTime_Minute = window.localStorage.getItem("time_finish_minute");
  }

  const hours = ("0" + iEndTime_Hour).slice(-2);
  const minutes = ("0" + iEndTime_Minute).slice(-2);

  TEXT_EndTime.innerHTML = `Finish Time : ${hours}:${minutes}`;
}

function ShowSettings() {
  SECTION_Modal.style.display = "block";
  SECTION_Settings.style.display = "block";
  SECTION_Records.style.display = "none";

  UpdateSetting_CategoryTime();
  UpdateSetting_FinishTime();
}
function ShowRecords() {
  SECTION_Modal.style.display = "block";
  SECTION_Settings.style.display = "none";
  SECTION_Records.style.display = "block";

  UpdateRecords();
}
function UpdateRecords() {
  // :: Max 확인
  let max = 0;
  let focusStatus = [];
  for (let i = 0; i < 7; i++) {
    focusStatus[i] = Math.floor(GetRecord_Focus(i) / 60);
    if (max < focusStatus[i]) max = focusStatus[i];
  }

  // :: 차트 표시
  CHART_Day_0.innerHTML = GetDate(0);
  CHART_Day_0_Data.innerHTML =
    focusStatus[0] === 0 ? "" : focusStatus[0] + "<br/>min";
  CHART_Day_0_Data.style.cssText += `--size: calc(${focusStatus[0]} / ${max});`;

  CHART_Day_1.innerHTML = GetDate(1);
  CHART_Day_1_Data.innerHTML =
    focusStatus[1] === 0 ? "" : focusStatus[1] + "<br/>min";
  CHART_Day_1_Data.style.cssText += `--size: calc(${focusStatus[1]} / ${max});`;

  CHART_Day_2.innerHTML = GetDate(2);
  CHART_Day_2_Data.innerHTML =
    focusStatus[2] === 0 ? "" : focusStatus[2] + "<br/>min";
  CHART_Day_2_Data.style.cssText += `--size: calc(${focusStatus[2]} / ${max});`;

  CHART_Day_3.innerHTML = GetDate(3);
  CHART_Day_3_Data.innerHTML =
    focusStatus[3] === 0 ? "" : focusStatus[3] + "<br/>min";
  CHART_Day_3_Data.style.cssText += `--size: calc(${focusStatus[3]} / ${max});`;

  CHART_Day_4.innerHTML = GetDate(4);
  CHART_Day_4_Data.innerHTML =
    focusStatus[4] === 0 ? "" : focusStatus[4] + "<br/>min";
  CHART_Day_4_Data.style.cssText += `--size: calc(${focusStatus[4]} / ${max});`;

  CHART_Day_5.innerHTML = GetDate(5);
  CHART_Day_5_Data.innerHTML =
    focusStatus[5] === 0 ? "" : focusStatus[5] + "<br/>min";
  CHART_Day_5_Data.style.cssText += `--size: calc(${focusStatus[5]} / ${max});`;

  CHART_Day_6.innerHTML = GetDate(6);
  CHART_Day_6_Data.innerHTML =
    focusStatus[6] === 0 ? "" : focusStatus[6] + "<br/>min";
  CHART_Day_6_Data.style.cssText += `--size: calc(${focusStatus[6]} / ${max});`;
}

function HideModals() {
  SECTION_Modal.style.display = "none";
  SECTION_Settings.style.display = "none";
  SECTION_Records.style.display = "none";

  ResetTimer();
  ShowEndTime();
}

function ResetPomodoro() {
  ResetProgress();
  iDoTimer = false;
  iCurrentTime_Minute = iTimeFocus;
  iCurrentTime_Second = 0;
  SetTimerFocus(true);
}

// :: 현재 타이머
let iGoalTime;
function DoTimer() {
  iDoTimer = !iDoTimer;

  if (iDoTimer) {
    // :: 현재 시간
    const now = new Date();

    // :: 골 더하기
    now.setMinutes(now.getMinutes() + Number(iCurrentTime_Minute));
    now.setSeconds(now.getSeconds() + Number(iCurrentTime_Second));

    // ::  목표 저장
    iGoalTime = now;

    SOUND_TimerOn.play();
  } else {
    SOUND_TimerOff.play();
  }
}
function PlayTimer() {
  // :: EXIT : 이미 타이머가 실행되고 있으면
  if (iDoTimer === true) return;

  DoTimer();
}
function PauseTimer() {
  // :: EXIT : 이미 타이머가 멈춰 있으면
  if (iDoTimer === false) return;

  DoTimer();
}

function DoAuto() {
  iDoAuto = BUTTON_Auto.checked;
}

let iRecordTime = -1;
function ReduceTimer() {
  UpdateTimer();
  if (iCurrentTime_Minute <= 0 && iCurrentTime_Second <= 0) {
    EndTimer();
  } else {
    const now = new Date();
    const diff = Math.round((iGoalTime.getTime() - now.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = Math.round(diff % 60);
    iCurrentTime_Minute = minutes;
    iCurrentTime_Second = seconds;

    // :: 기록
    const recordTime = iTimeFocus * 60 - diff;
    if (iRecordTime !== recordTime) {
      iRecordTime = recordTime;
      if (iState === 0) {
        PlusRecord_Focus();
      } else if (iState === 1 || iState === 2) {
        PlusRecord_Break();
      }
    }
  }
}
function PlusRecord_Focus() {
  const id = GetToday() + "_Focus";
  if (window.localStorage.getItem(id) === null) {
    window.localStorage.setItem(id, 0);
  } else {
    const currentCount = Number(window.localStorage.getItem(id)) + 1;
    window.localStorage.setItem(id, currentCount);
  }
}
function GetRecord_Focus(_subtract = 0) {
  const id = GetToday(_subtract) + "_Focus";
  return Number(window.localStorage.getItem(id));
}
function PlusRecord_Break() {
  const id = GetToday() + "_Break";
  if (window.localStorage.getItem(id) === null) {
    window.localStorage.setItem(id, 0);
  } else {
    const currentCount = Number(window.localStorage.getItem(id)) + 1;
    window.localStorage.setItem(id, currentCount);
  }
}
function GetRecord_Break() {
  const id = GetToday() + "_Break";
  return Number(window.localStorage.getItem(id));
}

function UpdateTimer() {
  const minutes = ("0" + iCurrentTime_Minute).slice(-2);
  const seconds = ("0" + iCurrentTime_Second).slice(-2);

  const time = `${minutes}:${seconds}`;
  TEXT_Timer.innerHTML = time;

  ChangeTitle(`${time} : ${nState[iState]}`);
}

function SetTimerFocus(_plus) {
  iState = 0;
  iCurrentTime_Minute = iTimeFocus;
  iCurrentTime_Second = 0;
  UpdateTimer();
  UpdateState();

  const className = "color_focus";
  SECTION_MainTimer.className = className;
  HTML_Main.className = className + "_bg";

  if (_plus) {
    PlusProgress();
  }
}

function SetTimerBreakShort() {
  iState = 1;
  iCurrentTime_Minute = iTimeBreakShort;
  iCurrentTime_Second = 0;
  UpdateTimer();
  UpdateState();

  const className = "color_shortBreak";
  SECTION_MainTimer.className = "color_shortBreak";
  HTML_Main.className = className + "_bg";
}

function SetTimerBreakLong() {
  iState = 2;
  iCurrentTime_Minute = iTimeBreakLong;
  iCurrentTime_Second = 0;
  UpdateTimer();
  UpdateState();

  const className = "color_longBreak";
  SECTION_MainTimer.className = "color_longBreak";
  HTML_Main.className = className + "_bg";

  PlusProgress();
}

function EndTimer() {
  iDoTimer = false;
  // :: 사운드 재생
  nSound[iState].play();
  if (iState == 0) {
    if (iProgress % 4 == 0) SetTimerBreakLong();
    else SetTimerBreakShort();
  } else if (iState == 1 || iState == 2) {
    if (iState == 2) ResetProgress();
    SetTimerFocus(true);
  }

  // :: Auto일 때 자동 실행
  if (iDoAuto) DoTimer();
}

function ResetProgress() {
  iProgress = 0;

  // :: 카운트 획득
  let count = SECTION_Progress.children.length;
  if (count >= 5) count = 5; // : 카운트 제한

  // :: 칠하기
  for (let index = 0; index < count; index++) {
    SECTION_Progress.children[index].style.backgroundColor = GetColor(-1);
    SECTION_Progress.children[index].style.hoverBackgroundColor = "#FFFFFF";
  }
}

function ChangeProgress(number) {
  // :: 이미 진행중이면 멈추기
  if (iDoTimer) PauseTimer();

  iProgress = number;
  if (iProgress === 5) {
    SetTimerBreakLong();
  } else {
    SetTimerFocus(false);
  }

  UpdateProgress();
}
function PlusProgress() {
  iProgress += 1;
  UpdateProgress();
}

function UpdateProgress() {
  for (let index = 0; index < 5; index++) {
    SECTION_Progress.children[index].style.backgroundColor = GetColor(
      index + 1,
    );
    SECTION_Progress.children[index].style.hoverBackgroundColor = "#FFFFFF";
  }
}
function GetColor(_index) {
  if (_index === -1) return "#C4C4C4";
  if (_index === 5) return "#7DF5D1";
  if (iProgress === _index) return "#D44949";
  return "#DB7B7B";
}

function UpdateState() {
  TEXT_State.innerHTML = nState[iState];
}

function ResetTimer() {
  // :: 이미 진행중이면 return
  if (iDoTimer) return;

  if (iState == 0) {
    iCurrentTime_Minute = iTimeFocus;
  } else if (iState == 1) {
    iCurrentTime_Minute = iTimeBreakShort;
  } else if (iState == 2) {
    iCurrentTime_Minute = iTimeBreakLong;
  }
  UpdateTimer();
}
function ResetTimer_Forced() {
  if (iDoTimer) PauseTimer();

  iCurrentTime_Second = 0;
  if (iState == 0) {
    iCurrentTime_Minute = iTimeFocus;
  } else if (iState == 1) {
    iCurrentTime_Minute = iTimeBreakShort;
  } else if (iState == 2) {
    iCurrentTime_Minute = iTimeBreakLong;
  }
  UpdateTimer();
}

Start();
