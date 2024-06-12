import React from "react";
import "./Gig.scss";

import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useParams } from "react-router-dom";
import { Slider } from "infinite-react-carousel/lib";
import Reviews from "../../components/reviews/Reviews";

export const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  console.log(dataUser);

  const formatDate = (date) => {
    const dateArr = date.split(":")[0].split("-");
    const year = dateArr[0];
    const month = dateArr[1]
      .split("")
      .filter((n, i) => n != 0 && i != 0)
      .join("");

    const strMonths = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    return `${strMonths[month]} ${year}`;
  };

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs"></span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />

                <span>{`${dataUser.firstName} ${dataUser.lastName}`}</span>
                {Math.round(data.totalStars / data.startNumber) === Infinity ? (
                  ""
                ) : (
                  <div className="stars">
                    {Array(
                      isNaN(Math.round(data.totalStars / data.startNumber))
                        ? 0
                        : Math.round(data.totalStars / data.startNumber)
                    )
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>
                      {isNaN(Math.round(data.totalStars / data.startNumber))
                        ? ""
                        : Math.round(data.totalStars / data.startNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            {/* <img src={data.images[0]} alt="" /> */}
            <h2>About This Service</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Tutor</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{`${dataUser.firstName} ${dataUser.lastName}`}</span>
                    {Math.round(data.totalStars / data.startNumber) ===
                    Infinity ? (
                      ""
                    ) : (
                      <div className="stars">
                        {Array(
                          isNaN(Math.round(data.totalStars / data.startNumber))
                            ? 0
                            : Math.round(data.totalStars / data.startNumber)
                        )
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {isNaN(Math.round(data.totalStars / data.startNumber))
                            ? ""
                            : Math.round(data.totalStars / data.startNumber)}
                        </span>
                      </div>
                    )}
                    {/* <button>Contact Me</button> */}
                  </div>
                </div>

                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.province}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">
                        {formatDate(dataUser.createdAt)}
                      </span>
                    </div>
                    {/* <div className="item">
                      <span className="title">
                        Avg. response time
                      </span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div> */}
                    {/* <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div> */}
                  </div>
                  <hr />
                  <span>Bio</span>
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}

            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>
                <strong>&#8369;</strong> {data.price}
              </h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>Availability: {data.availability}/week</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
