<script setup>

//const ip = 'http://localhost' //www.servertrancas.duckdns.org
const ip = 'www.servertrancas.duckdns.org'
const port = 3005

const { data: liqs, pending, error } = await useFetch(
    `${ip}:${port}/api/view/liq?TipoLiquidacionId=1&GrupoAdicionalId=0&Periodo=12/2023`
    //`http://${ip}:${port}/api/view/boletas?Periodo=1/12/2023&TipoLiquidacionId=1&GrupoAdicionalId=0`
    // `https://api.example.com/projects/${projectId}/tracks`
)

const { data: liqsitems, pending2, error2 } = await useFetch(
    `${ip}:${port}/api/view/liqItem?TipoLiquidacionId=1&GrupoAdicionalId=0`
)

const liqcolumns = [{
    key: 'REPARTICIONID',
    label: 'Nro Rep'
}, {
    key: 'ORDEN',
    label: 'Orden'
}, {
    key: 'AFILIADO',
    label: 'Afiliado'
}, {
    key: 'DOCUMENTO',
    label: 'Doc'
},
{
    key: 'NOMBRE',
    label: 'Nombre'
},
{
    key: 'APELLIDO',
    label: 'Apellido'
}
]

const itemscolumns = [{
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
    key: 'DESCRIPCION',
    label: 'Descripcion'
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
},
]

const isOpen = ref(false)
const liqitems = ref([])

const q = ref('')

const filteredRows = computed(() => {
    if (!q.value) {
        return liqs.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
        //return liqs.value
    }

    return liqs.value.filter((item) => {
        return Object.values(item).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})

const page = ref(1)
const pageCount = 10

/*
const rows = computed(() => {
    return liqs.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
*/

const select = (item) => {
    console.log(item)
    console.log(item.LIQUIDACIONID)

    liqitems.value = liqsitems.value.filter(x => x.LIQUIDACIONID == item.LIQUIDACIONID);
    liqitems.value.sort(function (a, b) {
        if ((a.CODIGO * 1000 + a.SUBCODIGO) > (b.CODIGO * 1000 + b.SUBCODIGO)) {
            return 1;
        }
        if ((a.CODIGO * 1000 + a.SUBCODIGO) < (b.CODIGO * 1000 + b.SUBCODIGO)) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    console.log(liqitems.value)
    isOpen.value = true
    //navigateTo(`/liqitem-${item.LIQUIDACIONID}`)
}

const getResumen = () => {
    let hcap = 0, hsap = 0, ticket = 0, desc = 0, descley = 0
    props.items.forEach(el => {
        switch (el.TIPOCONCEPTOID) {
            case 1:
                hcap = hcap + el.IMPORTETICKET
                break;
            case 2:
                hsap = hsap + el.IMPORTETICKET
                break;
            case 3:
                descley = descley + el.IMPORTETICKET
                break;
            case 7:
                ticket = ticket + el.IMPORTETICKET
                break;
            case 6:
                desc = desc + el.IMPORTETICKET
                break;
            default:
                break;
        }

    });

    return { hcap, hsap, ticket, descley, desc }
}

</script>

<template>
    <InputLiq></InputLiq>
    <div>
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filter items..." />
        </div>
        <UTable :rows="filteredRows" :columns="liqcolumns" :loading="pending" @select="select" />
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-show="!q" v-model="page" :page-count="pageCount" :total="liqs.length" />
        </div>
    </div>

    <div>
        <UButton label="Open" @click="isOpen = true" />

        <UModal v-model="isOpen" :transition="false">
            <UCard >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Modal
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th v-for="col in itemscolumns">{{ col.label }}</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td> {{ getResumen().hcap }} </td>
                                <td> {{ getResumen().hsap }}</td>
                                <td> {{ getResumen().ticket }}</td>
                                <td> {{ getResumen().descley }}</td>
                                <td> {{ getResumen().desc }}</td>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="item in liqitems" class="hover:bg-gray-300 hover:text-black ">
                                <td class="text-right mx-2 text-sm">{{ item.CODIGO }}</td>
                                <td class="text-right mx-2 text-sm">{{ item.SUBCODIGO }}</td>
                                <td class="text-right mx-2 text-sm">{{ item.CANTIDAD }}</td>
                                <td class="text-right mx-2 text-sm">{{ item.DESCRIPCION }}</td>
                                <td class="text-right mx-2 text-sm">{{ item.VENCIMIENTO }}</td>
                                <td class="text-right mx-2 text-sm">{{ item.IMPORTE.toFixed(2) }}</td>
                                <td class="text-right mx-2 text-sm">{{ item.IMPORTETICKET.toFixed(2) }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <template #footer>
                </template>
            </UCard>
        </UModal>
    </div>
</template>