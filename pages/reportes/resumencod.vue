<script setup>

import { utils, writeFileXLSX } from "xlsx";

///  excel

function exportFile() {
    const map1 = data.value.map((x) => {
        return {
            'CODIGO': x.CODIGO,
            'SUBCODIGO': x.SUBCODIGO,
            'Descripcion': x.DESCRIPCION,           
            'Cantidad': x.CANTIDAD,
            'Importe': x.IMPORTE,
            'TipoConcepto':x.IDTIPOCONCEPTO
        }
    });

    /* generate worksheet from state */
    const ws = utils.json_to_sheet(map1);
    ws["!cols"] = [{ wch: 10 }, { wch: 10 },{ wch: 35 }, { wch: 10 }
    , { wch: 10 }];
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");

    /* export to XLSX */
    writeFileXLSX(wb, "ResumenLiqCod.xlsx", { compression: true });
}

//  "http://www.serverburru2.duckdns.org:3005/api/view/resumenCodLiq",

//"http://localhost:3005/api/view/resumenCodLiq",  

const { data, pending, error } = await useFetch(
    "http://www.serverburru2.duckdns.org:3005/api/view/resumenCodLiq",  
  {
    query: { TipoLiquidacionId: 1, GrupoAdicionalId: 0, Periodo: "01/12/2023" },
  }
);
const columns = [
  {
    key: "CODIGO",
    label: "Codigo",
    sortable: true,
  },
  {
    key: "SUBCODIGO",
    label: "Sub Código",
    sortable: true,
  },
  {
    key: "DESCRIPCION",
    label: "Descripcion",
    sortable: true,
  },
  {
    key: "CANTIDAD",
    label: "Cantidad",
  },
  {
    key: "IMPORTE",
    label: "Importe",    
  },
  {
    key: "IDTIPOCONCEPTO",
    label: "ID Tipo Concepto",
  }, 
];

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return data.value;
  }

  return data.value.filter((str) => {
    return Object.values(str).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});


</script>

<template>
  <h1>Resumen por codigo de liquidación</h1>
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between ">
      <UInput v-model="q" placeholder="Buscar..." />
      <UButton @click="exportFile">Descargar</UButton>
    </div>

    <UTable
      :rows="filteredRows"
      :columns="columns"
      :loading="pending"
    >

    <template #CODIGO-header="{ row }">
        <div class="flex justify-end w-6">
          Cod
        </div>
      </template>

      <template #SUBCODIGO-header="{ row }">
        <div class="flex justify-end w-14">
          Sub Cod
        </div>
      </template>

      <template #CANTIDAD-header="{ row }">
        <div class="flex justify-end w-14">
          Cant
        </div>
      </template>
      <template #CODIGO-data="{ row }">
        <div class="flex justify-end w-6">
          {{ row.CODIGO }}
        </div>
      </template>
      <template #SUBCODIGO-data="{ row }">
        <div class="flex justify-end w-12">
          {{ row.SUBCODIGO }}
        </div>
      </template>
      <template #CANTIDAD-data="{ row }">
        <div class="flex justify-end w-14">
          {{ row.CANTIDAD }}
        </div>
      </template>
      <template #IMPORTE-data="{ row }">
        <div class="flex justify-end w-20">
          {{ row.IMPORTE.toFixed(2) }}
        </div>
      </template>
      <template #IDTIPOCONCEPTO-data="{ row }">
        <div class="flex justify-end w-10">
          {{ row.IDTIPOCONCEPTO }}
        </div>
      </template>    
    </UTable>
  </div>
</template>
