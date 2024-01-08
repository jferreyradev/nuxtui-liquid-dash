<script setup>

const { data: liq, pending, error } = await useFetch(
    `http://www.servertrancas.duckdns.org:3005/api/view/personaCargoLiq?CargoId=65&sort={"CODIGO":"asc","SUBCODIGO":"asc"}`
    // `https://api.example.com/projects/${projectId}/tracks`  &sort={"CODIGO":"asc","SUBCODIGO":"asc"}
)

const columns = [{
    key: 'CODIGO',
    label: 'Codigo'
}, {
    key: 'SUBCODIGO',
    label: 'Sub Cod'
}, {
    key: 'CANTIDAD',
    label: 'Cantidad'
}, {
    key: 'VENCIMIENTO',
    label: 'Vto'
},
{
    key: 'IMPORTE',
    label: 'Importe'
},
{
    key: 'IMPORTETICKET',
    label: 'IMP 81'
},
{
    key: 'PENSIONALIMENTICIA',
},
{
    key: 'ESLEY',
}
]

</script>

<template>
       <UTable :rows="liqs" :columns="columns" :loading="pending">
            <template #name-data="{ row }">
                <span>{{ row.Importe }}</span>
            </template>
        </UTable>

</template>