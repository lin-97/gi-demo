<template>
  <span class="gi-more-icon-wrap">
    <span class="gi-more-icon">
      <i class="block block-top"></i>
      <i class="block block-bottom"></i>
    </span>
  </span>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.gi-more-icon-wrap {
  position: relative;
  box-sizing: border-box;
  display: flex;
  text-align: left;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  margin-left: 5px;
  top: -1px;

  .gi-more-icon {
    display: inline-block;
    color: var(--color-text-2);
    cursor: pointer;
    transition: transform 0.3s ease-out;

    .block {
      position: relative;
      display: block;
      width: 14px;
      height: 8px;

      .block-top:before {
        transition: transform 0.3s ease-out 0.3s;
      }
    }

    .block:before {
      position: absolute;
      top: 2px;
      left: 0;
      width: 6px;
      height: 6px;
      content: '';
      background: var(--color-text-3);
    }

    .block:after {
      position: absolute;
      top: 2px;
      left: 8px;
      width: 6px;
      height: 6px;
      content: '';
      background: var(--color-text-3);
    }
  }
}

.gi-more-icon-wrap:hover .gi-more-icon .block:before,
.arco-dropdown-open .gi-more-icon .block:before {
  background: rgb(var(--primary-6));
  transform: rotate(45deg);
}

.gi-more-icon-wrap:hover .gi-more-icon .block:after,
.arco-dropdown-open .gi-more-icon .block:after {
  background: rgb(var(--primary-6));
}

.gi-more-icon-wrap:hover .gi-more-icon,
.arco-dropdown-open .gi-more-icon {
  transform: rotate(90deg);
}
</style>
