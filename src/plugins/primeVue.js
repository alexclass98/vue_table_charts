import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

export default function(app) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: false
            }
        }
    });
}