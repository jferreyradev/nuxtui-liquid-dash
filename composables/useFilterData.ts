
const state = reactive({
  tipoliq: 1,
  nroadi: 0,
  month:'1',
  year: '2024',
});

export default () => {
  const { tipoliq, nroadi, month, year } = toRefs(state);

  const per = computed(()=>{
    return `01/${month.value}/${year.value}` 
  })

  return { tipoliq, nroadi, month, year, per};
};
