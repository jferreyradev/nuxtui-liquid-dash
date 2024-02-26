<script setup>

import { utils, writeFileXLSX } from "xlsx";

const { data, pending, error } = await useFetch(
  "http://www.serverburru2.duckdns.org:3005/api/view/resumenFdo",
  {
    query: { TipoLiquidacionId: 1, GrupoAdicionalId: 0, Periodo: "01/12/2023" },
  }
);

const columns = [
  {
    key: "ORDEN",
    label: "Orden",
    sortable: true,
  },
  {
    key: "PERSONADOCUMENTO",
    label: "DNI",
    sortable: true,
  },
  {
    key: "PERSONAAPELLIDO",
    label: "Apellido",
    sortable: true,
  },
  {
    key: "PERSONANOMBRE",
    label: "Nombre",
  },
  {
    key: "SUJETOAPORTE",
    label: "Sujeto a aportes",
  },  
  {
    key: "ASIGNACIONFAMILIAR",
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
            'DNI': x.PERSONADOCUMENTO,
            'Apellido y Nombre': x.PERSONAAPELLIDO||', '||x.PERSONANOMBRE,
            'Sujeto a aporte': x.SUJETOAPORTE,
            'Asignacion familiar': x.ASIGNACIONFAMILIAR,
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
    writeFileXLSX(wb, "ResumenLiqFDO.xlsx", { compression: true });
}

</script>

<template>
  <h1>Liquidaciones</h1>
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between ">
      <UInput v-model="q" placeholder="Buscar..." />
      <UButton @click="exportFile">Descargar</UButton>
    </div>
       
    <UTable :rows="filteredRows" :columns="columns" :loading="pending">
      <template #ORDEN-data="{ row }">
        <div class="flex justify-end w-9">
          {{ row.ORDEN }}
        </div>
      </template>
      <template #SUJETOAPORTE-data="{ row }">
        <div class="flex justify-end w-20">
          {{ row.SUJETOAPORTE.toFixed(2) }}
        </div>
      </template>
      <template #ASIGNACIONFAMILIAR-data="{ row }">
        <div class="flex justify-end" w-12>
          {{ row.ASIGNACIONFAMILIAR.toFixed(2) }}
        </div>
      </template>
      <template #NETO-data="{ row }">
        <div class="flex justify-end w-20">
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