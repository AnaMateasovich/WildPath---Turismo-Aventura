import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPackageById } from "../../admin/redux/features/packages/packageThunk";
import { Button } from "../../components/Button/Button";
import { DatesTable } from "../../components/DatesTable/DatesTable";
import { PrincipalInfoSection } from "../../components/PrincipalInfoSection/PrincipalInfoSection";
import { ReservationSummary } from "../../components/ReservationSummary/ReservationSummary";
import { SideInfoSection } from "../../components/SideInfoSection/SideInfoSection";
import { fakeSideInfo } from "../../data/db";
import { HeroLight } from "../../layouts/HeroLight/HeroLight";
import styles from "./OneProduct.module.css";

const OneProduct = () => {
 const { id } = useParams();
  const dispatch = useDispatch();
  const selectedPackage = useSelector(state => state.packages.selectedPackage);
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    if (id) {
      dispatch(fetchPackageById(Number(id)))
    }
  }, [dispatch, id]);
  if (!selectedPackage) return <p>Cargando paquete...</p>;
  return (
    <>
      <HeroLight />
      <div className={styles.backBtn}>
        <Button text="Volver" />
      </div>
      <div className={styles.productContainer}>
        <div className={styles.infoProductContainer}>
          <div className={styles.principalInfo}>
            <PrincipalInfoSection
              key={selectedPackage.id}
              name={selectedPackage.name}
              location={selectedPackage.locationAddress}
              description={selectedPackage.description}
              difficulty={selectedPackage.difficulty}
              duration={selectedPackage.duration}
              // minAge={selectedPackage.minAge}
              // reqRes={selectedPackage.restrictions}
              images={selectedPackage.images}
            />
          </div>
          {/* <div className={styles.dateTable}>
            <DatesTable />
          </div> */}
        </div>
        <div className={styles.sideInfo}>
          {fakeSideInfo.map((info) => (
            <SideInfoSection
              key={info.id}
              val={info.val}
              meetingPoints={info.meetingPoints}
              nameComment={info.nameComment}
              textComment={info.textComment}
              char={info.char}
            />
          ))}
          <div className={styles.reservationSum}>
            <ReservationSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default OneProduct;
