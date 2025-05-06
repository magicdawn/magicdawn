# electron-builder

## 忽略 `node_modules`

`files` 默认规则

- Default pattern `**/*` is not added to your custom if some of your patterns is not ignore (i.e. not starts with !).
- package.json and `**/node_modules/**/*` (only production dependencies will be copied) is added to your custom in any case.
- All default ignores are added in any case — you don’t need to repeat it if you configure own patterns.

```js
// default ignores
;[
  '**/*',
  '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
  '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
  '!**/node_modules/*.d.ts',
  '!**/node_modules/.bin',
  '!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
  '!.editorconfig',
  '!**/._*',
  '!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
  '!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}',
  '!**/{appveyor.yml,.travis.yml,circle.yml}',
  '!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}',
]
```

如果已经 bundle 所有依赖, 使用 `!**/node_modules/**` 来忽略默认的 asar 包含 node_modules 行为 <br />
注意 `!**/node_modules/**` 或 `!**/node_modules/**/*`, 而 `!**/node_modules/` 不起作用,
electron build 对文件夹/文件处理比较诡异,建议全部使用文件 pattern, 即 `**/*`

```yaml
files:
  - '!**/node_modules/**'
```
