<template>
  <div class="loading-2">
    <svg
      class="icon"
      viewBox="0 0 14 14"
      version="1.1"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      size="medium"
    >
      <foreignObject x="1" y="1" width="12" height="12"><div class="gradient"></div></foreignObject>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@keyframes t-spin {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading-2 {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  color: rgb(var(--primary-6));
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  font-size: 36px;
  .icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    animation: t-spin 0.3s linear infinite;
  }
  .gradient {
    width: 100%;
    height: 100%;
    background: conic-gradient(from 90deg at 50% 50%, #fff 0deg, currentcolor 360deg);
    border-radius: 20px;
    -webkit-mask: radial-gradient(transparent calc(50% - 0.5px), #fff 50%);
    mask: radial-gradient(transparent calc(50% - 0.5px), #fff 50%);
  }
}
</style>
