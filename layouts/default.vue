<template>
    <UCard>
        <template #header>
            <Header></Header>
        </template>

        <div >
            <slot></slot>
        </div>


        <template #footer>
            <div class="h-8" />
        </template>
    </UCard>
</template>