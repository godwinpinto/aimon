<script setup lang="ts">
const  props  = defineProps(['labelTitle', 'labelStyle', 'type', 'containerStyle', 'defaultValue', 'placeholder','updateFormValue','updateType']);

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
 
const updateInputValue = (val:Event) => {
  const target=val.target as HTMLInputElement;
  console.log("val",target.value);
  if(target.value)
  props.updateFormValue( props.updateType, target.value );
};

</script>

<template>
    <div :class="`form-control w-full ${containerStyle}`">
      <label class="label">
        <span :class="`label-text text-base-content ${labelStyle}`">{{ labelTitle }}</span>
      </label>
      <input
        :type="type || 'text'"
        :value="props.defaultValue"
        :placeholder="placeholder || ''"
        @input="updateInputValue"
        class="input input-bordered w-full"
      />
    </div>
  </template>
  
