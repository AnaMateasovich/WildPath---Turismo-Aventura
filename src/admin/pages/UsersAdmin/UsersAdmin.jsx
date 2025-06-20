import React, { act, useEffect, useState } from "react";
import { TableListAdmin } from "../../components/TableListAdmin/TableListAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  getRoles,
  updateRole,
} from "../../redux/features/users/UsersThunk";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import styles from "./UsersAdmin.module.css";
import { Select } from "../../components/Select/Select";
import { Button } from "../../../components/Button/Button";
import { toast } from "react-toastify";

const UsersAdmin = () => {
  const [onEdit, setOnEdit] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSelectChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const { users, roles, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleEdit = (item) => {
    setOnEdit(true);
    setUserToEdit(item);
    if (roles.length === 0) {
      dispatch(getRoles());
    }
  };

  const handleCancel = () => {
    setOnEdit(false);
    setUserToEdit(null);
  };

  const handleSaveRol = async () => {
    try {
      await dispatch(
        updateRole({
          userId: userToEdit.id,
          email: userToEdit.email,
          role: selectedRole,
        })
      ).unwrap();

      toast.success("Rol actualizado correctamente");

      dispatch(fetchUsers());

      setOnEdit(false);
      setUserToEdit(null);
    } catch (error) {
      toast.error("No se pudo actualizar el rol");
      console.error("Error to update role:", error);
    }
  };

  const roleLabels = {
    ADMIN: "Administrador",
    USER: "Usuario",
    // MODERATOR: "Moderador"
  };

  const roleOptions = roles.map((role) => ({
    value: role,
    label: roleLabels[role] || role,
  }));

  const actions = [
    {
      icon: <EditRoundedIcon />,
      label: "edit",
      onClick: (item) => handleEdit(item),
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2>Lista de usuarios</h2>
      <TableListAdmin
        firstColumn="Email"
        secondColumn="Rol"
        arr={users}
        field1="email"
        field2="role"
        onDelete=" "
        isLoading={loading}
        actions={actions}
        onRefresh=""
      />
      {onEdit && (
        <div className={styles.overlay}>
          <div className={styles.modalContent}>
            <h3>{userToEdit.email}</h3>
            <Select
              labelName="Rol de usuario"
              options={roleOptions}
              selectName="role"
              htmlFor="role"
              value={selectedRole}
              onChange={handleSelectChange}
              id="role"
            />
            <div className={styles.btnsContainer}>
              <Button text="Cancelar" onClick={handleCancel} />
              <Button text="Guardar" onClick={handleSaveRol} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersAdmin;
