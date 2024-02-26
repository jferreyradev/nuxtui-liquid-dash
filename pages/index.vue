<script setup>

    const { data, pending, error } = await useFetch(
        "http://www.serverburru2.duckdns.org:3005/api/view/periodo",
        {
            query: { Activo: 1 },
        }
        );

    const { tipoliq, nroadi, month, year } = useFilterData();

    const arr = data.value[0].PERIODO.split('-')

    month.value = arr[1]
    year.value = arr[0];

    
</script>

<template>
  <h1>Pagina Principal</h1>
</template>
