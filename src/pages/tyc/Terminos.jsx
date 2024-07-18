import React, { useRef, useEffect } from "react";
import "../../styles/style.css";

const Terminos = () => {
  const myModalAvisoRef = useRef(null);
  const myInputRef = useRef(null);

  useEffect(() => {
    const myModalAviso = myModalAvisoRef.current;
    const myInput = myInputRef.current;

    if (myModalAviso && myInput) {
      const handleModalShown = () => {
        myInput.focus();
      };

      myModalAviso.addEventListener("shown.bs.modal", handleModalShown);

      return () => {
        myModalAviso.removeEventListener("shown.bs.modal", handleModalShown);
      };
    }
  }, []);

  return (
    <section className="terminos">
      <div
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={myModalAvisoRef}
      >
        <div className="terminos-dialog">
          <div className="terminos-content">
            <div className="terminos-header">
              <h3 className="terminos-title" id="exampleModalLabel">
                AVISO LEGAL
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="terminos-body">
              <h5 className="terminos-title2">Identificación y Titularidad</h5>
              <li>Titular: Biason Franco</li>
              <li>Domicilio: Alberdi 1144, Depto 4</li>
              <li>Email: administracion@vefrek.com</li>
              <li>Teléfono: 2966 15 23-1074</li>
              <h5 className="terminos-title2 mt-3">Finalidad</h5>
              <p>
                La finalidad del Sitio Web es brindar información sobre negocios
                relacionados al rubro automotor.
              </p>
              <h5 className="terminos-title2">Condiciones de Uso</h5>
              <p>
                La utilización del Sitio Web le otorga la condición de Usuario,
                e implica la aceptación completa de todas las cláusulas y
                condiciones de uso incluidas en ésta página: «Aviso Legal». Si
                no estuviera conforme con todas y cada una de estas cláusulas y
                condiciones absténgase de utilizar el Sitio Web. El acceso al
                Sitio Web no supone, en modo alguno, el inicio de una relación
                comercial con el Titular. A través del Sitio Web, el Titular le
                facilita el acceso y la utilización de diversos contenidos que
                el Titular y/o sus colaboradores han publicado por medio de
                Internet. A tal efecto, está obligado y comprometido a NO
                utilizar cualquiera de los contenidos del Sitio Web con fines o
                efectos ilícitos, prohibidos en este Aviso Legal o por la
                legislación vigente, lesivos de los derechos e intereses de
                terceros, o que de cualquier forma puedan dañar, inutilizar,
                sobrecargar, deteriorar o impedir la normal utilización de los
                contenidos, los equipos informáticos o los documentos, archivos
                y toda clase de contenidos almacenados en cualquier equipo
                informático propios o contratados por el Titular, de otros
                usuarios o de cualquier usuario de Internet.
              </p>
              <h5 className="terminos-title2">Medidas de seguridad</h5>
              <p>
                Los datos personales que facilite al Titular son almacenados en
                bases de datos, cuya titularidad corresponde en exclusiva al
                Titular, que asume todas las medidas de índole técnica,
                organizativa y de seguridad que garantizan la confidencialidad,
                integridad y calidad de la información contenida en las mismas
                de acuerdo con lo establecido en la normativa vigente en
                protección de datos. No obstante, debe ser consciente de que las
                medidas de seguridad de los sistemas informáticos en Internet no
                son enteramente fiables y que, por tanto el Titular no puede
                garantizar la inexistencia de virus u otros elementos que puedan
                producir alteraciones en los sistemas informáticos (software y
                hardware) del Usuario o en sus documentos electrónicos y
                ficheros contenidos en los mismos aunque el Titular pone todos
                los medios necesarios y toma las medidas de seguridad oportunas
                para evitar la presencia de estos elementos dañinos.
              </p>
              <h5 className="terminos-title2">Contenidos</h5>
              <p>
                El Titular ha obtenido la información, el contenido multimedia y
                los materiales incluidos en el Sitio Web de fuentes que
                considera fiables, pero, si bien ha tomado todas las medidas
                razonables para asegurar que la información contenida es
                correcta, el Titular no garantiza que sea exacta, completa o
                actualizada. El Titular declina expresamente cualquier
                responsabilidad por error u omisión en la información contenida
                en las páginas del Sitio Web. Queda prohibido transmitir o
                enviar a través del Sitio Web cualquier contenido ilegal o
                ilícito, virus informáticos, o mensajes que, en general, afecten
                o violen derechos del Titular o de terceros. Los contenidos del
                Sitio Web tienen únicamente una finalidad informativa y bajo
                ninguna circunstancia deben usarse ni considerarse como oferta
                de venta, solicitud de una oferta de compra ni recomendación
                para realizar cualquier otra operación, salvo que así se indique
                expresamente. El Titular se reserva el derecho a modificar,
                suspender, cancelar o restringir el contenido del Sitio Web, los
                vínculos o la información obtenida a través del Sitio Web, sin
                necesidad de previo aviso. El Titular no es responsable de los
                daños y perjuicios que pudieran derivarse de la utilización de
                la información del Sitio Web o de la contenida en las redes
                sociales del Titular.
              </p>
              <h5 className="terminos-title2">Política de cookies</h5>
              <p>
                El Titular obtiene y conserva la siguiente información acerca de
                los visitantes del Sitio Web:{" "}
              </p>{" "}
              <li>
                El nombre de dominio del proveedor (PSI) y/o dirección IP que
                les da acceso a la red.
              </li>
              <li> La fecha y hora de acceso al sitio Web.</li>{" "}
              <li>
                {" "}
                La dirección de Internet origen del enlace que dirige al sitio
                Web.
              </li>
              <li>El número de visitantes diarios de cada sección.</li>
              <li>
                {" "}
                La información obtenida es totalmente anónima, y en ningún caso
                puede ser asociada a un Usuario concreto e identificado.
              </li>
              <h5 className="terminos-title2 mt-3">
                Enlaces a otros sitios web
              </h5>
              <p>
                El Titular puede proporcionarle acceso a sitios Web de terceros
                mediante enlaces con la finalidad exclusiva de informar sobre la
                existencia de otras fuentes de información en Internet en las
                que podrá ampliar los datos ofrecidos en el Sitio Web. Estos
                enlaces a otros sitios Web no suponen en ningún caso una
                sugerencia o recomendación para que usted visite las páginas web
                de destino, que están fuera del control del Titular, por lo que
                el Titular no es responsable del contenido de los sitios web
                vinculados ni del resultado que obtenga al seguir los enlaces.
                Asimismo, el Titular no responde de los links o enlaces ubicados
                en los sitios web vinculados a los que le proporciona acceso. El
                establecimiento del enlace no implica en ningún caso la
                existencia de relaciones entre el Titular y el propietario del
                sitio en el que se establezca el enlace, ni la aceptación o
                aprobación por parte del Titular de sus contenidos o servicios.
                Si accede a un sitio web externo desde un enlace que encuentre
                en el Sitio Web usted deberá leer la propia política de
                privacidad del otro sitio web que puede ser diferente de la de
                este sitio Web.
              </p>
              <h5 className="terminos-title2">
                Propiedad intelectual e industrial
              </h5>
              <p>
                Todos los derechos están reservados. Todo acceso a este Sitio
                Web está sujeto a las siguientes condiciones: la reproducción,
                almacenaje permanente y la difusión de los contenidos o
                cualquier otro uso que tenga finalidad pública o comercial queda
                expresamente prohibida sin el consentimiento previo expreso y
                por escrito del Titular.
              </p>
              <h5 className="terminos-title2">Limitación de responsabilidad</h5>
              <p>
                El Titular declina cualquier responsabilidad en caso de que
                existan interrupciones o un mal funcionamiento de los Servicios
                o contenidos ofrecidos en Internet, cualquiera que sea su causa.
                Asimismo, el Titular no se hace responsable por caídas de la
                red, pérdidas de negocio a consecuencia de dichas caídas,
                suspensiones temporales de fluido eléctrico o cualquier otro
                tipo de daño indirecto que se deba por causas ajenas a el
                Titular. Antes de tomar decisiones y/o acciones con base a la
                información incluida en el Sitio Web, el Titular le recomienda
                comprobar y contrastar la información recibida con otras
                fuentes.
              </p>
              <h5 className="terminos-title2">Contacto</h5>
              <p>
                En caso de que usted tenga cualquier duda acerca de este Aviso
                Legal o quiera realizar cualquier comentario sobre el Sitio Web,
                puede enviar un mensaje de correo electrónico a la dirección:
                administracion@vefrek.com o comunicarte telefónicamente al
                siguiente número: 2966449951.
              </p>
            </div>
            <div className="terminos-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminos;
