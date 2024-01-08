<template>
    <div class="flex justify-between">
        <h1 class="text-xl">Liquidación de sueldos</h1>
        <ColorScheme>
            <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
        </ColorScheme>
    </div>
</template>

