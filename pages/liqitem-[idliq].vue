


<script setup>

const ip = '192.168.1.3'
//const ip = 'www.servertrancas.duckdns.org'
const port = 3005

const id=ref($route.params.idliq)

const { data: liq, pending, error } = await useFetch(
    `http://${ip}:${port}/api/view/personaCargoLiq?CargoId=${id}&sort={"CODIGO":"asc","SUBCODIGO":"asc"}`
    //`http://www.servertrancas.duckdns.org:3005/api/view/personaCargoLiq?CargoId=65&sort={"CODIGO":"asc","SUBCODIGO":"asc"}`
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
        //return d.toLocaleDateString("en-GB")
        return d.getMonth()+'/'+d.getFullYear()
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
                <tr v-for="item in liq" class="hover:bg-gray-300 hover:text-black ">
                    <td class="text-right mx-2 text-sm">{{ item.CODIGO }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.SUBCODIGO }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.CANTIDAD }}</td>
                    <td class="text-right mx-2 text-sm">{{ getVto(item.VENCIMIENTO) }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.IMPORTE.toFixed(2) }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.IMPORTETICKET.toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
