<script setup>
import { utils, writeFileXLSX } from "xlsx";

//"http://127.0.0.1:3005/api/view/resumenliq",
//http://www.serverburru2.duckdns.org:

const { tipoliq, nroadi, month, year, per } = useFilterData();

console.log(tipoliq.value, nroadi.value, month.value, year.value, per.value)

const { data, pending, error } = await useFetch(
  "http://www.serverburru2.duckdns.org:3005/api/view/resumenliq",
  {
    query: { TipoLiquidacionId: tipoliq.value, GrupoAdicionalId: nroadi.value , Periodo: per.value }    
  }
);

const columns = [
  {
    key: "ORDEN",
    label: "Orden",
    sortable: true,
  },
  {
    key: "DOCUMENTO",
    label: "DNI",
    sortable: true,
  },
  {
    key: "APENOM",
    label: "Apellido y nombre",
    sortable: true,
  },
  {
    key: "HABCAP",
    label: "Haberes con aporte",
  },
  {
    key: "HABSAP",
    label: "Haberes sin aporte",
  },
  {
    key: "ASIGNFAM",
    label: "Asignación familiar",
  },
  {
    key: "NETO",
    label: "Neto",
  },
];

const page = ref(1);
const pageCount = 10;

const rows = computed(() => {
  return data.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return rows.value;
  }

  return data.value.filter((str) => {
    return Object.values(str).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

///  excel

function exportFile() {
    const map1 = data.value.map((x) => {
        return {
            'ORDEN': x.ORDEN,
            'DNI': x.DOCUMENTO,
            'Apellido y Nombre': x.APENOM,           
            'Sujeto a aporte': x.HABCAP,
            'Exento a aporte': x.HABSAP,
            'Asignacion familiar': x.ASIGNFAM,
            'Neto': x.NETO,
        }
    });

    /* generate worksheet from state */
    const ws = utils.json_to_sheet(map1);
    ws["!cols"] = [{ wch: 10 }, { wch: 10 },{ wch: 35 }, { wch: 20 }
    , { wch: 20 }, { wch: 20 }, { wch: 20 }];
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");

    /* export to XLSX */
    writeFileXLSX(wb, "ResumenLiq.xlsx", { compression: true });
}

</script>

<template>
  <h1>Liquidaciones</h1>
  <div>
    <InputLiq />
  </div>
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between ">
      <UInput v-model="q" placeholder="Buscar..." />
      <UButton @click="exportFile">Descargar</UButton>
    </div>
   
    <UTable :rows="filteredRows" :columns="columns" :loading="pending" 
        >
      <template #ORDEN-data="{ row }">
        <div class="flex justify-end">
          {{ row.ORDEN }}
        </div>
      </template>
      <template #HABCAP-data="{ row }">
        <div class="flex justify-end">
          {{ row.HABCAP.toFixed(2) }}
        </div>
      </template>
      <template #HABSAP-data="{ row }">
        <div class="flex justify-end">
          {{ row.HABSAP.toFixed(2) }}
        </div>
      </template>
      <template #ASIGNFAM-data="{ row }">
        <div class="flex justify-end">
          {{ row.ASIGNFAM.toFixed(2) }}
        </div>
      </template>
      <template #NETO-data="{ row }">
        <div class="flex justify-end">
          {{ row.NETO.toFixed(2) }}
        </div>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="data.length"
      />
    </div>
  </div>
</template>
