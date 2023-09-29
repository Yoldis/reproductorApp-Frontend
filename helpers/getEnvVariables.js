
export const getEnvVariables = () => {

    return {
        // De esta forma la variable de entorno esta lista para produccion
        VITE_API_URL_MUSIC: import.meta.env.VITE_API_URL_MUSIC
    }
}