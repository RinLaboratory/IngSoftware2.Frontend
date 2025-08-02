import type { TParsedDocument } from "~/utils/validators";

// WHAT THE FUCK IS THIS
export const defaultPopUpData: TParsedDocument = {
  Documento: {
    n_id: "",
    rut: "",
    name: "",
    lastname: "",
    birth: "",
    birthplace: "",
    email: "",
    Obs: "",
    inscr_Date: "",
    address: "",
    phone: "",
    Tomo: "",
    Pag: "",
    Referencia: "",
  },
  A_parent: false,
  parent_Data: {
    p_father: "",
    p_mother: "",
    p_phone_father: "",
    p_phone_mother: "",
    p_lugar: "",
    p_parent_Status: "",
    p_relation: "",
  },
  A_bautismo: false,
  Bautismo: {
    b_place1: "",
    b_place2: "",
    b_date: "",
    b_father: "",
    b_padrino: "",
    b_padrino_data: {
      older: false,
      bautizado: false,
      p_comunion: false,
      confirmado: false,
      casado: false,
      casado_iglesia: false,
    },
    b_madrina: "",
    b_madrina_data: {
      older: false,
      bautizado: false,
      p_comunion: false,
      confirmado: false,
      casado: false,
      casado_iglesia: false,
    },
  },
  A_confirmacion: false,
  Confirmacion: {
    c_place1: "IGLESIA_PARROQUIAL",
    c_place2: "",
    c_date: "",
    c_father: "",
    c_padrino: "",
    c_madrina: "",
  },
  A_matrimonio: false,
  Matrimonio: {
    m_place1: "IGLESIA_PARROQUIAL",
    m_place2: "",
    m_partner_name: "",
    m_partner_lastname: "",
    m_date: "",
    m_father: "",
    m_padrino: "",
    m_madrina: "",
  },
};

export const modalOptions = {
  add: "Añadir",
  edit: "Editar",
  view: "Ver",
};

export type TActiveDialog =
  | "none"
  | "bautismo"
  | "matrimonio"
  | "confirmacion"
  | "persona";

export type TModalMode = "add" | "edit" | "view";
