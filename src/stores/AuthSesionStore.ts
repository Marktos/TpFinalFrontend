import { defineStore } from "pinia";
import type { SesionStateModel } from "../models/SessionStateModel";
import type { CredentialsModel } from "../models/CredentialsModel";
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
      console.info("CRSF Actualizado");
    },

    async registerUser(userData: CredentialsModel) {
      this.loading = true;
      try {
        const response = await API.CreateUser(userData);

        if (response.status === 201) {
          this.data!.user = userData;
          console.info(`Usuario creado: ${response.status}`);
          this.login(userData);
          this.loading = false;
        }
      } catch (e) {
        console.error(`Sucedio un error: ${e}`);
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
          console.info(`Login exitoso: ${response.status}`);
          this.loading = false;
          router.push("/tasks");
        }
        this.update(userData);
      } catch (e) {
        console.error(`Sucedio un error: ${e}`);
        this.error = e!.toString();
      }
    },

    async update(userData: CredentialsModel) {
      setInterval(async () => {
        this.loading = true;
        const currentTime = Math.floor(Date.now() / 1000);
        if (
          this.data!.jwtExpires &&
          currentTime >= this.data!.jwtExpires - 60
        ) {
          try {
            const response = await API.Login(userData);
            if (response.status === 200) {
              this.data!.jwtExpires = Math.floor(Date.now() / 1000) + 3 * 60;
            }
            this.loading = false;
          } catch (e) {
            console.error(`Erorr al actualizar sesion: ${e}`);
            this.error = e!.toString();
          }
        }
      }, 60 * 1000);
    },
  },
});
