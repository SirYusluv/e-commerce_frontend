import ReviewCard, { IReview } from "@/components/review-card/review-card";
import ema from "@/assets/reviews/ema.jpg";
import ave from "@/assets/reviews/ave.jpg";
import jer from "@/assets/reviews/jer.jpg";
import styles from "./section-review.module.scss";

const reviews: IReview[] = [
  {
    name: "Jeremy Stroman",
    review:
      "The application is quite good, it has wide range of products. I haven't had any major issues with my orders, delivery time is reasonable and customer service was helpful. However, there are some features that I believe could be improved, but overall it's a good choice for online shopping.",
    image: jer,
    stars: 5,
    date: "Jan, 01, 2023",
  },
  {
    name: "Avery Johnson",
    review:
      "I've been using this application for a while now and I have to say, it's amazing! The interface is easy to navigate and the selection of products is fantastic. The prices are also very reasonable. I highly recommend this application to anyone looking for a convenient and enjoyable shopping experience.",
    image: ave,
    stars: 5,
    date: "Feb, 08, 2023",
  },

  {
    name: "Emma Thompson",
    review:
      "I am so impressed with this application! The customer service is top-notch and the delivery times are lightning fast. I've also had great experiences with their return policy. I've recommended this application to all my friends and family and will continue to do so.",
    image: ema,
    stars: 5,
    date: "Mar, 22, 2023",
  },
];

export default function SectionReview() {
  return (
    <section className={styles.reviews}>
      <div className={styles["reviews__ctn"]}>
        {...reviews.map(({ name, review, stars, image, date }) => (
          <ReviewCard
            name={name}
            review={review}
            stars={stars}
            image={image}
            date={date}
          />
        ))}
      </div>
    </section>
  );
}
