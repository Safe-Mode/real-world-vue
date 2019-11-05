<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @change="updateValue" v-bind="$attrs">
      <option
        v-for="option in options"
        :selected="option === value"
        :value="option"
        :key="option"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
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
