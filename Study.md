# Storybook 공부

# learnstorybook-design-system

깃허브(Github)와 create-react-app으로 저장소 만들기

```bash
// 연습할 boilerplate-code 설치
npx degit chromaui/learnstorybook-design-system-template learnstorybook-design-system
```

> 깃허브(GitHub)로부터 폴더를 다운로드 받기 위해 degit 사용.

## 깔끔한 코드를 위한 형식과 린트 (Lint)

```bash
// prettier 설치
yarn add --dev prettier

// development mode Storybook 실행
yarn storybook
```

## 스토리북 설치하기

스토리북은 독자적인 UI 컴포넌트를 개발하기 위한 업계 표준 컴포넌트 탐색기 입니다.

- UI 컴포넌트들을 카탈로그화 하기
- 컴포넌트 변화를 스토리들(Stories)로 저장하기
- 핫 모듈 재 로딩과 같은 개발 툴 경험을 제공하기
- 리액트를 포함한 다양한 뷰 레이어 지원하기

```bash
// 스토리북 설치
npx storybook init

// 스토리북 실행
yarn storybook
```

## 글로벌 스타일 추가하기

```javascript
import { GlobalStyle } from "../src/shared/global";

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
```

## 폰트 태그 추가하기

스토리북에서 설정하는 가장 쉬운 방법은 .storybook/preview-head.html 파일에서 <head> 태그에 직접 <link> 태그를 추가하는 것입니다.

## 애드온 인터랙션(interaction)을 통한 인터랙티브한 스토리들

```bash
yarn add --dev @storybook/addon-interactions @storybook/testing-library
```

```javascript
// ./storybook/main.js

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions", // add
  ],
  framework: "@storybook/react",
  staticDirs: ["../public"],
};
```

## 스토리북 퍼블리싱하기

- 설치

```bash
npm install --save-dev chromatic
```

- 스토리북 빌드 후 배포

```bash
npx chromatic --project-token=<project-token>
```

- 확인

  https://634f57a42d5f5130eba011a8-soyxezqcer.chromatic.com/?path=/story/example-introduction--page

## 지속적 통합 (CI)

지속적 통합 (CI)은 현대 웹 앱을 관리하기 위한 실질적인 수단

코드를 push할 때 테스트, 분석, 배포와 같은 행동을 제어할 수 있게함

### GitHub Actions 사용

1. 디렉토리 최상위에 .github 디렉토리를 추가합니다.
2. 그 안에 workflows라는 디렉토리를 만듭니다.
3. chromatic.yml 이라는 파일을 생성합니다.

- 이는 CI 프로세스가 작동되도록 지시하게 만들어줍니다.
- 작은 것부터 시작하고. 점차 발전시켜 나갑니다.
