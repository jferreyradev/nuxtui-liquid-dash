<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
const isAuthenticated = useCookie('is-authenticated')
const currentUser = useCookie('current-user')

const router = useRouter()

const state = ref({
    email: undefined,
    password: undefined
})

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Required' })
    if (!state.password) errors.push({ path: 'password', message: 'Required' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {

    if (state.value.email == 'admin' && state.value.password === 'admin') {
        currentUser.value = state.value.email
        isAuthenticated.value = 'true'
    }

}
</script>

<template>
    <UContainer class="w-80 m-10 p-10">
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
    </UContainer>
</template>