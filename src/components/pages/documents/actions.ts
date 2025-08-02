import type { OrderBy, QueryDocuments, TDocument } from "~/utils/validators";

export function applyOrderBy(
  documents: TDocument[],
  orderBy: OrderBy,
): TDocument[] {
  const Documentos = Array.from(documents);
  if (orderBy == "NOMBRE") {
    Documentos.sort((a, b) => {
      const nameA = a.nameE;
      const nameB = b.nameE;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
  if (orderBy == "APELLIDO") {
    Documentos.sort((a, b) => {
      const lastnameA = a.lastnameE;
      const lastnameB = b.lastnameE;

      if (lastnameA < lastnameB) {
        return -1;
      }
      if (lastnameA > lastnameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
  if (orderBy == "MAS_RECIENTE") {
    Documentos.sort((a, b) => {
      const inscr_DateA = a.inscr_Date;
      const inscr_DateB = b.inscr_Date;

      if (inscr_DateA > inscr_DateB) {
        return -1;
      }
      if (inscr_DateA < inscr_DateB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
  if (orderBy == "MAS_ANTIGUO") {
    Documentos.sort((a, b) => {
      const inscr_DateA = a.inscr_Date;
      const inscr_DateB = b.inscr_Date;

      if (inscr_DateA < inscr_DateB) {
        return -1;
      }
      if (inscr_DateA > inscr_DateB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }

  return Documentos;
}

export function filterDocumentsBySacrament(
  documents: TDocument[],
  query: QueryDocuments,
) {
  const activeSacraments = {
    bautismo: query.bautismo,
    confirmacion: query.confirmacion,
    matrimonio: query.matrimonio,
  };

  if (
    !activeSacraments.bautismo &&
    !activeSacraments.confirmacion &&
    !activeSacraments.matrimonio
  ) {
    return documents;
  }

  return documents.filter((doc) => {
    if (activeSacraments.bautismo && !doc.Bautismo.b_id) return false;
    if (activeSacraments.confirmacion && !doc.Confirmacion.c_id) return false;
    if (activeSacraments.matrimonio && !doc.Matrimonio.m_id) return false;
    return true;
  });
}
