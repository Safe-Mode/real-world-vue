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
