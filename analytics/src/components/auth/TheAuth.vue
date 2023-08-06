<script setup lang="ts">
import { ref } from 'vue';
import { Auth } from 'aws-amplify'
import type { log } from 'console';
import InputText from '@/components/inputs/InputText.vue'
import ErrorText from '@/components/typography/ErrorText.vue'
import { useRouter } from 'vue-router';

const username = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')


const router = useRouter();

const signIn = async () => {
    let userDetails;
    Auth.signIn({ "username": username.value, "password": password.value })
        .then((user) => {
            userDetails = user;
            console.log(user);
            username.value = '';
            password.value = '';
            router.push({ name: 'dashboard' });


        }
        )
        .then(() => console.log("success"))
        .catch(err => {
            errorMessage.value = err;
            username.value = '';
            password.value = '';
            console.log(err)
        });
}

const updateFormValue = (updateType: string, value: string) => {

    console.log("value", value)

    if (updateType == 'username') {
        username.value = value;
    } else if (updateType == 'password') {
        password.value = value;
    }
    errorMessage.value = '';
}
</script>

<template>
    <h2 className='text-2xl font-semibold mb-2 text-center'>Adminstrator Login</h2>
    <form>
        <div className="mb-4">
            <InputText type="input" :default-value="username" :value="username" update-type="username"
                container-style="mt-4" label-title="Username" :update-form-value="updateFormValue" />

            <InputText type="password" :default-value="password" :value="username" update-type="password"
                container-style="mt-4" label-title="Password" :update-form-value="updateFormValue" />

        </div>
        <ErrorText style-class="mt-8">{{ errorMessage }}</ErrorText>
        <button type="button" className="btn mt-2 w-full btn-primary" @click="signIn">Login</button>

        <div className='text-center mt-4 text-error'>Demo Message: This site is meant for adminstrators and you are
            refrained from using this unless authorized. All Activities are being monitored.
        </div>
    </form>
    <p class="py-1 mt-2"> <span class="font-semibold">Username:</span> demo</p>
    <p class="py-1 mt-2"> <span class="font-semibold">Password:</span> demo@1234</p>
</template>