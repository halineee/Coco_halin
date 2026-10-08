# Corentin & Halin — 결혼식 웹사이트

서울 결혼식(2027년 8월 14일)을 위한 프랑스어 웹사이트입니다.
[Astro](https://astro.build)로 만들었고, GitHub Pages에 자동으로 배포됩니다.

## 내용 수정하기 (코드 몰라도 OK)

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 이름, 날짜, 소개 문구, 장소, 지도 링크, 메뉴 | `src/content/site.yaml` |
| 홈 폴라로이드 사진 | `src/assets/photos/accueil/` 에 사진을 넣고 `site.yaml` 의 `heroPhoto` 에 파일 이름 적기 |
| 색상, 폰트, 간격 | `src/styles/tokens.css` |
| 갤러리 ‘En attendant le grand jour…’ 사진 | `src/assets/photos/en-attendant/` 폴더에 사진 넣기 |
| 갤러리 ‘Une histoire en images’ 사진 | `src/assets/photos/histoire/` 폴더에 사진 넣기 |
| 갤러리 제목·문구, 사진 설명, 크게 보일 사진 | `src/content/photos.yaml` |
| 호텔 (동네 설명, 호텔 카드) | `src/content/hotels.yaml` (사진은 선택, `src/assets/hotels/`) |
| Carnet de voyage 소개 문구 | `src/content/carnet.yaml` |
| 도시 페이지 (볼거리, 먹거리, 할거리, 팁, 우리 추천 맛집) | `src/content/destinations/도시이름.yaml` + 사진은 `src/assets/destinations/` |
| 먹거리 페이지 (À table !) | `src/content/a-table.yaml` |
| 자주 묻는 질문(Questions pratiques), WhatsApp 번호 | `src/content/site.yaml` 의 `faq`, `contact` |
| 참석 여부 폼(RSVP) | `src/content/site.yaml` 의 `rsvp` (아래 설명 참고) |
| 메뉴 아이콘 그림 | `src/components/Icon.astro` |
| Getting Married 타이틀, 하트라인, 꽃다발·편지, 마스킹테이프 | `src/assets/illustrations/` 안의 파일을 같은 이름으로 교체 |
| 각 페이지 메인 제목 (Photos, Transports, Hôtels, Carnet de voyage) | `src/assets/illustrations/titres/` 안의 파일을 같은 이름으로 교체 |

- 사진은 `src/assets/` 아래에 넣으면 자동으로 최적화(압축·크기 조절)됩니다. 원본 그대로 넣어도 됩니다.
- `.yaml` 파일은 `이름: "값"` 형식입니다. 따옴표 안의 글자만 바꾸면 됩니다. 들여쓰기(띄어쓰기)는 그대로 유지해 주세요.
- 갤러리 사진은 **파일 이름 순서**(01.jpg, 02.jpg …)로 표시됩니다. 임시 사진은 지우고 내 사진을 넣으면 됩니다.
- 장소·음식 사진은 위키미디어 공용의 자유 라이선스 사진입니다. 출처는 `src/content/credits.yaml` 과 사이트의 「Crédits photos」 페이지에 있습니다. 사진을 바꾸면 이 목록에서도 해당 줄을 지워 주세요.
- 갤러리(Photos) 사진은 아직 임시 이미지(“photo à venir”)입니다.

### 참석 여부(RSVP) 폼 연결하기

답변은 구글 폼 → 구글 스프레드시트에 쌓입니다. (GitHub Pages는 서버가 없어서 GitHub에 직접 저장할 수 없어요.)

1. [구글 폼](https://forms.google.com)에서 새 폼을 만들고, 아래 6개 질문을 **모두 단답형/장문형**으로 추가합니다 (필수 체크 X):
   이름 · 참석 여부 · 인원 · 애프터파티 · 알레르기/식단 · 메시지
2. 응답 탭 → 스프레드시트 연결
3. 폼의 「보내기 → 링크」를 Claude에게 주면 `site.yaml` 의 `rsvp.googleForm` 을 채워 드립니다.
   (`action` 이 비어 있으면 폼은 사이트에 표시되지 않습니다.)

### Feeling Passionate 폰트 사용하기

현재 제목 폰트는 비슷한 무료 폰트(Comforter Brush)로 대체되어 있습니다.
Canva 폰트를 웹에서 쓸 수 있는 라이선스가 있다면 `src/styles/fonts.css` 안의 안내를 따라 주세요.
폴라로이드 아래 이름(Sulat Rizal)도 같은 방식이며, 그 전까지는 Sacramento 폰트로 표시됩니다.

## 내 컴퓨터에서 미리보기

```bash
npm install      # 처음 한 번만
npm run dev      # http://localhost:4321/Coco_halin/ 에서 확인
```

## 배포 (GitHub Pages)

1. GitHub 저장소 → **Settings → Pages → Source** 를 **GitHub Actions** 로 설정 (처음 한 번만)
2. `main` 브랜치에 변경 사항이 올라가면 자동으로 배포됩니다.
3. 주소: https://halineee.github.io/Coco_halin/

※ 무료 GitHub 계정에서는 **공개(public) 저장소**만 GitHub Pages를 쓸 수 있습니다.

## 폴더 구조

```
src/
  content/      ← 텍스트·정보 (여기만 고치면 대부분 해결)
  assets/       ← 사진
  components/   ← 재사용 블록 (메뉴, 폴라로이드, 지도 버튼…)
  layouts/      ← 모든 페이지 공통 틀
  pages/        ← 페이지 하나 = 파일 하나 (주소와 동일)
  styles/       ← 색상·폰트·공통 스타일
scripts/        ← 임시 이미지 생성 도구
```
