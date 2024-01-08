
<script setup>
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

const liqSelected = ref(1)
const nroAdi = ref(0)

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo']
const date = new Date()
const month = ref(months[date.getMonth()])
const year = ref(date.getFullYear())

const handleClick = ()=>{
    const nmonth = months.indexOf(month.value)+1
    console.log(liqSelected.value, nroAdi.value, nmonth , year.value )
    const d = new Date(year.value, nmonth, 1 )
    console.log(d.toLocaleDateString())
}

</script>

<template>
    <UContainer class="flex justify-start items-end">
        <div class="m-2">
            <label for="liq">Tipo de liquidación</label>
            <USelect v-model="liqSelected" :options="liq" option-attribute="name" />
        </div>        
        <div class="m-2">
            <label for="adi">Nro. Adicional</label>
            <UInput v-model="nroAdi" id="adi" />
        </div>
        <div class="m-2">
            <label for="periodo">Periodo</label>
            <div class="flex" id="periodo">
                <USelect v-model="month" :options="months" />
                <UInput v-model="year" type="number"></UInput>
            </div>
        </div>
        <UButton class="m-2" @click="handleClick">enviar</UButton>
    </UContainer>
</template>