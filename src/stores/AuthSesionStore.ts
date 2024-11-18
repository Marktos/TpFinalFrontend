import { defineStore } from "pinia";
import { CredentialsModel } from "../models/CredentialsModel";
import { SesionStateModel } from "../models/SessionStateModel";
import router from "../router";
import { API } from "../services";
import { apiInstance } from "../services/api";

export const useSesionStore = defineStore({
  id: "sesion",
  state: (): SesionStateModel => ({
    loading: false,
    data: {
      user: undefined,
      crsfToken: undefined,
      jwtExpires: undefined,
    },
    error: "",
  }),
  actions: {
    changeCrsfToken() {
      const headers = apiInstance.defaults.headers;
      this.data!.crsfToken = headers["csrf-token"]?.toString();
      console.info("`Token CSRF Actualizado`");
    },

    async register(userData: CredentialsModel) {
      this.loading = true;
      try {
        const response = await API.CreateUser(userData);

        if (response.status === 201) {
          this.data!.user = userData;
          console.info(`Usuario creado correctamente`);

          //Logueo al usuario
          this.login(userData);
          this.loading = false;
        }
      } catch (e) {
        console.error(`Error al realizar la peticion: ${e}`);
        this.error = e!.toString();
      }
    },

    async login(userData: CredentialsModel) {
      this.loading = true;
      try {
        const response = await API.Login(userData);
        if (response.status === 200) {
          this.data!.user = userData;
          const currentEpochTime = Math.floor(Date.now() / 1000);
          this.data!.jwtExpires = currentEpochTime + 3 * 60;

          console.info(`Usuario logueado exitosamente`);
          this.renewToken();
          this.loading = false;
          router.push("/tasks");
        }
      } catch (e) {
        this.loading = false;
        console.error(`Error al realizar la peticion: ${e}`);
        this.error = e!.toString();
      }
    },

    renewToken() {
      setTimeout(
        async () => {
          try {
            const response = await API.Login({
              email: this.data!.user!.email,
              password: this.data!.user!.password,
            });
            if (response.status === 200) {
              const currentEpochTime = Math.floor(Date.now() / 1000);
              this.data!.jwtExpires = currentEpochTime + 3 * 60;
              console.info(`Token renovado`);
            }
          } catch (e) {
            console.error(`Error al realizar la peticion: ${e}`);
            this.error = e!.toString();
          }
        },
        3 * 60 * 1000
      );

      setTimeout(() => this.renewToken(), 3 * 60 * 1000);
    },

    async logout() {
      this.loading = true;
      this.data!.user = undefined;
      this.data!.jwtExpires = undefined;
      try {
        const response = await API.Logout();
        if (response.status === 200) {
          console.info(`Logout exitoso`);
          this.loading = false;
          router.push("/");
        }
      } catch (e) {
        console.error(`Error al realizar la peticion: ${e}`);
        this.loading = false;
        this.error = e!.toString();
      }
    },
  },
});
