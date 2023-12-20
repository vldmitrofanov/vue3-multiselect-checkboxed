<template>
  <div ref="selectWrapperRef">
    <div class="y8dw7zjbs4" @click="showDropdown">
      <div class="bgsn7nn2nh"></div>
      <select :class="styleSelectClass" ref="multiselectRef">
        <option value="">{{ message }}</option>
      </select>
    </div>
    <div :class="styleDropdownClass" v-show="show" ref="dropdownRef">
      <div v-if="hasSearch" :class="styleSearchClass">
        <label
          >Search (min 3):
          <span>
            <input type="text" v-model="filter" />
            <button @click="filter = ''" :disabled="filter.length < 1">
              Clear
            </button>
          </span>
        </label>
      </div>
      <ul>
        <li v-show="filter.length < 3">
          <label>
            <input
              type="checkbox"
              ref="toggleAllIdRef"
              @change="toogleAll($event.target.checked)"
            />
            <span></span>
            <strong>Select All</strong></label
          >
        </li>
        <li v-for="(option, index) in options" :key="`fsjh${index}ruei`">
          <label>
            <input
              type="checkbox"
              :value="option[bindValue]"
              v-model="selected"
            />
            <span></span>
            {{ option[bindLabel] }}</label
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref, watch, computed } from 'vue'
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    bindLabel: {
      type: String,
      required: false,
    },
    bindValue: {
      type: String,
      required: false,
    },
    preSelected: {
      type: Array,
      required: false,
    },
    styleSelectClass: {
      type: String,
      required: false,
    },
    styleDropdownClass: {
      type: String,
      required: false,
    },
    hasSearch: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit }) {
    const propsOptions = computed(() => props.options)
    const options = ref(propsOptions.value || [])
    const show = ref(false)
    const message = computed(() => {
      const len = selected.value.length
      const optlen = propsOptions.value.length
      if (len == 0) {
        return 'None Selected'
      } else if (len == 1) {
        const r = propsOptions.value.filter(
          (v) => v[bindValue.value] == selected.value[0]
        )
        if (r.length > 0) {
          return r[0][bindLabel.value]
        }
      } else if (len < optlen) {
        return len + ' Selected'
      } else if (len == optlen) {
        return 'All Selected'
      }
    })

    // element refs
    const multiselectRef = ref(null)
    const selectWrapperRef = ref(null)
    const dropdownRef = ref(null)
    const toggleAllIdRef = ref(null)

    // binding and results
    const bindLabel = ref(props.bindLabel || 'label')
    const bindValue = ref(props.bindValue || 'value')
    const selected = ref(props.preSelected ? [...props.preSelected] : [])

    // appearance
    const styleSelectClass = ref(props.styleSelectClass || 'wayfmf6wh3')
    const styleDropdownClass = ref(props.styleDropdownClass || 'qf5k5qmpv5')
    const styleSearchClass = ref(props.styleSearchClass || 'hlyi45ju8')

    // search
    const hasSearch = ref(props.hasSearch || false)
    const filter = ref('')

    // methods
    const showDropdown = () => {
      const check = show.value
      show.value = true
      if (!check) {
        setTimeout(() => {
          window.addEventListener('click', useDetectOutsideClick)
        }, 50)
      }

      if (message.value == 'All Selected') {
        toggleAllIdRef.value.checked = true
      }

      selectWrapperRef.value.style.maxWidth = multiselectRef.value.offsetWidth + 'px'
    }

    const hideDropdown = () => {
      show.value = false
    }

    const toogleAll = (toggle) => {
      selected.value = []
      if (toggle) {
        options.value.forEach((v) => {
          selected.value.push(v[bindValue.value])
        })
      }
    }

    const useDetectOutsideClick = (event) => {
      if (
        event.target !== dropdownRef.value &&
        event.composedPath().includes(dropdownRef.value)
      ) {
        return
      }
      hideDropdown()
      window.removeEventListener('click', useDetectOutsideClick)
    }

    // watchers
    watch(
      () => propsOptions.value,
      (value) => {
        console.log('propsOptions updated')
        options.value = [...value]
      },
      { deep: true }
    )

    watch(
      () => selected.value,
      (value) => {
        emit('onVSelect', value)
        if (selected.value.length == propsOptions.value.length) {
          toggleAllIdRef.value.checked = true
        } else {
          toggleAllIdRef.value.checked = false
        }
      },
      { deep: true }
    )

    watch(
      () => filter.value,
      (value) => {
        console.log('filter updated')
        if (value.length >= 3) {
          options.value = propsOptions.value.filter((v) =>
            v[bindLabel.value].toLowerCase().includes(filter.value.toLowerCase())
          )
        } else {
          options.value = [...propsOptions.value]
        }
      }
    )

    return {
      options,
      show,
      multiselectRef,
      selectWrapperRef,
      dropdownRef,
      toggleAllIdRef,
      bindLabel,
      bindValue,
      showDropdown,
      selected,
      styleSelectClass,
      styleDropdownClass,
      styleSearchClass,
      hasSearch,
      filter,
      message,
      toogleAll,
    }
  },
}
</script>

<style>
:root {
    --v3mc-border: #ccc;
    --v3mc-bg-dark-light: #2e2e32;
    --v3mc-primary: green;
    --v3mc-white: white;
    --v3mc-radius-small: 2px;
    --v3mc-dark-text: #888;
    --v3mc-fade-grey-dark-8: gray;
    --v3mc-text-color: #555;
}
.wayfmf6wh3 {
    min-width: 320px;
    height: 38px;
    padding: 0 10px;
    border: 1px solid var(--v3mc-border);
    border-radius: 4px;
    font-size: 16px;
}

.bgsn7nn2nh {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.y8dw7zjbs4 {
    position: relative;
    cursor: pointer;
    width: unset;
    display: inline-flex;
}

.qf5k5qmpv5 {
    position: relative;
    background-color: white;
}

.qf5k5qmpv5 ul {
    z-index: 1;
    border: 1px solid var(--v3mc-border);
    border-top: 0;
    border-radius: 0 0 3px 3px;
    left: 0px;
    padding: 8px 8px;
    position: absolute;
    top: -1rem;
    width: 100%;
    list-style: none;
    max-height: 150px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    background-color: white;
}

.qf5k5qmpv5 ul li {
    padding: 5px 0 4px;
    width: 100%;
    display: flex;
    align-items: center;
}

.qf5k5qmpv5 ul li label {
    cursor: pointer;
}

.qf5k5qmpv5 ul li:not(:last-child) {
    border-bottom: 1px solid #e7e7e7;
}

.qf5k5qmpv5 ul li input {
    margin-right: 8px;
    cursor: pointer;
    position: absolute;
    opacity: 0;
    transition: all 0.3s;
}

.qf5k5qmpv5 ul li input+span {
    position: relative;
    top: 0px;
    background: var(--v3mc-white);
    content: '';
    display: inline-block;
    margin: 0 0.5em 0 0;
    padding: 0;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    min-width: 18px;
    border: 1px solid var(--v3mc-fade-grey-dark-8);
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
}

.qf5k5qmpv5 ul li input+span:after {
    background-size: 70%;
    position: absolute;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: ' ';
    background-position: center;
    color: var(--v3mc-primary);
}

.qf5k5qmpv5 ul li input:checked+span::after {
    /*transform: translate(-50%, -50%) scale(1) !important;*/
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJncmVlbiI+PHBhdGggZD0iTTIwLjI4NSAybC0xMS4yODUgMTEuNTY3LTUuMjg2LTUuMDExLTMuNzE0IDMuNzE2IDkgOC43MjggMTUtMTUuMjg1eiIvPjwvc3ZnPg==");
}

.qf5k5qmpv5 ul li input+span {
    border-radius: var(--v3mc-radius-small);
    transition: all 0.3s;
}

.qf5k5qmpv5 ul li label {
    line-height: 1.2;
    display: flex;
    align-items: center;
    text-align: start;
}

.qf5k5qmpv5 .hlyi45ju8 {
    background-color: white;
    flex: 1;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 8px 8px;
    box-sizing: border-box;
    border-left: 1px solid var(--v3mc-border);
    border-right: 1px solid var(--v3mc-border);
    text-align: start;
    height: 60px;
}

.qf5k5qmpv5 .hlyi45ju8 label {
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-size: 12px;
    width: 100%;
}

.qf5k5qmpv5 .hlyi45ju8 label>span {
    display: flex;
    gap: 4px;
}

.qf5k5qmpv5 .hlyi45ju8 label>span button {
    white-space: nowrap;
    cursor: pointer;
}

.qf5k5qmpv5 .hlyi45ju8 label input[type='text'] {
    font-size: 1rem;
    padding: 0 10px;
    line-height: 1.5;
    width: 100%;
    height: 30px;
}

.qf5k5qmpv5 .hlyi45ju8+ul {
    top: 60px;
    padding-top: 0px;
    margin-top: 0;
}

@media (prefers-color-scheme: dark) {
    :root {
        --v3mc-border: #464545;
        --v3mc-text-color: #9e9b9b;
    }
    body {
        background-color: #15222e;
    }
    .qf5k5qmpv5 {
        background-color: #2e2e32;
    }
    .qf5k5qmpv5 ul {
        background-color: #2e2e32;
    }
    .qf5k5qmpv5 ul li:not(:last-child) {
        border-bottom-color: var(--v3mc-border);
    }
    .qf5k5qmpv5 ul li input+span {
        background-color: var(--v3mc-bg-dark-light);
        border-color: var(--v3mc-dark-text);
    }
    .qf5k5qmpv5 ul li input:checked+span {
        background-color: var(--v3mc-bg-dark-light);
        border-color: var(--v3mc-primary) !important;
    }
    .hlyi45ju8 {
        background-color: #2e2e32;
    }
    .hlyi45ju8 input {
        background: #47474e;
        border: 1px solid gray;
        color: #999;
    }
    .wayfmf6wh3 {
        background-color: #2e2e32;
        color: var(--v3mc-text-color);
        font-weight: 300;
    }
    .qf5k5qmpv5 .hlyi45ju8 {
        background-color: #2e2e32;
    }
}
</style>
