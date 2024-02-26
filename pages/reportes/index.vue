<script setup>

</script>

<template>
  <div class="flex flex-wrap justify-between ">
    <NuxtLink to="/reportes/liquidaciones">
    <UCard class="w-64 h-72 m-2">
      <template #header>
        <h1 class="text-xl">Liquidaciones</h1>
      </template>

      <p>
        Reporte donde se puede ver a los agentes con un resumen de sus haberes.
      </p>
      
    </UCard>
  </NuxtLink>

  <NuxtLink to="/reportes/resumencod">
    <UCard class="w-64 h-72 m-2">
      <template #header>
        <h1 class="text-xl">Resumén por codigos de liqudiación</h1>
      </template>

      <p>
        Reporte donde se puede ver a los agentes con un resumen de sus haberes.
      </p>

      <template #footer>
        
      </template>
    </UCard>
  </NuxtLink>

  <NuxtLink to="/reportes/liqFDO">
    <UCard class="w-64 h-72 ms-2">
      <template #header>
        <h1 class="text-xl">Resumén para rendición de fondo</h1>
      </template>

      <p>
        Reporte donde se puede ver a los agentes con un resumen de sus haberes.
      </p>

      <template #footer>
        
      </template>
    </UCard>
  </NuxtLink>

  <NuxtLink to="/reportes/liqFDO">
    <UCard class="w-64 h-72 m-2">
      <template #header>
        <h1 class="text-xl">Resumén para rendición de fondo</h1>
      </template>

      <p>
        Reporte donde se puede ver a los agentes con un resumen de sus haberes.
      </p>

      <template #footer>
        
      </template>
    </UCard>
  </NuxtLink>

  </div>
</template>
