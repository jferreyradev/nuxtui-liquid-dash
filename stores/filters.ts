const idTipoLiq = ref(1);
const grupoAdi = ref(0);
const periodo = ref("");

let store = { idTipoLiq, grupoAdi, periodo}

export function useStore() {
  return store
}

