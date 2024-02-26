<script setup>
const isAuthenticated = useCookie('is-authenticated')
</script>

<template>
    <header>
        <UContainer>
            <Header>
                <Navigation v-if="isAuthenticated" />
            </Header>
        </UContainer>
    </header>
    <main>
        <UContainer>            
            <LoginForm v-if="!isAuthenticated"></LoginForm>
            <slot v-else />
        </UContainer>
    </main>
    <footer>

    </footer>
</template>

<style scoped>

main {
    flex-basis: 80%;
    margin-top: 10px;
    padding: 20px;
}
</style>