<template>
  <div
    :style="{
      position: 'relative',
      height: '100%',
      width: '100%',
    }"
  >
    <ArtPlum
      :style="{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }"
    />

    <RouterView />
  </div>
</template>
