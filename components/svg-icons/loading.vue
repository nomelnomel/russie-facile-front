<template>
  <transition name="fade">
    <div v-if="$store.state.loading" class="loading">
      <svg xmlns="http://www.w3.org/2000/svg" display="block" preserveAspectRatio="xMidYMid"
           style="background:#fafafa" viewBox="0 0 100 100" class="w-1/12">
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74">
          <animate attributeName="opacity" begin="-0.9166666666666666s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(30 50 50)">
          <animate attributeName="opacity" begin="-0.8333333333333334s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(60 50 50)">
          <animate attributeName="opacity" begin="-0.75s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(90 50 50)">
          <animate attributeName="opacity" begin="-0.6666666666666666s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(120 50 50)">
          <animate attributeName="opacity" begin="-0.5833333333333334s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(150 50 50)">
          <animate attributeName="opacity" begin="-0.5s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(180 50 50)">
          <animate attributeName="opacity" begin="-0.4166666666666667s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(210 50 50)">
          <animate attributeName="opacity" begin="-0.3333333333333333s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(240 50 50)">
          <animate attributeName="opacity" begin="-0.25s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(270 50 50)">
          <animate attributeName="opacity" begin="-0.16666666666666666s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(300 50 50)">
          <animate attributeName="opacity" begin="-0.08333333333333333s" dur="1s" keyTimes="0;1" repeatCount="indefinite"
                   values="1;0"/>
        </rect>
        <rect width="5" height="11" x="47.5" y="24.5" fill="#31aabb" rx="2.5" ry="3.74" transform="rotate(330 50 50)">
          <animate attributeName="opacity" begin="0s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
        </rect>
      </svg>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loading{
  @apply flex justify-center items-center fixed z-50 top-0 left-0;
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
}
</style>
