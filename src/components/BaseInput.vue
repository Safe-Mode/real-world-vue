<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [Number, String],
    label: String
  },
  methods: {
    updateValue(evt) {
      this.$emit('input', evt.target.value)
    }
  }
}
</script>
