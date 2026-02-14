<template>
  <div class="image-wrapper">
    <img
      :src="src"
      :alt="alt"
      :class="['custom-image', className]"
      :style="computedStyle"
      @load="onLoad"
      @error="onError"
    />
    <div v-if="loading" class="image-loading">加载中...</div>
    <div v-if="error" class="image-error">图片加载失败</div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CustomImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: '图片'
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const loading = ref(true)
    const error = ref(false)

    const computedStyle = computed(() => {
      const style = {}
      if (props.width) {
        style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      }
      if (props.height) {
        style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
      }
      return style
    })

    const onLoad = () => {
      loading.value = false
      error.value = false
    }

    const onError = () => {
      loading.value = false
      error.value = true
    }

    return {
      loading,
      error,
      computedStyle,
      onLoad,
      onError
    }
  }
})
</script>

<style scoped>
.image-wrapper {
  position: relative;
  display: inline-block;
}

.custom-image {
  max-width: 100%;
  height: auto;
  display: block;
}

.image-loading,
.image-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  color: #666;
  font-size: 14px;
}

.image-error {
  color: #f56c6c;
}
</style>