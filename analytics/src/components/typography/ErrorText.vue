<script setup lang="ts">
const  props  = defineProps(['styleClass']);

</script>
<template>
    <p :class="`text-center text-error ${props.styleClass}`"><slot></slot></p>
</template>
  
