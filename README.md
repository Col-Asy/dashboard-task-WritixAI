## Brief Explanation of Project
- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- The project is about building a dashboard's UI/UX, implementing some features, making the overall look of the site better
- For the context of the dashboard, I've taken the it to display some species of cats, dogs, birds and horses, which can be changed through the options available at sidebar.
- Navbar doesn't consist of much, but just NavBar written on it with a dark light mode toggle button 
- At the end, I've attached all the tasks that I wanted to achieve on this project

## Getting Started

### Without Docker
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### With Docker
To build the Docker image, run the following command in the root of the project:

```bash
docker build -t my-next-app .
```
This will create a Docker image with the name `my-next-app`.

To run the Docker container, use the following command:
```bash
docker build -t my-next-app .
```

This will start a new container from the my-next-app image and map port 3000 on the host machine to port 3000 in the container.

Open http://localhost:3000 with your browser to see the result.

## Todos
- [x] Styling the sidebar
- [x] Styling the cards
- [x] Styling the content area
- [x] Implementing the responsive design
- [x] Implementing dark-light mode toggle
- [x] Implementing the sidebar toggle
- [x] Implementing the search bar
- [x] Implementing the card click effects
- [x] Implementing content change according to option change
- [x] Implementing filtering according to categories
- [x] Implementing the progress bar
- [x] Implementing the loading animation
- [ ] Implementing the skeleton loading