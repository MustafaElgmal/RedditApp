import React from "react";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { Card } from "react-bootstrap";


const Commentt = ({ comment }) => {
 
  let time = moment(comment.createdAt).fromNow();
  return (
    <section>
      <div className="d-flex justify-content-start gap-3 ms-3 mt-2 ">
        <Image
          src="https://review2020.s3.amazonaws.com/2f919e51-bf02-4f0d-a408-1607e79f2ec4.jpg"
          alt="Nocontent"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div>
          <h4>{`${comment.user.firstName} ${comment.user.lastName}`}</h4>
          <Card.Text>{comment.body}</Card.Text>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Text className="text-muted">{time}</Card.Text>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commentt;
