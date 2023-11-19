<script setup>
import { ref } from 'vue'
import countryListAllIsoData from './data'
const result = ref(['AF', 'AL'])
const setResult = (val) => {
  result.value = [...val]
}
const result2 = ref(['DZ', 'CZ', 'DE'])
const setResult2 = (val) => {
  result2.value = [...val]
}

</script>

<template>
	<h1>Vue3 multiselect checkboxed</h1>
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
  <div class="results">{{ result }}</div>
  <div>
    <Vue3MultiselectCheckboxed
      :options="countryListAllIsoData"
      bindLabel="name"
      bindValue="code"
      :preSelected="result2"
      :hasSearch="true"
      @onVSelect="setResult2"
    />
  </div>
  <div class="results">{{ result2 }}</div>
</template>

<style >
.results {
  margin-top: 10px;
  margin-bottom: 40px;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
#app h1 {
	font-size: 2rem;
	text-transform: capitalize;
	font-weight: 100;
}
</style>
