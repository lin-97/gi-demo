<template>
  <div>
    <a-card title="复选框">
      <a-space :size="20">
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox indeterminate></a-checkbox>
      </a-space>
    </a-card>
    <a-card title="单选框" style="margin-top: 20px">
      <a-radio-group>
        <a-radio value="A">A</a-radio>
        <a-radio value="B">B</a-radio>
        <a-radio value="C">C</a-radio>
        <a-radio value="D">D</a-radio>
      </a-radio-group>
    </a-card>
  </div>
</template>
