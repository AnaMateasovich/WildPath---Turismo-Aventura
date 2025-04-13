import React from "react";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import styles from "./OneProduct.module.css";
import { SideInfoSection } from "../../components/SideInfoSection/SideInfoSection";
import { fakeProductData, fakeSideInfo } from "../../data/db";
import { Button } from "../../components/Button/Button";
import { PrincipalInfoSection } from "../../components/PrincipalInfoSection/PrincipalInfoSection";
import { DatesTable } from "../../components/DatesTable/DatesTable";
import { ReservationSummary } from "../../components/ReservationSummary/ReservationSummary";

const OneProduct = () => {
  return (
    <>
      <div className={styles.formContainer}>
        <SearchForm className={styles.form} />
      </div>
      <div className={styles.backBtn}>
        <Button text="Volver" />
      </div>
      <div className={styles.productContainer}>
        <div className={styles.infoProductContainer}>
          <div className={styles.principalInfo}>
            {fakeProductData.map((adventure) => (
              <PrincipalInfoSection
                key={adventure.id}
                title={adventure.title}
                location={adventure.location}
                description={adventure.description}
                level={adventure.details.level}
                duration={adventure.details.duration}
                minAge={adventure.details.minAge}
                reqRes={adventure.restrictions}
                img={adventure.images}
              />
            ))}
          </div>
          <div className={styles.dateTable}>
            <DatesTable />
          </div>
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
