<script setup>

const { data: liq, pending, error } = await useFetch(
    `http://www.servertrancas.duckdns.org:3005/api/view/personaCargoLiq?CargoId=65&sort={"CODIGO":"asc","SUBCODIGO":"asc"}`
    // `https://api.example.com/projects/${projectId}/tracks` 
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

const getVto = (vto) => {
    if (vto) {
        const d = new Date(vto)
        console.log(d)
        console.log(vto)
        return d.toLocaleDateString("en-GB")

    }
    return null

}

</script>

<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="col in columns">{{ col.label }}</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td>Footer content 1</td>
                    <td>Footer content 2</td>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="item in liq">
                    <td class="text-right mx-2">{{ item.CODIGO }}</td>
                    <td class="text-right">{{ item.SUBCODIGO }}</td>
                    <td class="text-right">{{ item.CANTIDAD }}</td>
                    <td class="text-right mx-2">{{ getVto(item.VENCIMIENTO) }}</td>
                    <td class="text-right">{{ item.IMPORTE.toFixed(2) }}</td>
                    <td class="text-right">{{ item.IMPORTETICKET.toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>


        <!--         <UTable :rows="liqs" :columns="columns" :loading="pending">
            <template #name-data="{ row }">
                <span>{{ row.Importe }}</span>
            </template>
        </UTable> -->
    </div>
</template>
