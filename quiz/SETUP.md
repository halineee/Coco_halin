# 피로연 퀴즈 이벤트: 설정 가이드

하객이 QR코드로 들어와 커플 퀴즈를 풀고, 점수로 1·2·3등을 뽑는 숨김 페이지입니다.
메뉴나 다른 페이지 어디에도 링크되어 있지 않고, 검색엔진에도 노출되지 않습니다(`noindex`).

| 용도 | 주소 |
|---|---|
| 하객용 퀴즈 | https://halineee.github.io/Coco_halin/quiz-30b1zf95/ |
| 결과 발표 (사회자/우리) | https://halineee.github.io/Coco_halin/quiz-30b1zf95/result-xjtaoau8/ |
| 결과 발표 리허설 (가짜 데이터) | 위 결과 주소 끝에 `?demo` 붙이기 |

## 파일 구성

| 파일 | 내용 |
|---|---|
| `src/quiz/quiz-data.js` | **퀴즈 문제** (질문, 보기, 정답, 사진) ← 여기만 고치면 됨 |
| `src/quiz/config.js` | Apps Script 주소 (한 곳에서만 설정) |
| `public/quiz-photos/` | 문제에 넣을 사진 |
| `quiz/apps-script/Code.gs` | 구글 스프레드시트에 붙여넣을 코드 |
| `quiz/qr-quiz.png` | 인쇄용 QR코드 (2000px, 하객용 퀴즈 주소) |
| `src/pages/quiz-30b1zf95/` | 퀴즈·결과 페이지 (수정할 필요 없음) |

---

## 1단계: 구글 스프레드시트 만들기

1. https://sheets.google.com 접속 → **빈 스프레드시트** 만들기
2. 왼쪽 위 제목을 `Quiz mariage` 처럼 알아보기 쉽게 바꾸기
   - 시트(탭)는 따로 만들 필요 없어요. 첫 응답이 들어올 때 **`Quiz`** 탭과 제목줄이 자동으로 생깁니다.

## 2단계: Apps Script 코드 붙여넣기

1. 스프레드시트 상단 메뉴 **확장 프로그램 → Apps Script**
2. 새 창이 열리면 `Code.gs` 에 있던 기본 코드(`function myFunction() {...}`)를 **전부 지우기**
3. 이 저장소의 `quiz/apps-script/Code.gs` 내용을 **전부 복사해서 붙여넣기**
4. 💾 **저장** (Ctrl+S / ⌘+S)
5. (선택) 왼쪽 위 프로젝트 이름을 `Quiz mariage` 로 변경

## 3단계: 웹 앱으로 배포하기

1. 오른쪽 위 파란 버튼 **배포 → 새 배포**
2. 톱니바퀴(⚙ 유형 선택) → **웹 앱** 선택
3. 설정:
   - 설명: `quiz` (아무거나)
   - **다음 사용자 인증 정보로 실행: 나**
   - **액세스 권한이 있는 사용자: 모든 사용자** ← 꼭 이걸로! (하객이 로그인 없이 제출해야 하므로)
4. **배포** 클릭
5. 처음에는 **액세스 승인** 창이 뜹니다:
   - 내 구글 계정 선택
   - "Google에서 확인하지 않은 앱" 경고가 나오면 → **고급** → **Quiz mariage(으)로 이동(안전하지 않음)** → **허용**
     (내가 만든 스크립트라서 나오는 정상적인 경고예요)
6. 완료 화면의 **웹 앱 URL** 을 복사
   - `https://script.google.com/macros/s/AKfycb.../exec` 처럼 **`/exec` 로 끝나는 주소**입니다.

✅ 확인: 복사한 주소를 브라우저에 붙여넣어 열면 `{"ok":true,"rows":[]}` 가 보이면 성공!

## 4단계: 사이트에 주소 붙여넣기

1. GitHub 저장소에서 `src/quiz/config.js` 열기 → 연필(✏️ Edit) 버튼
2. 이 줄을 찾아서:
   ```js
   export const APPS_SCRIPT_URL = '';
   ```
   따옴표 안에 3단계에서 복사한 주소를 붙여넣기:
   ```js
   export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
3. **Commit changes** → 1~2분 뒤 사이트에 자동 반영 (Actions 탭에서 초록 체크 확인)

## 5단계: 테스트

1. 휴대폰으로 하객용 퀴즈 주소 열기 → 이름 입력 → 끝까지 풀기
2. 마지막 화면에 **"✓ Votre réponse a bien été enregistrée."** 가 보이면 저장 성공
3. 스프레드시트의 `Quiz` 탭에 한 줄이 생겼는지 확인
4. 노트북으로 결과 주소 열기 → **Révéler** 버튼(또는 스페이스바)으로 3등 → 2등 → 1등 공개 확인

### 테스트 후 초기화 (행사 전에 꼭!)

**① 스프레드시트에서 테스트 응답 지우기**
1. 스프레드시트 아래쪽 **`Quiz` 탭** 클릭
2. 왼쪽 회색 **줄 번호 `2`** 클릭 → Shift 누른 채 마지막 줄 번호 클릭 (여러 줄 한꺼번에 선택)
3. 선택한 줄 번호 위에서 **마우스 오른쪽 클릭 → "행 2-○ 삭제"**
   - 1번째 줄(Horodatage, Nom… 제목줄)은 **남겨두세요**. 지워도 다음 응답 때 자동으로 다시 생기긴 해요.
   - 셀 내용만 Delete 키로 지우면 빈 줄이 남으니, 꼭 **행 삭제**로 지워주세요.

**② 휴대폰 초기화**
- 같은 휴대폰은 한 번 제출하면 다시 풀 수 없어요 (결과 화면만 다시 보임). 다시 테스트하려면:
  - 시크릿 창(비공개 탭)으로 열거나,
  - `src/quiz/config.js` 의 `STORAGE_KEY` 끝 숫자를 바꾸기 (`'coco-halin-quiz-v1'` → `'coco-halin-quiz-v2'`)
    → 모든 기기가 다시 풀 수 있게 됩니다. 행사 직전에 한 번 바꿔두면 안전해요.

---

## 문제 수정하기 (`src/quiz/quiz-data.js`)

문제 유형은 두 가지입니다.

**① 사지선다**
```js
{
  type: 'choix',
  question: 'Où Corentin et Halin se sont-ils rencontrés ?',
  photo: '/quiz-photos/rencontre.jpg',   // 사진 없으면 이 줄 삭제
  choix: ['À Paris', 'À Séoul', 'À Londres', 'À Tokyo'],
  reponse: 1,                            // 정답 번호 (1 = 첫 번째 보기)
},
```

**② 숫자로 답하기**
```js
{
  type: 'nombre',
  question: 'En quelle année se sont-ils rencontrés ?',
  reponse: 2019,
  tolerance: 0,      // 선택: 허용 오차 (1이면 2018~2020 모두 정답)
  unite: 'ans',      // 선택: 입력칸 옆에 표시되는 단위
},
```

- 문제는 몇 개든 추가/삭제 가능. 각 문제 블록 `{ ... },` 를 통째로 복사해서 쓰면 돼요.
- **사진**: `public/quiz-photos/` 폴더에 올리고 `photo: '/quiz-photos/파일이름.jpg'` 로 적기.
  가로 1200px 정도로 줄여서 올리면 휴대폰에서 빨리 떠요.
- 지금 들어있는 5문제는 **예시**입니다. 꼭 실제 문제로 바꿔주세요!

## 순위 규칙

1. **맞힌 개수만으로** 순위를 정합니다. (속도 경쟁 없음: 어르신들도 천천히 풀 수 있게)
2. 맞힌 개수가 같으면 **공동 순위(ex aequo)** 로, 같은 자리에 이름이 함께 나옵니다.
   예) 5문제 다 맞힌 사람이 2명이면 둘 다 1등으로 표시
3. 같은 휴대폰에서 여러 번 제출되면 **첫 번째 응답만** 인정 (Apps Script에서도 중복 차단)
4. 소요 시간은 스프레드시트에 참고용으로만 기록돼요 (화면에는 나오지 않음).

## 행사 당일 체크리스트

- [ ] 테스트 응답 삭제 + `STORAGE_KEY` 숫자 변경
- [ ] `quiz/qr-quiz.png` 인쇄 (A5 이상 권장) 또는 화면에 띄우기
- [ ] 노트북/TV에서 결과 주소 열어두기 (전체화면: F11 / ⌃⌘F)
- [ ] 발표 직전에 **Actualiser** 버튼 눌러 최신 결과 불러오기
- [ ] 저장이 실패한 하객은 휴대폰 마지막 화면(점수·시간)을 보고 스프레드시트에 직접 한 줄 추가
  (Horodatage · Nom · Bonnes réponses · Total · Temps (s), 「Appareil」 칸은 비워두기)

## Apps Script 코드를 고쳤을 때

`Code.gs` 를 수정했다면 **배포 → 배포 관리 → ✏️ 수정 → 버전: 새 버전 → 배포** 를 해야 반영됩니다.
(이렇게 하면 URL이 그대로 유지돼요. "새 배포"를 하면 URL이 바뀌니 `config.js` 도 다시 바꿔야 합니다.)

---

## 내 컴퓨터에서 미리 테스트하기

```bash
npm install          # 처음 한 번만
npm run dev
```

- 퀴즈: http://localhost:4321/Coco_halin/quiz-30b1zf95/
- 결과: http://localhost:4321/Coco_halin/quiz-30b1zf95/result-xjtaoau8/
- 결과 리허설: http://localhost:4321/Coco_halin/quiz-30b1zf95/result-xjtaoau8/?demo

확인할 것:
1. **퀴즈 흐름**: 이름 입력 → 문제 → 마지막 화면에 점수·시간 표시
   - `config.js` 주소가 비어 있으면 "Montrez cet écran aux mariés…" 문구가 나오면 정상
   - 주소를 넣으면 로컬에서도 실제 스프레드시트에 저장됩니다
2. **중간에 새로고침**: 풀던 문제부터 이어서 진행 (시간도 계속 흐름)
3. **중복 방지**: 제출 후 다시 열면 결과 화면만 보임
   → 초기화: 브라우저 개발자도구(F12) → Application → Local Storage → `coco-halin-quiz-v1` 로 시작하는 항목 삭제
4. **결과 발표**: `?demo` 로 버튼 3번 → 3등 → 2등 → 1등(꽃가루) → "Classement complet"

## QR코드 다시 만들기 (주소를 바꾼 경우만)

`quiz/qr-quiz.png` 는 하객용 퀴즈 주소로 만들어져 있어요. 주소가 바뀌면 아무 QR 생성기(예: qr-code-generator.com)에
새 주소를 넣고 PNG로 받거나, Claude에게 요청하세요.
