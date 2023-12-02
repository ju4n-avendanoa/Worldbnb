import * as React from "react";

interface EmailTemplateProps {
  token: string;
  userId: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  token,
  userId,
}) => (
  <div>
    <h1>Welcome to Worldbnb</h1>
    <p>
      Please click{" "}
      <a
        href={`http://localhost:3000/api/verifyToken?token=${token}&userId=${userId}`}
      >
        here
      </a>{" "}
      and start sharing your places with the world
    </p>
  </div>
);
