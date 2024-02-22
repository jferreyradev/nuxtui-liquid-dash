<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['submit'])

const liq = [{
    name: 'Mensual',
    value: '1'
}, {
    name: 'Adicional',
    value: '5',
}, {
    name: '1er SAC',
    value: '2'
}, {
    name: '2Do SAC',
    value: '3'
}, {
    name: 'Otro tipo',
    value: '9',
    disabled: true
}]

const liqSelected = ref({
    name: 'Mensual',
    value: '1'
})
const nroAdi = ref(0)


const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const date = new Date()
const month = ref('Enero')
const year = ref(date.getFullYear())

const onSubmit = () => {
    const nmonth = months.indexOf(month.value) + 1
    emit('submit', {
        'tipoliq': liqSelected.value.value,
        'adi': nroAdi.value,
        'periodo': '1/' + nmonth + '/' + year.value
    })
}

</script>

<template>
  <UForm ref="form" class="space-y-4" @submit="onSubmit">

    <UFormGroup name="select" label="Liquidación">
      <USelect v-model="liqSelected" placeholder="Select..." :options="liq" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>

    <UButton variant="outline" class="ml-2" @click="form.clear()">
      Clear
    </UButton>
  </UForm>
</template>