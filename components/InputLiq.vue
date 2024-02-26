
<script setup>

const { tipoliq, nroadi, month, year, per } = useFilterData();

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

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


const handleClick = ()=>{
    const nmonth = months.indexOf(localmonth.value)+1
    console.log(nmonth, year.value);

    tipoliq.value = liqSelected.value
    month.value = nmonth

    console.log(tipoliq.value, nroadi.value, month.value, year.value, per.value)
}

const liqSelected = ref({
    name: 'Mensual',
    value: '1'
})

const localmonth = ref(months[month.value])

</script>

<template>
    <UContainer class="flex justify-start items-end">
        <div class="m-2">
            <label for="liq">Tipo de liquidación</label>
            <USelect v-model="liqSelected" :options="liq" option-attribute="name" />
        </div>        
        <div class="m-2">
            <label for="adi">Nro. Adicional</label>
            <UInput v-model="nroadi" id="adi" />
        </div>
        <div class="m-2">
            <label for="periodo">Periodo</label>
            <div class="flex" id="periodo">
                <USelect v-model="localmonth" :options="months" />
                <UInput v-model="year" type="number"></UInput>
            </div>
        </div> 
        <UButton class="m-2" @click="handleClick">enviar</UButton>
    </UContainer>
</template>