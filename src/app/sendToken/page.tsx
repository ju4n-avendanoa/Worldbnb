import Link from "next/link";

function SendToken({ searchParams }: { searchParams: { email: string } }) {
  return (
    <div>
      <h2>
        We have sent an email to <span>{searchParams.email}</span>I intended to
        simulate sending a verification token to your account email, since I did
        not find a email provider to do this in a production environment, please
        click{" "}
        <span>
          <Link href={`/simulator?email=${searchParams.email}`}>here</Link> to
        </span>
        activate your account!
      </h2>
    </div>
  );
}

export default SendToken;
