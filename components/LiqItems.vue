<script setup>

const props = defineProps(['items'])

const columns = [{
    key: 'CODIGO',
    label: 'Codigo'
}, {
    key: 'SUBCODIGO',
    label: 'Sub Cod'
}, {
    key: 'CANTIDAD',
    label: 'Cantidad'
}, {
    key: 'VENCIMIENTO',
    label: 'Vto'
},
{
    key:'DESCRIPCION',
    label:'Descripcion'
},
{
    key: 'IMPORTE',
    label: 'Importe'
},
{
    key: 'IMPORTETICKET',
    label: 'IMP 81'
},
{
    key: 'PENSIONALIMENTICIA',
},
{
    key: 'ESLEY',
},
]

const getVto = (vto) => {
    if (vto) {
        const d = new Date(vto)
        console.log(d)
        console.log(vto)
        //return d.toLocaleDateString("en-GB")
        return d.getMonth()+'/'+d.getFullYear()
    }
    return null

}

const getResumen = ()=>{
    let hcap=0, hsap=0, ticket=0, desc=0, descley = 0
    props.items.forEach(el => {
        switch (el.TIPOCONCEPTOID) {
            case 1:
                hcap = hcap + el.IMPORTETICKET
                break;
            case 2:
                hsap = hsap + el.IMPORTETICKET
                break;          
            case 3:
                descley = descley + el.IMPORTETICKET
                break;      
            case 7:
                ticket=ticket + el.IMPORTETICKET
                break;
            case 6: 
                desc = desc + el.IMPORTETICKET
                break;
            default:
                break;
        }

    });
    
    return { hcap, hsap, ticket, descley, desc }
}

</script>

<template>
    <div class="max-w-fit">
        <table>
            <thead>
                <tr>
                    <th v-for="col in columns">{{ col.label }}</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td> {{ getResumen().hcap }} </td>
                    <td> {{ getResumen().hsap }}</td>
                    <td> {{ getResumen().ticket }}</td>
                    <td> {{ getResumen().descley }}</td>
                    <td> {{ getResumen().desc }}</td>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="item in props.items" class="hover:bg-gray-300 hover:text-black ">
                    <td class="text-right mx-2 text-sm">{{ item.CODIGO }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.SUBCODIGO }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.CANTIDAD }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.DESCRIPCION }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.VENCIMIENTO }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.IMPORTE.toFixed(2) }}</td>
                    <td class="text-right mx-2 text-sm">{{ item.IMPORTETICKET.toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>