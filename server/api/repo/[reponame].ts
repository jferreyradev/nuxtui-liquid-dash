export default defineEventHandler(async (event) => {
  try {
    const repoName = getRouterParam(event, "reponame");
    const query = getQuery(event);

    console.log(query)

    if (query){
      for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          console.log(element)          
        }
      }
    }
   
    //const parm
      //  acionId=1&GrupoAdicionalId=0";
        //console.log(element)
    //const parms = "LiquidacionId=1494";

    const data = await $fetch(
      `http://www.serverburru2.duckdns.org:3005/api/view/${repoName}` // ?${parms}`
    );

    const idealResponse = {
      id: data.LIQUIDACIONID,
      orden: data.ORDEN,
      doc: data.DOCUMENTO,
      apenom: data.AEPNOM,
      habcap: data.HABCAP,
      habsap: data.HABSAP,
      asignfam: data.ASIGNFAM,
      neto: data.NETO,
    };

    return data;
  } catch (err) {
    throw createError({
      statusCode: 404,
      message: "Reporte no encontrado! error:",
    });
  }
});
