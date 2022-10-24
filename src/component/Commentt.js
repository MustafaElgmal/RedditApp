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
          src={`${
            comment.user.imgageUrl
              ? comment.user.imgageUrl
              : "https://dzgcboayiitowsqexckt.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjYzNjczNiwiZXhwIjoxOTgxOTk2NzM2fQ.uMhGnnaeH-d74B6orNInFqtTqRxfEQr8bddHeyaJyBo"
          }`}
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
