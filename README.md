# Vue 3 Multiselect Checkboxed

A simple Vuejs 3 plugin. Adds an old style multiselect form element with checkboxes. Exactly the way in was back in jQuery times

## Demo
[1243906.playcode.io](https://1243906.playcode.io) <-- click "Skip Intro" to see the demo page. 

## Installation
```bash
npm i vue3-multiselect-checkboxed
```

## Usage:
Setup part:
```html
<script setup>
import { Vue3MultiselectCheckboxed } from "vue3-multiselect-checkboxed"
import "vue3-multiselect-checkboxed/style.css"
import { ref } from 'vue'
const result = ref(['AF', 'AL'])
const setResult = (val) => {
  result.value = [...val]
}
const countryListAllIsoData = [
  { code: 'AF', code3: 'AFG', name: 'Afghanistan', number: '004' },
  { code: 'AL', code3: 'ALB', name: 'Albania', number: '008' },
  { code: 'DZ', code3: 'DZA', name: 'Algeria', number: '012' },
  { code: 'AS', code3: 'ASM', name: 'American Samoa', number: '016' },
]
</script>
```

Template part:
```html
<template>
  <div>
    <Vue3MultiselectCheckboxed
      :options="countryListAllIsoData"
      bindLabel="name"
      bindValue="code"
      :preSelected="result"
      :hasSearch="true"
      @onVSelect="setResult"
    />
  </div>
</template>
```

## Thanks:

- [Publish a Vue Component to NPM // Vite and Vue 3 Youtube video](https://www.youtube.com/watch?v=5QV9wVc8c7g&ab_channel=LearnVue) <- you may subscribe to learn from these guys

- [Dropdown with Multiple checkbox select with Vue.js](https://codepen.io/huleos/pen/xQaYdK) <-- this is basically where I've got the initial idea. Thanks Julio


## Development:

If you want to use this code for your own needs just do
```bash
git clone https://github.com/vldmitrofanov/vue3-multiselect-checkboxed.git
cd vue3-multiselect-checkboxed
npm install
npm run dev
```