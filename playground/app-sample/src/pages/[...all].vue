<script lang="ts" setup>
const { count1, count2, sum } = useSum()
const id = ref(uid())

function onClick() {
  id.value = uid()
}
</script>

<template>
  <div>
    <div>
      <input v-model="count1" type="number">
      +
      <input v-model="count2" type="number">
      =
      {{ sum }}
    </div>

    <div>
      {{ id }}
      <button @click="onClick">
        Change id
      </button>
    </div>
  </div>
</template>
