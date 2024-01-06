import PrettyHotspot from '@/components/PrettyHotspot.vue'

const PrettyHotspotGlobal = {
  install: (app/*, options*/) => {
    app.component("PrettyHotspot", PrettyHotspot);
  }
};

export { PrettyHotspot, PrettyHotspotGlobal };