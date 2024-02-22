<script setup>

const links = [
    {
    label: 'Seguimiento',
    to: '/'
},
{
    label: 'Reportes',
    to: '/reportes'
},
{
    label: 'About',
    to: '/about'
},
{
    label: 'Logout',
    to: '/logout'
}]
</script>

<template>
    <div class="flex justify-center">
        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    </div>
</template>