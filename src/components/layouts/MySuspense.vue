<template>
  <Suspense>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</template>
<script>
export default {
  name: "MySuspense",
};
</script>