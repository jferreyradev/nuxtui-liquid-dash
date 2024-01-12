<script setup>

const ip = '192.168.1.3' //www.servertrancas.duckdns.org
//const ip = 'www.servertrancas.duckdns.org'
const port = 3005

const { data: liqs, pending, error } = await useFetch(
    `http://${ip}:${port}/api/view/boletas?Periodo=1/12/2023&TipoLiquidacionId=1&GrupoAdicionalId=0`
    //`http://${ip}:${port}/api/view/boletas?Periodo=1/12/2023&TipoLiquidacionId=1&GrupoAdicionalId=0`
    // `https://api.example.com/projects/${projectId}/tracks`
)

const columns = [{
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

const select = (item)=>{
    console.log(item)
    console.log(item.LIQUIDACIONID)   
    navigateTo(`/liqitem-${item.LIQUIDACIONID}`)
}

</script>

<template>
    <InputLiq></InputLiq>
    <div>
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filter items..." />
        </div>     
        <UTable :rows="filteredRows" :columns="columns" :loading="pending" @select="select"/> 
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-show="!q" v-model="page" :page-count="pageCount" :total="liqs.length" />
        </div>       
    </div>
</template>