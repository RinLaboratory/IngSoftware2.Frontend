import type { TSafeUser } from "~/utils/validators";
import type { TUsersQuery } from ".";

export function applyOrderBy(users: TSafeUser[], query: TUsersQuery) {
  const usuarios = Array.from(users);

  if (query.ordenar === "NOMBRE") {
    usuarios.sort((a, b) => {
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
  if (query.ordenar === "APELLIDO") {
    usuarios.sort((a, b) => {
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
  if (query.ordenar === "CORREO") {
    usuarios.sort((a, b) => {
      const emailA = a.email;
      const emailB = b.email;

      if (emailA < emailB) {
        return -1;
      }
      if (emailA > emailB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
  if (query.ordenar === "ID") {
    usuarios.sort((a, b) => {
      const idA = a._id;
      const idB = b._id;

      if (idA < idB) {
        return -1;
      }
      if (idA > idB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
  return usuarios;
}
