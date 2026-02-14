---
title: npm audit 指令
date: 2019-07-18 15:27:24
tags: [note]
categories: Nodejs
---

## 概述
我们在安装依赖的时候，安装完毕后遇到一些提示：

    added 1272 packages from 726 contributors and audited 11912 packages in 26.194s
    found 10 vulnerabilities (6 moderate, 4 high)
      run `npm audit fix` to fix them, or `npm audit` for details
可能你已经注意到了 `npm audit fix` ，这个指令到底是干嘛的？

## 详解
audit 的英文含义为审查，根据提示，我们运行 `npm audit` 指令，得到如下结果

                          === npm audit security report ===

    # Run  npm install --save-dev css-loader@3.0.0  to resolve 2 vulnerabilities
    SEMVER WARNING: Recommended action is a potentially breaking change

      Moderate        Denial of Service

      Package         js-yaml

      Dependency of   css-loader [dev]

      Path            css-loader > cssnano > postcss-svgo > svgo > js-yaml

      More info       https://npmjs.com/advisories/788




      High            Code Injection

      Package         js-yaml

      Dependency of   css-loader [dev]

      Path            css-loader > cssnano > postcss-svgo > svgo > js-yaml

      More info       https://npmjs.com/advisories/813



    # Run  npm install --save-dev url-loader@2.0.1  to resolve 1 vulnerability
    SEMVER WARNING: Recommended action is a potentially breaking change

      Moderate        Regular Expression Denial of Service

      Package         mime

      Dependency of   url-loader [dev]

      Path            url-loader > mime

      More info       https://npmjs.com/advisories/535



    # Run  npm install --save-dev webpack-bundle-analyzer@3.3.2  to resolve 1 vulnerability
    SEMVER WARNING: Recommended action is a potentially breaking change

      Moderate        Cross-Site Scripting

      Package         webpack-bundle-analyzer

      Dependency of   webpack-bundle-analyzer [dev]

      Path            webpack-bundle-analyzer

      More info       https://npmjs.com/advisories/826



    # Run  npm update js-yaml --depth 5  to resolve 6 vulnerabilities

      Moderate        Denial of Service

      Package         js-yaml

      Dependency of   vue-loader [dev]

      Path            vue-loader > postcss-load-config > cosmiconfig > js-yaml

      More info       https://npmjs.com/advisories/788




      Moderate        Denial of Service

      Package         js-yaml

      Dependency of   vue-loader [dev]

      Path            vue-loader > postcss-load-config > postcss-load-options >
                      cosmiconfig > js-yaml

      More info       https://npmjs.com/advisories/788




      Moderate        Denial of Service

      Package         js-yaml

      Dependency of   vue-loader [dev]

      Path            vue-loader > postcss-load-config > postcss-load-plugins >
                      cosmiconfig > js-yaml

      More info       https://npmjs.com/advisories/788




      High            Code Injection

      Package         js-yaml

      Dependency of   vue-loader [dev]

      Path            vue-loader > postcss-load-config > cosmiconfig > js-yaml

      More info       https://npmjs.com/advisories/813




      High            Code Injection

      Package         js-yaml

      Dependency of   vue-loader [dev]

      Path            vue-loader > postcss-load-config > postcss-load-options >
                      cosmiconfig > js-yaml

      More info       https://npmjs.com/advisories/813




      High            Code Injection

      Package         js-yaml

      Dependency of   vue-loader [dev]

      Path            vue-loader > postcss-load-config > postcss-load-plugins >
                      cosmiconfig > js-yaml

      More info       https://npmjs.com/advisories/813



    found 10 vulnerabilities (6 moderate, 4 high) in 23855 scanned packages
      run `npm audit fix` to fix 6 of them.
      4 vulnerabilities require semver-major dependency updates.

当我试图忽略这些提示的时候，build的时候报错了：


    Error processing file: static/css/app.372750ed4ded50947770c65a8100b5d6.css
    (node:15776) UnhandledPromiseRejectionWarning: CssSyntaxError: E:\myProject\ug_zh_exe_old\html\static\css\app.372750ed4ded50947770c65a8100b5d6.css:254:8: Unknown word

提示我出现css的语法错误，关键是同事的macOS是正常的，只能根据官方的提示进行尝试修复，根据推测应该是package.json中某些包依赖兼容问题导致的（dev模式及是ok的）。于是执行 `npm audit fix`,但并没有帮我修正所有错误： 

    npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
    npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

    added 1 package from 4 contributors and updated 1 package in 6.45s
    fixed 6 of 10 vulnerabilities in 23855 scanned packages
      3 package updates for 4 vulns involved breaking changes
      (use `npm audit fix --force` to install breaking changes; or refer to `npm audit` for steps to fix these manually)
来吧，执行`npm audit fix --force`：

    npm WARN using --force I sure hope you know what you are doing.

    > fsevents@1.2.9 install E:\myProject\ug_zh_exe_old\html\node_modules\fsevents
    > node install

    npm WARN url-loader@2.0.1 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
    npm WARN css-loader@3.0.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.

    + url-loader@2.0.1
    + css-loader@3.0.0
    + webpack-bundle-analyzer@3.3.2
    added 92 packages from 43 contributors, removed 256 packages and updated 16 packages in 8.374s
    fixed 10 of 10 vulnerabilities in 23855 scanned packages
      3 package updates for 4 vulns involved breaking changes
      (installed due to `--force` option)
看来是ok了，再次build, 成功了，同时package.json中相应的版本也发生了变化

      -    "css-loader": "^0.28.0",
      +    "css-loader": "^3.0.0",

      -    "url-loader": "^0.5.8",
      +    "url-loader": "^2.0.1",
        
      -    "webpack-bundle-analyzer": "^2.9.0",
      +    "webpack-bundle-analyzer": "^3.3.2",

## npm audit 作用
根据官方文档可以看到如下介绍：

    Scan your project for vulnerabilities and automatically install any compatible updates to vulnerable dependencies
大意就是：检测项目依赖中的漏洞并自动安装需要更新的有漏洞的依赖，而不必再自己进行跟踪和修复

从官方文档看到还有其他指令：

    # 扫描项目漏洞把不安全的依赖项自动更新到兼容性版本
    npm audit fix

    # 在不修改 node_modules 的情况下执行 audit fix，仍然会更改 pkglock
    npm audit fix --package-lock-only

    # 跳过更新 devDependencies
    npm audit fix --only=prod

    # 强制执行 audit fix 安装最新的依赖项（toplevel）
    npm audit fix --force

    # 单纯的获取 audit fix 会做的事，并以 json 格式输出。
    npm audit fix --dry-run --json

    # 获取详情
    npm audit

    # 以 JSON 格式打印报告
    npm audit --json

## yarn audit 
`yarn install`的时候并没有相关audit的提示，只有一些warn提示：

    warning css-loader > cssnano > autoprefixer > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
    warning css-loader > cssnano > postcss-merge-rules > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
    warning css-loader > cssnano > postcss-merge-rules > caniuse-api > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
    warning webpack-bundle-analyzer > bfj-node4@5.3.1: Switch to the `bfj` package for fixes and new features!

build的时候也挂了，执行yarn autix(结果展示是表格，很赞~):

      yarn audit v1.16.0
      ┌───────────────┬──────────────────────────────────────────────────────────────┐
      │ moderate      │ Denial of Service                                            │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Package       │ js-yaml                                                      │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Patched in    │ >=3.13.0                                                     │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Dependency of │ css-loader                                                   │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Path          │ css-loader > cssnano > postcss-svgo > svgo > js-yaml         │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ More info     │ https://www.npmjs.com/advisories/788                         │
      └───────────────┴──────────────────────────────────────────────────────────────┘
      ┌───────────────┬──────────────────────────────────────────────────────────────┐
      │ high          │ Code Injection                                               │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Package       │ js-yaml                                                      │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Patched in    │ >=3.13.1                                                     │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Dependency of │ css-loader                                                   │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Path          │ css-loader > cssnano > postcss-svgo > svgo > js-yaml         │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ More info     │ https://www.npmjs.com/advisories/813                         │
      └───────────────┴──────────────────────────────────────────────────────────────┘
      ┌───────────────┬──────────────────────────────────────────────────────────────┐
      │ moderate      │ Regular Expression Denial of Service                         │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Package       │ mime                                                         │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Patched in    │ >= 1.4.1 < 2.0.0 || >= 2.0.3                                 │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Dependency of │ url-loader                                                   │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Path          │ url-loader > mime                                            │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ More info     │ https://www.npmjs.com/advisories/535                         │
      └───────────────┴──────────────────────────────────────────────────────────────┘
      ┌───────────────┬──────────────────────────────────────────────────────────────┐
      │ moderate      │ Cross-Site Scripting                                         │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Package       │ webpack-bundle-analyzer                                      │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Patched in    │ >=3.3.2                                                      │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Dependency of │ webpack-bundle-analyzer                                      │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ Path          │ webpack-bundle-analyzer                                      │
      ├───────────────┼──────────────────────────────────────────────────────────────┤
      │ More info     │ https://www.npmjs.com/advisories/826                         │
      └───────────────┴──────────────────────────────────────────────────────────────┘
      4 vulnerabilities found - Packages audited: 11908
      Severity: 3 Moderate | 1 High
      Done in 3.61s.
执行`npm audit fix --force`，结果同`npm audit`，貌似yarn暂时只能手动处理，不会做相关自动化处理，详见参考三~

## 参考
1. [npm audit](https://docs.npmjs.com/cli/audit)
2. [npm audit 二三事](http://eux.baidu.com/blog/fe/npm%20aduit%E4%BA%8C%E4%B8%89%E4%BA%8B)
3. [[feat] yarn audit fix #7075](https://github.com/yarnpkg/yarn/issues/7075)