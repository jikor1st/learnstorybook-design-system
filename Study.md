# Storybook 공부

[doc] : https://storybook.js.org/tutorials/design-systems-for-developers/react/ko

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

```yml
# .github/workflows/chromatic.yml

# Name of our action
name: "Chromatic"
# The event that will trigger the action
on: push

# What the action will do
jobs:
  test:
    # The operating system it will run on
    runs-on: ubuntu-latest
    # The list of steps that the action will go through
    steps:
      - uses: actions/checkout@v1
      - run: yarn
        #👇 Adds Chromatic as a step in the workflow
      - uses: chromaui/action@v1
        # Options required for Chromatic's GitHub Action
        with:
          #👇 Chromatic projectToken, see https://storybook.js.org/tutorials/design-systems-for-developers/react/en/review/ to obtain it
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

그 이후 add, commit, push 플로우는 같습니다.

```bash
git add .

git commit -m "commit message"

git push origin main
```

## 팀에게 비주얼 리뷰 요청하기

새로운 브랜치에 UI 변경 후 비주얼 리뷰 과정

- 브랜치 생성 후 이동

```bash
git checkout -b improve-button
```

- UI 수정 또는 변경

- 변동사항 commit, push

```bash
git commit -am "make Button pop"
git push -u origin improve-button
```

# 테스트

## 품질 유지를 위한 테스트

디자인 시스템 외관, 기능성 및 접근성을 테스트하는 방법

UI 버그를 방지하기 위해 디자인 시스템 테스트를 자동화합니다.

## 테스트 준비

## 외관에 대한 시각적 테스트

시각적 테스트는 렌더링 된 UI의 시각적 측면을 검증합니다.

1. 시각적 테스트는 일관된 브라우저 환경에서 모든 UI 컴포넌트의 이미지를 캡쳐합니다.
2. 새 스크린샷은 이전에 테스트를 통과하여 기준 버전으로 지정되었던 스크린샷과 자동으로 비교됩니다.
3. 시각적 차이가 있으면 알림을 받을 수 있습니다.

## 기능성에 대한 단위 테스트

단위 테스트는 제어된 입력이 주어졌을 때 UI 코드가 올바른 출력을 반환하는지 확인합니다. 컴포넌트와 함께 존재하며 특정 기능을 검증하는데 도움이 됩니다.

- href에 대한 단위 테스트

Link 컴포넌트에 대한 단위 테스트를 추가합니다.

```javascript
// src/Link.test.js

import { render } from "@testing-library/react";
import { Link } from "./Link";

test("has a href attribute when rendering with linkWrapper", () => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  const LinkWrapper = (props) => <a {...props} />;
  const { container } = render(
    <Link href="https://storybook.js.org/tutorials/" LinkWrapper={LinkWrapper}>
      Link Text
    </Link>
  );

  const linkElement = container.querySelector(
    'a[href="https://storybook.js.org/tutorials/"]'
  );
  expect(linkElement).not.toBeNull();
  expect(linkElement.textContent).toEqual("Link Text");
});
```

- 단위 테스트 실행

```bash
yarn test
```

- workflows에 테스트 포함

```yml
# ... Same as before
jobs:
  test:
    # The operating system it will run on
    runs-on: ubuntu-latest
    # The list of steps that the action will go through
    steps:
      - uses: actions/checkout@v1
      - run: yarn
+     - run: yarn test # Adds the test command
        #👇 Adds Chromatic as a step in the workflow
      - uses: chromaui/action@v1
        # Options required for Chromatic's GitHub Action
        with:
          #👇 Chromatic projectToken, see https://storybook.js.org/tutorials/design-systems-for-developers/react/en/review/ to obtain it
          projectToken: project-token
          token: ${{ secrets.GITHUB_TOKEN }}
```

> ! 주의할것: 업데이트를 번거롭게 만들 수 있는 너무 만은 단위 테스트에 주의를 해야합니다. 디자인 시스템에 대한 단위 테스트를 적당한 수준에서 할 것을 권장합니다.

## 접근성 테스트

> "접근성은 장애가 있는 사용자를 포함한 모든 사용자가 애플리케이션을 이해하고 탐색하고 상호 작용을 할 수 있음을 의미합니다. 온라인 [예제]에는 탭 키나 스크린 리더를 통해 사이트를 탐색하는 것처럼 콘텐츠에 접근할 수 있는 다른 방법들을 포함했습니다."

- 스토리북의 접근성 애드온
  웹 접근성 표준(WCAG)을 실시간으로 확인하기 위한 도구

  ```bash
  yarn add --dev @storybook/addon-a11y
  ```

- 설치한 애드온 추가

  ```javascript
  // .storybook/main.js
  module.exports = {
    //...
    addons: [
      //....
      //....
      "@storybook/addon-a11y",
    ],
    //...
  };
  ```

- .storyook/preview.js 파일 parameters 업데이트

  a11y 설정을 추가합니다.

  ```javascript
  // .storybook/preview.js

  export const parameters = {
    //....
    a11y: {
      // the target DOM element
      element: "#root",
      // sets the execution mode for the addon
      manual: false,
    },
  };
  ```

  설정이 완료되면 스토리북 애드온 패널에 새로운 "접근성" 탭이 표시

## 기타 테스트 전략

테스트는 시간을 절약해주기도 하지만 유지 관리로 인해 개발 속도를 저하시킵니다.
모든 것이 아니라 올바른 것을 테스트하는데 집중해야합니다.

소프트웨어 개발에는 많은 테스트 전략이 있지만 모두 디자인 시스템에 적합하지 않다는 견해

### 스냅샷 테스트 (Jest)

이 기술은 UI 컴포넌트의 코드 출력을 캡처하여 이전 버전과 비교합니다. UI 컴포넌트 마크업을 테스트하면 결국에는 사용자가 브라우저에서 경험하는 것을 테스트하는 것이 아닌 구현 세부 정보(코드)를 테스트하게 됩니다.

변경된 코드 스냅샷 비교는 예측할 수 없으며 긍정 오류(false positive)가 발생하기 쉽습니다. 컴포넌트 수준에서의 코드 스냅 샷은 디자인 토큰, CSS 및 타사 API 업데이트 (웹 글꼴, 스트라이프 양식, Google 지도 등)와 같은 전체적인 변경 사항을 탐지할 수 없습니다. 실제로 개발자는 "모두 승인"하거나 스냅 샷 테스트를 모두 무시합니다.

=> 실제로 렌더링되는 화면을 테스트하는것이 더 정확할 수 있다.

### 엔드 투 엔드(End to end) 테스트 (Selenium, Cypress)

엔드 투 엔드 테스트는 컴포넌트 DOM을 탐색하여 사용자의 작업 절차를 시뮬레이션합니다. 가입 또는 결제 프로세스와 같은 앱 작업 절차를 확인하는 데 가장 적합합니다. 이 테스트 전략은 기능이 복잡할수록 더 유용합니다.

디자인 시스템은 비교적 단순한 기능을 가진 단일 컴포넌트를 포함합니다. 사용자 작업 절차에 대한 유효성 검사는 테스트를 생성하는 데 시간이 많이 걸리고 유지 관리를 하기에도 취약하기 때문에 여기에는 적합하지 않은것으로 간주되는 편입니다. 그러나 컴포넌트가 드물게 엔드 투 엔드 테스트의 이점을 누릴 수 있는 경우도 있습니다. 예를 들면, 날짜 선택기 또는 자체 내장된 결제 양식과 같은 복잡한 UI의 유효성을 검사하는 경우입니다.

## 이해관계자를 위한 문서

문서화를 통하여 디자인 시스템 도입을 촉진하기

### 요구사항

문서화의 달성해야할 가치

- 최신 상태 유지를 위한 최신 프로덕션 코드 사용
- 글쓰기를 용이하게 하기 위한 마크다운과 같은 친숙한 쓰기 도구를 사용
- 유지보수 시간 단축을 통해 팀이 글쓰기에만 집중 가능한 환경 조성
- 상용구 기능을 제공하여 개발자가 공통 패턴을 재작성 하는 것을 방지
- 맞춤형 기능을 제공하여 유난히 복잡한 유즈 케이스 및 컴포넌트를 위한 유용성 제공

## 스토리 작성, 문서 생성

스토리북 Docs 애드온 (addon)을 사용하면 기존 스토리에서 기본 설정을 가져와서 유지 관리 시간을 절감할 수 있는 풍부한 문서 자료를 생성할 수 있습니다.

스토리 북을 열 때마다 두 개의 탭이 표시됩니다.

- "Canvas" 탭은 컴포넌트 개발 환경입니다.
- "DOcs" 탭은 컴포넌트 문서를 보여줍니다.

스토리북 Docs 애드온은 각 컴포넌트에 대한 새로운 "Docs" 탭을 만듭니다.

## 문서 확장

- 컴포넌트의 기능을 설명하는 메타데이터 추가

  - 용도를 설명하는 부제 추가

  ```javascript
  // src/Avatar.stories.js

  export default {
    //....
    parameters: {
      componentSubtitle:
        "Displays an image that represents a user or organization",
    },
    //...
  };
  ```

  - Avatar 컴포넌트에 대한 설명을 제공하는 JSdoc 추가

  ```bash
  # 설치
  npm install --save-dev story-description-loader
  ```

  ???? 여기 잘 안됨 JSdoc 추후 다시 적용

  - 각 스토리 별 내용 추가

  ```javascript
  // src/Avatar.stories.js
  Sizes.parameters = {
    docs: {
      // The story now contains a description
      storyDescription: "4 sizes are supported.",
    },
  };
  ```

  - Markdown/MDX를 사용한 Supercharge 문서화

  모든 컴포넌트는 다르기 때문에 문서화에 대한 요구사항도 다를 수밖에 없습니다.

  Markdown은 텍스트 작성을 위한 직관적인 서식입니다. MDX를 사용하면 Markdown 내에서 대화형 코드(JSX)를 사용할 수 있습니다. 스토리북 Docs는 MDX를 사용하여 개발자가 문서 렌더링 방식을 완벽하게 제어할 수 있도록 합니다.

  스토리북 설치 절차에서 MDX 파일이 기본적으로 등록됩니다. .storybook/main.js에서 다음과 같이 확인이 가능합니다.

  ```javascript
  module.exports = {
    stories: [
      "../src/**/*.stories.mdx", // MDX
      "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    //...
  };
  ```

  - MDX를 작성

    새로운 src/Avatar.stories.mdx 파일을 만들고 세부 정보를 제공합니다.
    Avatar.stories.js 파일을 제거한 후 mdx 파일에 스토리를 다시 생성합니다.

    > src/Avatar.stories.mdx 를 확인합니다.

    - Doc Blocks
      스토리북은 대화식 미리 보기, 인자 테이블 등과 같은 미리 만들어진 컴포넌트가 함께 제공됩니다.

      - Canvas
      - ArgsTable

  - 맞춤 페이지

  모든 디자인 시스템에는 표지가 함께 제공됩니다. 스토리북 Docs에서는 MDX를 사용하여 개별 페이지를 만들 수 있습니다.

  > 새 파일 생성 src/Intro.stories.mdx

  자동화된 컴포넌트 문서 페이지와 독립적인 새로운 문서 전용 페이지가 생성됩니다.

  맨 위에 나타나게 하려면 스토리북에 .storybook/main.js에 소개 파일을 로드하도록 지시해야 합니다.

  ```javascript
  // .storybook/main.js

  module.exports = {
    // Changes the load order of our stories. First loads the Intro page
    // automatically import all files ending in *.stories.js|mdx
    stories: [
      "../src/Intro.stories.mdx",
      "../src/**/*.stories.mdx",
      "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/preset-create-react-app",
      "@storybook/addon-a11y",
      "@storybook/addon-interactions",
    ],
    framework: "@storybook/react",
    staticDirs: ["../public"],
  };
  ```

  ## 온라인에 문서 퍼블리싱

  위에서 시각적 검토를 위해 온라인으로 스토리북을 퍼블리쉬했습니다. 컴포넌트 문서도 동일한 방식을 사용하여 쉽게 퍼블리쉬할 수 있습니다. docs 모드에서 스토리북을 빌드하기 위해 package.json에 새 스크립트를 추가해 봅니다.

  ```json
  {
    "scripts": {
      "build-storybook-docs": "build-storybook --docs"
    }
  }
  ```

## UI 배포

디자인 시스템을 다른 앱에 패키징하고 import하는 방법을 배웁니다.

- 디자인 시스템을 배포하며 UI 컴포넌트를 패키징
- 컴포넌트를 다른 앱에 가져오는 것
- 배포와 버전관리의 효율성을 높이기 위한 시간 절약 기술

### 디자인 시스템 패키징

조직은 수천 개의 UI 컴포넌트들을 서로 다른 앱에 분산시켜둡니다. 이전에는 디자인 시스템에서 가장 흔한 컴포넌트를 추출해서 디자인 시스템에 포함시켰는데, 이제 이 컴포넌트를 앱에 다시 적용합니다.

디자인 시스템은 Javascript 패키지 매니저인 npm을 통해 배포, 버전관리, 의존성(dependency) 관리를 합니다.

초기 디자인 시스템의 경우 가장 직접적인 방법은 아래 목록을 포함하는 단일 버전 패키지를 발행하는 것입니다.

- 공통적인 UI 컴포넌트
- 디자인 토큰 (style variables와 같은)
- 문서화

### export 하기 위한 디자인 시스템 준비

디자인 시스템의 출발점으로 Create React App을 사용했는데 여전히 초기 앱의 흔적이 남아있습니다.
정리가 필요합니다.

1. README.md 를 조금 더 구체적으로 업데이트 합니다.

```md
# 스토리북(Storybook) 디자인 시스템 튜토리얼

스토리북 디자인 시스템 튜토리얼은 [스토리북 디자인 시스템](https://github.com/storybookjs/design-system/)의 일부로 디자인 시스템을 어떻게 만들고 배포할지 가장 효율적인 방법을 배우고 싶은 사람들을 위한 학습 자료로 제작되었습니다.

더 자세한 내용은 [스토리북 튜토리얼](https://storybook.js.org/tutorials/)를 참고하세요.
```

2. 디자인 시스템의 공통 도입부 생성

> src/index.js 파일 생성 및 모든 디자인 토큰과 컴포넌트 export

3. 개발 패키지 빌드(build) 과정에서 도와줄 @babel/cli 와 cross-env를 사용

```bash
yarn add --dev @babel/cli cross-env
```

4. package.json의 build 스크립트 수정

```json
// package.json
{
  "scripts": {
    "build": "cross-env BABEL_ENV=production babel src -d dist"
  }
}
```

5. package.json babel 키 업데이트

```json
// package.json
"babel": {
  "presets": [
    [
      "react-app",
      {
        "absoluteRuntime": false
      }
    ]
  ]
}
```

6. 원치 않는 commit을 피하기 위해 dist => gitignore에 추가
   dist 디렉토리 안에 yarn build를 통해서 코드를 빌드할 수 있습니다.
   그리고 커밋하게 될때 원치 않는 commit을 피하기 위해 dist 디렉토리를 .gitignore에 추가합니다.

   ```json
   //....
   dist
   ```

7. 퍼블리싱을 위한 패키지 메타데이터 추가

- npm에 올릴 패키지를 위한 고유한 이름을 적어야합니다.
- 나머지는 대게 답이 미치 채워져 있습니다.

```bash
# Initializes a scoped package
yarn init --scope=@your-npm-username

yarn init v1.22.5
question name (learnstorybook-design-system): @your-npm-username/learnstorybook-design-system
question version (0.1.0):
question description (Learn Storybook design system):Storybook design systems tutorial
question entry point (dist/index.js):
question repository url (https://github.com/your-username/learnstorybook-design-system.git):
question author (your-npm-username <your-email-address@email-provider.com>):
question license (MIT):
question private: no
```

> 패키지의 스코프를 통해 다른 유저나 조직이 생성한 패키지와 동일한 이름의 패키지를 충돌없이 만들 수 있습니다.
> 관련 레퍼런스 : https://docs.npmjs.com/creating-and-publishing-scoped-public-packages

이제 패키지가 준비 되었으니 npm에 배포를 할 수 있습니다.

## Auto로 배포 관리

- 변경된 부분을 기록하는 changelog를 업데이트
- 유효한 버전의 숫자를 입력
- 저장소의 commit에 있는 버전 숫자와 깃(git) 태그가 연결되도록 만드는 과정

위의 과정을 거쳐서 npm에 배포를 합니다. 이 모든 과정을 위해 만들어진 Auto라고 불리는 오픈소스 툴을 사용합니다.

- Auto 설치

  ```bash
  yarn add --dev auto
  ```

  Auto는 배포 관리시 일어날 수 있는 다양하고 흔한 과제를 수행할 때 사용할 수 있는 커맨드 라인 툴입니다.

  > Auto 문서 사이트 : https://intuit.github.io/auto/

  1. GitHub 토큰과 npm 토큰 생성
