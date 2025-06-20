import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import { fetchPackageById } from "../../admin/redux/features/packages/packageThunk";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import { Button } from "../../components/Button/Button";
import { DatesTable } from "../../components/DatesTable/DatesTable";
import { PrincipalInfoSection } from "../../components/PrincipalInfoSection/PrincipalInfoSection";
import { ReservationSummary } from "../../components/ReservationSummary/ReservationSummary";
import { SideInfoSection } from "../../components/SideInfoSection/SideInfoSection";
import { fakeSideInfo } from "../../data/db";
import { HeroLight } from "../../layouts/HeroLight/HeroLight";
import styles from "./OneProduct.module.css";
import { Gallery } from "../../components/Gallery/Gallery";
import { selectTransformedPackage } from "../../admin/redux/features/packages/packageSelectors";

const OneProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const selectedPackage = useSelector(selectTransformedPackage);
  const navigationType = useNavigationType()


  const handleBack = () => {
    if(navigationType === "POP") {
      navigate("/")
    } else {
      navigate(-1)
    }
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    if (id) {
      dispatch(fetchPackageById(Number(id)));
    }
  }, [dispatch, id]);
  if (!selectedPackage) return <p>Cargando paquete...</p>;

  return (
    <>
      <HeroLight />
      <div className={styles.backBtn}>
        <Button text="Volver" onClick={handleBack}/>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.activity}>
          <h1 className={styles.titleAdv}>{selectedPackage.name}</h1>
          <p className={styles.location}>
            <LocationOnRoundedIcon style={{ fontSize: "2.5rem" }} />
            <span>{selectedPackage.locationAddress}</span>
          </p>
          <Gallery
            images={selectedPackage.images}
            name={selectedPackage.name}
          />
        </div>
        <div className={styles.principalInfo}>
          <PrincipalInfoSection
            key={selectedPackage.id}
            location={selectedPackage.locationAddress}
            description={selectedPackage.description}
            difficulty={selectedPackage.difficulty}
            duration={selectedPackage.duration}
            // minAge={selectedPackage.minAge}
            // reqRes={selectedPackage.restrictions}
          />
        </div>
        <div className={styles.dateTable}>
          <DatesTable
            availableDates={selectedPackage.dateAvailable}
            pricePerPerson={selectedPackage.pricePerPerson}
          />
        </div>
        <div className={styles.sideInfo}>
          
            <SideInfoSection
              key={selectedPackage.id}
              val="Excelente 9,5"
              meetingPoints="Terminal de buses, calle 123"
              nameComment="Cameron Williamson"
              textComment="Una experiencia increíble, el guía fue súper amable y todo estuvo perfectamente organizado. ¡Lo recomiendo totalmente!"
              includes={selectedPackage.includes}
            />
    
        </div>
        <div className={styles.reservationSum}>
          <ReservationSummary />
        </div>
      </div>
    </>
  );
};

export default OneProduct;
