export default {
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    'public/**/*'
  ],
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard', // 基础 CSS 规则
    'stylelint-config-standard-scss', // SCSS 推荐规则
    'stylelint-config-recommended-vue/scss', // Vue + SCSS 推荐规则（自动适配 scoped）
    'stylelint-config-recess-order' // 配置 stylelint css 属性书写顺序插件
  ],
  rules: {
    // 禁用导致错误的规则
    'scss/double-slash-comment-empty-line-before': null, // 禁止在双斜杠注释前有空行
    'scss/operator-no-unspaced': null, // 运算符周围需要空格
    'scss/load-partial-extension': null, // 禁止在@use指令中使用.scss扩展名
    'scss/double-slash-comment-whitespace-inside': null, // 双斜杠注释内部需要空格
    'scss/dollar-variable-empty-line-before': null, // $变量前需要空行
    'scss/at-rule-conditional-no-parentheses': null, // @规则条件不使用括号
    'no-descending-specificity': null, // 禁止选择器优先级降低
    'declaration-block-no-duplicate-properties': null, // 禁止声明块中重复的属性
    'keyframes-name-pattern': null, // 限制keyframes名称格式
    'number-max-precision': null, // 禁用数字精度限制规则
    'import-notation': null, // 导入语法格式
    'font-family-no-missing-generic-family-keyword': null, // 字体族必须包含通用字体族
    'custom-property-empty-line-before': null, // 自定义属性前空行规则
    'declaration-empty-line-before': null, // 声明前空行规则
    // 其他基础规则
    'no-empty-source': null, // 禁止空源码
    'selector-class-pattern': null // 强制选择器类名的格式
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ]
}
