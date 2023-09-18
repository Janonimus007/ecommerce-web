<template>
  <BasicLayout>
    <div class="register">
      <h2>registro de usuarios</h2>
      <form class="ui form" @submit.prevent="register">
        <div class="field">
          <input
            type="text"
            placeholder="Nombre de usuario"
            v-model="formData.username"
            :class="{ error: formError.username }"
          />
        </div>
        <div class="field">
          <input
            type="text"
            placeholder="Correo electronico"
            v-model="formData.email"
            :class="{ error: formError.email }"
          />
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Contraseña"
            v-model="formData.password"
            :class="{ error: formError.password }"
          />
        </div>

        <button
          type="submit"
          class="ui button fluid primary"
          :class="{ loading }"
        >
          Crear cuenta
        </button>
      </form>
      <router-link to="/login"> Iniciar sesión </router-link>
    </div>
  </BasicLayout>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import { useRouter } from "vue-router";
import BasicLayout from "../layouts/BasicLayout.vue";
import { registerApi } from "../api/user";

export default {
  name: "Register",
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();

    const schemaForm = Yup.object().shape({
      username: Yup.string().required(true),
      email: Yup.string()
        .email("Este campo debe ser de tipo email")
        .required(true),
      password: Yup.string().required(true),
    });

    const register = async () => {
      formError.value = {};
      try {
        loading.value = true;
        console.log("registrando usuario");
        console.log(formData.value);
        await schemaForm.validate(formData.value, { abortEarly: false });

        try {
          const result = await registerApi(formData.value);
          console.log("RESULTADO::", result);
          loading.value = false;
          router.push("/login");
        } catch (error) {
          console.log("ERROR A¨PI:::", error);
          loading.value = false;
        }
      } catch (error) {
        // console.log(error.inner[0].path);
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
        console.log(formError.value);
        loading.value = false;
      }
    };

    return {
      formData,
      register,
      formError,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  text-align: center;

  > h2 {
    margin: 50px 0 30px 0;
  }
  .ui.form {
    max-width: 700px !important;
    margin: 0 auto;
    margin-bottom: 10px;

    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
}
</style>