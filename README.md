# Worldbnb

Welcome to the official repository of Airbnb NextJS. This project is a web application based on Next.js that recreates the core functionality of Airbnb. You can access the deployed application at [worldbnb.vercel.app](https://worldbnb.vercel.app/).

## Environment Configuration

Before running the application locally, make sure to set up the following environment variables in a `.env.local` file at the root of the project:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
JWT_SECRET=
DATABASE_URL=
CLOUD_NAME=
API_KEY=
API_SECRET=
CLOUDINARY_URL=
```

Ensure to provide the correct values for each environment variable based on the credentials and specific configuration of the services you are using.

## Technologies Used

- **Next.js**: React framework for web applications.
- **NextAuth.js**: Simple authentication handling for Next.js.
- **MongoDB**: Database used to store application data.
- **Cloudinary**: Cloud-based media management platform used to store images.
- **Vercel**: Deployment platform used to deploy the application.

## Usage Instructions

1. Clone this repository to your local machine.
2. Install dependencies with `npm install`.
3. Configure environment variables in a `.env.local` file.
4. Run the application with `npm run dev`.
5. Access the application in your browser at `http://localhost:3000`.

Enjoy exploring the world of Airbnb in this Next.js-based version! Feel free to contribute and improve this project. Thank you for your interest!
