<template>
  <div class="image-view">
    <a-row>
      <GiImageView :zoom="true"></GiImageView>
      <section class="right"></section>
    </a-row>

    <a-row class="bbb">
      <GiImageView :zoom="false" autoplay></GiImageView>
      <section class="right"></section>
    </a-row>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bbb {
  margin-top: 40px;
}
.right {
  flex: 1;
  height: 100%;
  background-color: skyblue;
}
</style>
