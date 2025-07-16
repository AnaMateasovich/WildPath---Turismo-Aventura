import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import { fetchPackageById, getDatesAvailableByPackageID } from "../../admin/redux/features/packages/packageThunk";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { makeSelectIsFavorite } from "../../admin/redux/features/favorites/favoriteSelectors";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../../admin/redux/features/favorites/favoritesThunk";
import { selectTransformedPackage } from "../../admin/redux/features/packages/packageSelectors";
import { Button } from "../../components/Button/Button";
import { CancelPolicy } from "../../components/CancelPolicy/CancelPolicy";
import { DatesAvailable } from "../../components/DatesAvailable/DatesAvailable";
import { Gallery } from "../../components/Gallery/Gallery";
import { PrincipalInfoSection } from "../../components/PrincipalInfoSection/PrincipalInfoSection";
import { ReservationSummary } from "../../components/ReservationSummary/ReservationSummary";
import { SideInfoSection } from "../../components/SideInfoSection/SideInfoSection";
import { HeroLight } from "../../layouts/HeroLight/HeroLight";
import styles from "./OneProduct.module.css";

import { getAllReviewsByPackageId, getReviewedPackageIdsByUser } from "../../admin/redux/features/review/reviewThunk";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { ShareModal } from "../../components/ShareModal/ShareModal";
import { getBookings, getBookingsPackageIdsByUser } from "../../admin/redux/features/booking/bookingThunk";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { getEnterpriseById } from "../../admin/redux/features/enterprise/enterpriseThunks";

const OneProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const user = useSelector((state) => state.auth.user);
  const selectedPackage = useSelector(selectTransformedPackage);
  const reviews = useSelector((state) => state.reviews.reviews);
  const enterprise = useSelector((state) => state.enterprises.enterprisePackage);
  const userBookingsPackageIds = useSelector((state) => state.bookings.userBookingsPackageIds);
  const { datesAvailable } = useSelector((state) => state.packages)

  const isFavorite = useSelector(makeSelectIsFavorite(Number(id)));
  const userReviewsPackageIds = useSelector(
    (state) => state.reviews.userReviewsPackageIds
  );

  const [toShare, setToShare] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [alreadyBooking, setAlreadyBooking] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);

  (selectedPackage)

  if (!id) {
    return <p>Paquete no válido</p>;
  }

  const handleBack = () => {
    if (navigationType === "POP") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };


  const handleToggleFavorite = () => {
    const packageId = Number(id);

    if (!user) {
      const confirm = window.confirm(
        "Debes iniciar sesión para poner un paquete en favoritos."
      );
      if (confirm) {
        navigate("/login");
      }
    } else {
      if (isFavorite) {
        dispatch(removeFavorite(packageId));
      } else {
        dispatch(addFavorite(packageId));
      }
    }
  };
  const handleShare = () => {
    setToShare(true);
  };

  const handleRetryDates = () => {
    dispatch(getDatesAvailableByPackageID(Number(id)));

  }

  const handleReserve = () => {
    const isLoggedIn = user !== null

    const dataReserve = {
      id,
      ...(selectedDay ? { selectedDay } : {}),
      ...(peopleCount ? { peopleCount } : {}),
    }

    if (!isLoggedIn) {
      const confirm = window.confirm("Debes iniciar sesión para hacer una reserva")
      if (confirm) {
        localStorage.setItem("reservaPendiente", JSON.stringify(dataReserve));
        navigate("/login?redirect=booking");
      }
    } else {
      navigate(`/reservar/${id}`, { state: dataReserve });
    }
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (id) {
      dispatch(fetchPackageById(Number(id)));
      dispatch(getAllReviewsByPackageId(Number(id)));
      dispatch(getDatesAvailableByPackageID(Number(id)));


    }
    if (user) {
      dispatch(fetchFavorites());
      dispatch(getReviewedPackageIdsByUser());
      dispatch(getBookingsPackageIdsByUser())
    }

  }, [dispatch, id, user]);

  useEffect(() => {
    if (id && userReviewsPackageIds.length > 0) {
      setAlreadyReviewed(userReviewsPackageIds.includes(Number(id)));
      setAlreadyBooking(userBookingsPackageIds.includes(Number(id)));
    }
  }, [id, userReviewsPackageIds, userBookingsPackageIds]);

  useEffect(() => {
    if (selectedPackage && selectedPackage.enterpriseId) {
      dispatch(getEnterpriseById(selectedPackage.enterpriseId));
    }
  }, [dispatch, selectedPackage]);

  if (!selectedPackage) return <p>Cargando paquete...</p>;

  const imageToShareModal = selectedPackage.images[0]?.src;
  const descriptionToShareModal = selectedPackage.description.split(".")[0];

  return (
    <>
      <HeroLight />
      <div className={styles.actions}>
        <button className={styles.favoriteBtn}>
          {isFavorite ? (
            <FavoriteRoundedIcon
              style={{ fontSize: "4rem" }}
              onClick={handleToggleFavorite}
            />
          ) : (
            <FavoriteBorderRoundedIcon
              style={{ fontSize: "4rem" }}
              onClick={handleToggleFavorite}
            />
          )}
        </button>
        <button>
          <ShareRoundedIcon
            style={{ fontSize: "4rem" }}
            onClick={handleShare}
          />
        </button>
        {toShare && (
          <ShareModal
            name={selectedPackage.name}
            description={descriptionToShareModal}
            image={imageToShareModal}
            setToShare={setToShare}
            link={`${window.location.origin}/actividades/${id}`}
          />
        )}
        <Button text="Volver" onClick={handleBack} className={styles.backBtn} />
      </div>
      <div className={styles.productContainer}>
        <div className={styles.wspIcon}>
          <a href={`https://wa.me/${enterprise?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (!navigator.onLine) {
                alert("No tienes conexión a Internet.");
              } else {
                alert("Se abrirá WhatsApp para enviar tu mensaje.");
              }
            }}
          >
            <WhatsAppIcon style={{ fontSize: "7rem" }} />
          </a>
        </div>
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
            duration={selectedPackage.readableDuration}
            minAge={selectedPackage.minAge}
            requirements={selectedPackage.requirements}
          />
        </div>
        <div className={styles.dateTable}>
          {/* <DatesTable
            availableDates={selectedPackage.dateAvailable}
            pricePerPerson={selectedPackage.pricePerPerson}
          /> */}
          <DatesAvailable
            datesAvailable={datesAvailable}
            duration={selectedPackage.readableDuration}
            onRetry={handleRetryDates}
            setSelectedDay={setSelectedDay}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            spots={datesAvailable}
          />


        </div>
        <div className={styles.sideInfo}>
          <SideInfoSection
            totalReviews={selectedPackage.totalReviews}

            key={selectedPackage.id}
            stars={selectedPackage.averageStars}
            meetingPoints="Terminal de buses, calle 123"
            comments={reviews.reviews}
            includes={selectedPackage.includes}
          />
        </div>
        {!alreadyReviewed && alreadyBooking && (
          <div className={styles.leaveReview}>
            <ReviewForm packageId={Number(id)}

            />
          </div>
        )}
        <div className={styles.reservationSum}>
          <ReservationSummary
            totalPay={selectedPackage.pricePerPerson}
            pricePerPerson={selectedPackage.pricePerPerson}
            selectedDay={selectedDay}
            peopleCount={peopleCount}
            productId={Number(id)}
            onClickReserve={handleReserve}
          />
        </div>
        <div>
          <h3>Políticas de cancelación</h3>
          <CancelPolicy cancelPolicy={selectedPackage.cancelPolicy} />
        </div>
      </div>
    </>
  );
};

export default OneProduct;
