import { useEffect } from "react";
import styles from "./UserProfile.module.css";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../admin/components/Input/Input";
import { Button } from "../../components/Button/Button";


const UserProfile = () => {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const avatar =
    user?.name && user?.lastname
      ? user.name[0].toUpperCase() + user.lastname[0].toUpperCase()
      : "";
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
      <section className={styles.profileSection}>
        <div className={styles.infoSection}>
            <div className={styles.infoUser}>
              <div className={styles.infoUserleft}>
                {!user?.profilePicture ? (
                  <>
                    <p className={styles.avatar}>
                      {avatar}
                      <span className={styles.editProfilePictureIcon}>
                        <EditRoundedIcon style={{ fontSize: "1.5rem" }} />
                      </span>
                    </p>
                  </>
                ) : (
                  <img src="/src/assets/avatar.avif" alt="Tu foto de perfil" loading="lazy"/>
                )}
                {user && (
                  <h2 className={styles.userFullName}>
                    {user.name} {user.lastname}
                  </h2>
                )}
              </div>
              <div className={styles.infoUserRight}>
                <h3>Información personal</h3>
                <Input
                  htmlFor=""
                  labelName="Nombre"
                  type="text"
                  value={user?.name}
                  inputName="userName"
                  disabled
                  id="userName"
                  
                />

                <Input
                  htmlFor=""
                  labelName="Apellido"
                  type="text"
                  value={user?.lastname}
                  inputName="userLastname"
                  disabled
                  id="userLastname"
                  
                />

                <Input
                  htmlFor=""
                  labelName="Email"
                  type="text"
                  value={user?.email}
                  inputName="userEmail"
                  disabled
                  id="userEmail"
                  
                />
                <div className={styles.btnUpdateInfo}>
                  <Button text="Editar" />
                </div>
              </div>
            </div>
     
        </div>
      </section>
  );
};

export default UserProfile;
